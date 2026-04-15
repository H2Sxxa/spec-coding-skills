import argparse
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


VALID_ENTRY_TYPES: set[str] = {
    "decision",
    "constraint",
    "setup",
    "root-cause",
    "fix-pattern",
    "implementation-pattern",
    "pitfall",
    "validation",
}

DEFAULT_KNOWLEDGE_BASE_ROOT: Path = Path("docs/knowledge-base")
DEFAULT_INDEX_NAME: str = "index.md"
TEMPLATE_PATH: Path = Path(__file__).resolve().parent.parent / "references" / "template.md"


@dataclass(frozen=True)
class MemoryEntry:
    path: Path
    title: str
    entry_type: str
    trigger_tags: list[str]
    summary: str


@dataclass(frozen=True)
class NewEntryInput:
    title: str
    entry_type: str
    summary: str
    context: str
    applies_when: str
    decision_or_root_cause: str
    resolution_or_rule: str
    validation: str
    tags: list[str]
    components: list[str]
    tools: list[str]
    related_files: list[str]


def main() -> None:
    parser: argparse.ArgumentParser = argparse.ArgumentParser(
        description="Manage the spec-index Markdown knowledge base."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=DEFAULT_KNOWLEDGE_BASE_ROOT,
        help="Knowledge base root directory.",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="Create a memory entry and update the index.")
    add_parser.add_argument("--title", required=True)
    add_parser.add_argument("--type", required=True, choices=sorted(VALID_ENTRY_TYPES))
    add_parser.add_argument("--summary", required=True)
    add_parser.add_argument("--context", required=True)
    add_parser.add_argument("--applies-when", required=True)
    add_parser.add_argument("--decision-or-root-cause", required=True)
    add_parser.add_argument("--resolution-or-rule", required=True)
    add_parser.add_argument("--validation", required=True)
    add_parser.add_argument("--tag", action="append", default=[])
    add_parser.add_argument("--component", action="append", default=[])
    add_parser.add_argument("--tool", action="append", default=[])
    add_parser.add_argument("--related-file", action="append", default=[])

    search_parser = subparsers.add_parser("search", help="Search memory entries by text or tag.")
    search_parser.add_argument("query")
    search_parser.add_argument("--limit", type=int, default=10)

    subparsers.add_parser("rebuild", help="Rebuild the Markdown index from existing entries.")

    args: argparse.Namespace = parser.parse_args()

    if args.command == "add":
        add_entry(
            root=args.root,
            entry=NewEntryInput(
                title=args.title,
                entry_type=args.type,
                summary=args.summary,
                context=args.context,
                applies_when=args.applies_when,
                decision_or_root_cause=args.decision_or_root_cause,
                resolution_or_rule=args.resolution_or_rule,
                validation=args.validation,
                tags=normalize_tokens(args.tag),
                components=normalize_tokens(args.component),
                tools=normalize_tokens(args.tool),
                related_files=normalize_paths(args.related_file),
            ),
        )
        return

    if args.command == "search":
        search_entries(root=args.root, query=args.query, limit=args.limit)
        return

    if args.command == "rebuild":
        rebuild_index(root=args.root)
        return

    raise ValueError(f"Unsupported command: {args.command}")


def add_entry(root: Path, entry: NewEntryInput) -> None:
    root.mkdir(parents=True, exist_ok=True)
    entries_root: Path = root / entry.entry_type
    entries_root.mkdir(parents=True, exist_ok=True)

    timestamp: str = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    slug: str = slugify(entry.title)
    entry_id: str = f"kb-{timestamp}-{slug}"
    entry_path: Path = entries_root / f"{slug}.md"

    if entry_path.exists():
        raise FileExistsError(f"Memory entry already exists: {entry_path}")

    content: str = render_template(
        template=TEMPLATE_PATH.read_text(encoding="utf-8"),
        values={
            "id": entry_id,
            "type": entry.entry_type,
            "created_at": current_iso_timestamp(),
            "updated_at": current_iso_timestamp(),
            "title": entry.title,
            "summary": entry.summary,
            "context": entry.context,
            "applies_when": entry.applies_when,
            "decision_or_root_cause": entry.decision_or_root_cause,
            "resolution_or_rule": entry.resolution_or_rule,
            "validation": entry.validation,
            "tags": format_markdown_list(entry.tags),
            "related_files_or_systems": format_markdown_list(entry.related_files),
        },
    )
    content = replace_yaml_list(content, "components", entry.components)
    content = replace_yaml_list(content, "tools", entry.tools)
    content = replace_yaml_list(content, "trigger_tags", entry.tags)
    content = replace_yaml_list(content, "related_files", entry.related_files)

    entry_path.write_text(content, encoding="utf-8")
    rebuild_index(root=root)
    print(f"Created memory entry: {entry_path}")


def search_entries(root: Path, query: str, limit: int) -> None:
    entries: list[MemoryEntry] = load_entries(root=root)
    query_terms: list[str] = normalize_query(query)
    scored_entries: list[tuple[int, MemoryEntry]] = []

    for entry in entries:
        score: int = score_entry(entry=entry, query_terms=query_terms)
        if score > 0:
            scored_entries.append((score, entry))

    scored_entries.sort(key=lambda item: (-item[0], item[1].title))

    for score, entry in scored_entries[:limit]:
        relative_path: str = entry.path.relative_to(root).as_posix()
        tags: str = ", ".join(entry.trigger_tags)
        print(f"{score}\t{relative_path}\t{entry.entry_type}\t{entry.title}\t{tags}")


def rebuild_index(root: Path) -> None:
    root.mkdir(parents=True, exist_ok=True)
    entries: list[MemoryEntry] = load_entries(root=root)
    index_path: Path = root / DEFAULT_INDEX_NAME
    rows: list[str] = [
        "# Knowledge Base Index",
        "",
        "| Entry | Type | Trigger Tags | Summary |",
        "| --- | --- | --- | --- |",
    ]

    for entry in sorted(entries, key=lambda item: (item.entry_type, item.title)):
        relative_path: str = entry.path.relative_to(root).as_posix()
        tags: str = ", ".join(entry.trigger_tags)
        rows.append(
            f"| [{entry.title}](./{relative_path}) | {entry.entry_type} | {tags} | {entry.summary} |"
        )

    if len(rows) == 4:
        rows.append("| No entries yet. |  |  |  |")

    index_path.write_text("\n".join(rows) + "\n", encoding="utf-8")
    print(f"Rebuilt index: {index_path}")


def load_entries(root: Path) -> list[MemoryEntry]:
    if not root.exists():
        return []

    entries: list[MemoryEntry] = []
    for path in sorted(root.rglob("*.md")):
        if path.name == DEFAULT_INDEX_NAME:
            continue
        content: str = path.read_text(encoding="utf-8")
        frontmatter: dict[str, str | list[str]] = parse_frontmatter(content)
        title: str = extract_title(content)
        entry_type: str = string_value(frontmatter, "type", "unknown")
        summary: str = extract_section(content=content, heading="Summary")
        trigger_tags: list[str] = list_value(frontmatter, "trigger_tags")
        entries.append(
            MemoryEntry(
                path=path,
                title=title,
                entry_type=entry_type,
                trigger_tags=trigger_tags,
                summary=summary,
            )
        )

    return entries


def parse_frontmatter(content: str) -> dict[str, str | list[str]]:
    if not content.startswith("---\n"):
        return {}

    end_index: int = content.find("\n---\n", 4)
    if end_index == -1:
        return {}

    raw_frontmatter: str = content[4:end_index]
    result: dict[str, str | list[str]] = {}
    current_key: str | None = None

    for line in raw_frontmatter.splitlines():
        if not line.strip():
            continue
        if line.startswith("  - ") and current_key is not None:
            existing_value: str | list[str] = result.setdefault(current_key, [])
            if not isinstance(existing_value, list):
                raise ValueError(f"Cannot append list value to scalar key: {current_key}")
            existing_value.append(line[4:].strip().strip('"'))
            continue
        if ":" in line:
            key, raw_value = line.split(":", 1)
            current_key = key.strip()
            value: str = raw_value.strip()
            if value == "[]" or value == "":
                result[current_key] = []
            else:
                result[current_key] = value.strip('"')

    return result


def extract_title(content: str) -> str:
    for line in content.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return "Untitled"


def extract_section(content: str, heading: str) -> str:
    pattern: re.Pattern[str] = re.compile(
        rf"^## {re.escape(heading)}\s*$\n(?P<body>.*?)(?=^## |\Z)",
        re.MULTILINE | re.DOTALL,
    )
    match: re.Match[str] | None = pattern.search(content)
    if match is None:
        return ""
    return " ".join(match.group("body").strip().split())


def score_entry(entry: MemoryEntry, query_terms: list[str]) -> int:
    searchable_text: str = " ".join(
        [entry.title, entry.entry_type, entry.summary, " ".join(entry.trigger_tags)]
    ).lower()
    score: int = 0

    for term in query_terms:
        if term in entry.trigger_tags:
            score += 5
        if term in searchable_text:
            score += 1

    return score


def normalize_query(query: str) -> list[str]:
    terms: list[str] = re.split(r"[^a-zA-Z0-9_.:-]+", query.lower())
    return [term for term in terms if term]


def normalize_tokens(values: list[str]) -> list[str]:
    normalized: list[str] = []
    for value in values:
        for part in value.split(","):
            token: str = part.strip().lower()
            if token and token not in normalized:
                normalized.append(token)
    return normalized


def normalize_paths(values: list[str]) -> list[str]:
    normalized: list[str] = []
    for value in values:
        token: str = value.strip()
        if token and token not in normalized:
            normalized.append(token)
    return normalized


def render_template(template: str, values: dict[str, str]) -> str:
    content: str = template
    for key, value in values.items():
        content = content.replace("{{" + key + "}}", value)
    return content


def replace_yaml_list(content: str, key: str, values: list[str]) -> str:
    replacement: str
    if values:
        items: list[str] = [f'  - "{value}"' for value in values]
        replacement = f"{key}:\n" + "\n".join(items)
    else:
        replacement = f"{key}: []"
    return re.sub(rf"^{re.escape(key)}: \[\]$", replacement, content, flags=re.MULTILINE)


def format_markdown_list(values: list[str]) -> str:
    if not values:
        return "- None"
    return "\n".join([f"- {value}" for value in values])


def slugify(value: str) -> str:
    slug: str = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    if not slug:
        raise ValueError("Cannot create slug from empty title")
    return slug


def current_iso_timestamp() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def string_value(values: dict[str, str | list[str]], key: str, default: str) -> str:
    value: str | list[str] | None = values.get(key)
    if isinstance(value, str):
        return value
    return default


def list_value(values: dict[str, str | list[str]], key: str) -> list[str]:
    value: str | list[str] | None = values.get(key)
    if isinstance(value, list):
        return value
    if isinstance(value, str) and value:
        return [value]
    return []


if __name__ == "__main__":
    main()
