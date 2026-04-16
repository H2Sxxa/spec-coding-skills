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
SEARCH_ALIASES: dict[str, tuple[str, ...]] = {
    "auth": ("authentication", "authorization", "login", "session", "token", "鉴权", "认证", "授权", "登录"),
    "http-401": ("401", "unauthorized", "unauthenticated", "auth-failed", "未授权", "权限失败"),
    "http-403": ("403", "forbidden", "permission-denied", "无权限", "禁止访问"),
    "http-404": ("404", "not-found", "not found", "route-missing", "missing-route", "找不到", "不存在"),
    "env": ("environment", "environment-variable", "env-var", "config", "configuration", "环境变量", "配置"),
    "middleware": ("middleware.ts", "中间件"),
    "preview": ("vercel-preview", "deploy-preview", "预览", "预览环境"),
    "validation": ("validate", "verify", "test", "lint", "ci", "验证", "测试", "检查"),
    "spec": ("requirements", "prd", "acceptance", "criteria", "规格", "需求", "验收"),
}


@dataclass(frozen=True)
class MemoryEntry:
    path: Path
    title: str
    entry_type: str
    trigger_tags: list[str]
    summary: str
    components: list[str]
    tools: list[str]
    related_files: list[str]
    applies_when: str
    decision_or_root_cause: str
    resolution_or_rule: str
    validation: str
    content: str
    frontmatter: dict[str, str | list[str]]


@dataclass(frozen=True)
class SearchResult:
    score: int
    entry: MemoryEntry
    reasons: list[str]


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
    search_parser.add_argument(
        "--explain",
        action="store_true",
        help="Include weighted match reasons for each result.",
    )

    subparsers.add_parser("audit", help="Audit knowledge-base structure and index quality.")
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
        search_entries(root=args.root, query=args.query, limit=args.limit, explain=args.explain)
        return

    if args.command == "audit":
        audit_knowledge_base(root=args.root)
        return

    if args.command == "rebuild":
        rebuild_index(root=args.root)
        return

    raise ValueError(f"Unsupported command: {args.command}")


def add_entry(root: Path, entry: NewEntryInput) -> None:
    root.mkdir(parents=True, exist_ok=True)
    entries_root: Path = root / entry.entry_type
    entries_root.mkdir(parents=True, exist_ok=True)
    trigger_tags: list[str] = ensure_default_trigger_tags(
        entry_type=entry.entry_type,
        tags=entry.tags,
    )

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
            "tags": format_markdown_list(trigger_tags),
            "related_files_or_systems": format_markdown_list(entry.related_files),
        },
    )
    content = replace_yaml_list(content, "components", entry.components)
    content = replace_yaml_list(content, "tools", entry.tools)
    content = replace_yaml_list(content, "trigger_tags", trigger_tags)
    content = replace_yaml_list(content, "related_files", entry.related_files)

    entry_path.write_text(content, encoding="utf-8")
    rebuild_index(root=root)
    print(f"Created memory entry: {entry_path}")


def search_entries(root: Path, query: str, limit: int, explain: bool) -> None:
    entries: list[MemoryEntry] = load_entries(root=root)
    query_terms: set[str] = expand_query_terms(set(normalize_query(query)))
    scored_entries: list[SearchResult] = []

    for entry in entries:
        result: SearchResult = score_entry(entry=entry, query_terms=query_terms)
        if result.score > 0:
            scored_entries.append(result)

    scored_entries.sort(key=lambda item: (-item.score, item.entry.title))

    for result in scored_entries[:limit]:
        entry: MemoryEntry = result.entry
        relative_path: str = entry.path.relative_to(root).as_posix()
        tags: str = ", ".join(entry.trigger_tags)
        if explain:
            reasons: str = "; ".join(result.reasons[:8])
            print(f"{result.score}\t{relative_path}\t{entry.entry_type}\t{entry.title}\t{tags}\t{reasons}")
        else:
            print(f"{result.score}\t{relative_path}\t{entry.entry_type}\t{entry.title}\t{tags}")


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


def audit_knowledge_base(root: Path) -> None:
    entries: list[MemoryEntry] = load_entries(root=root)
    index_path: Path = root / DEFAULT_INDEX_NAME
    index_links: set[str] = load_index_links(index_path=index_path)
    entry_paths: set[str] = {entry.path.relative_to(root).as_posix() for entry in entries}

    broken_index_links: list[str] = sorted(index_links - entry_paths)
    missing_from_index: list[str] = sorted(entry_paths - index_links)
    missing_metadata: list[str] = []
    weak_trigger_tags: list[str] = []
    missing_sections: list[str] = []
    invalid_types: list[str] = []
    duplicate_titles: list[str] = find_duplicates([entry.title for entry in entries])
    duplicate_summaries: list[str] = find_duplicates(
        [entry.summary for entry in entries if entry.summary]
    )

    required_frontmatter_keys: set[str] = {"id", "type", "status", "scope", "trigger_tags"}
    required_sections: set[str] = {
        "Summary",
        "Context",
        "Applies When",
        "Decision Or Root Cause",
        "Resolution Or Rule",
        "Validation",
    }

    for entry in entries:
        relative_path: str = entry.path.relative_to(root).as_posix()
        missing_keys: list[str] = [
            key for key in sorted(required_frontmatter_keys)
            if not has_frontmatter_value(entry.frontmatter, key)
        ]
        if missing_keys:
            missing_metadata.append(f"{relative_path}: missing {', '.join(missing_keys)}")

        if entry.entry_type not in VALID_ENTRY_TYPES:
            invalid_types.append(f"{relative_path}: {entry.entry_type}")

        if is_weak_trigger_tags(entry.trigger_tags, entry.entry_type):
            weak_trigger_tags.append(
                f"{relative_path}: {', '.join(entry.trigger_tags) or 'no trigger tags'}"
            )

        missing_entry_sections: list[str] = [
            section for section in sorted(required_sections)
            if not extract_section(content=entry.content, heading=section)
        ]
        if missing_entry_sections:
            missing_sections.append(
                f"{relative_path}: missing {', '.join(missing_entry_sections)}"
            )

    print("# Knowledge Base Audit")
    print()
    print(f"- Root: `{root}`")
    print(f"- Entries scanned: {len(entries)}")
    print(f"- Index links: {len(index_links)}")
    print(f"- Missing from index: {len(missing_from_index)}")
    print(f"- Broken index links: {len(broken_index_links)}")
    print(f"- Missing metadata: {len(missing_metadata)}")
    print(f"- Weak trigger tags: {len(weak_trigger_tags)}")
    print(f"- Missing required sections: {len(missing_sections)}")
    print(f"- Invalid entry types: {len(invalid_types)}")
    print(f"- Duplicate titles: {len(duplicate_titles)}")
    print(f"- Duplicate summaries: {len(duplicate_summaries)}")
    print()

    print_audit_section("Missing From Index", missing_from_index)
    print_audit_section("Broken Index Links", broken_index_links)
    print_audit_section("Missing Metadata", missing_metadata)
    print_audit_section("Weak Trigger Tags", weak_trigger_tags)
    print_audit_section("Missing Required Sections", missing_sections)
    print_audit_section("Invalid Entry Types", invalid_types)
    print_audit_section("Duplicate Titles", duplicate_titles)
    print_audit_section("Duplicate Summaries", duplicate_summaries)

    if any(
        [
            missing_from_index,
            broken_index_links,
            missing_metadata,
            weak_trigger_tags,
            missing_sections,
            invalid_types,
            duplicate_titles,
            duplicate_summaries,
        ]
    ):
        print("## Recommended Next Steps")
        print()
        print("- Fix missing metadata, weak tags, and missing sections in the listed entries.")
        print("- Review duplicates before merging or deleting anything.")
        print("- Run `index.py rebuild` after safe manual edits.")
        return

    print("## Result")
    print()
    print("No structural knowledge-base issues found.")


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
        components: list[str] = list_value(frontmatter, "components")
        tools: list[str] = list_value(frontmatter, "tools")
        related_files: list[str] = list_value(frontmatter, "related_files")
        applies_when: str = extract_section(content=content, heading="Applies When")
        decision_or_root_cause: str = extract_section(
            content=content,
            heading="Decision Or Root Cause",
        )
        resolution_or_rule: str = extract_section(content=content, heading="Resolution Or Rule")
        validation: str = extract_section(content=content, heading="Validation")
        entries.append(
            MemoryEntry(
                path=path,
                title=title,
                entry_type=entry_type,
                trigger_tags=trigger_tags,
                summary=summary,
                components=components,
                tools=tools,
                related_files=related_files,
                applies_when=applies_when,
                decision_or_root_cause=decision_or_root_cause,
                resolution_or_rule=resolution_or_rule,
                validation=validation,
                content=content,
                frontmatter=frontmatter,
            )
        )

    return entries


def load_index_links(index_path: Path) -> set[str]:
    if not index_path.exists():
        return set()

    content: str = index_path.read_text(encoding="utf-8")
    links: set[str] = set()
    for match in re.finditer(r"\]\(\./([^)]+)\)", content):
        links.add(match.group(1))
    return links


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


def score_entry(entry: MemoryEntry, query_terms: set[str]) -> SearchResult:
    score: int = 0
    reasons: list[str] = []

    tag_score, tag_reasons = score_trigger_tags(
        trigger_tags=entry.trigger_tags,
        query_terms=query_terms,
    )
    score += tag_score
    reasons.extend(tag_reasons)

    weighted_fields: list[tuple[str, list[str], int]] = [
        ("title", [entry.title], 5),
        ("type", [entry.entry_type], 4),
        ("components", entry.components, 4),
        ("tools", entry.tools, 4),
        ("related_files", entry.related_files, 3),
        ("summary", [entry.summary], 3),
        ("applies_when", [entry.applies_when], 3),
        ("decision_or_root_cause", [entry.decision_or_root_cause], 2),
        ("resolution_or_rule", [entry.resolution_or_rule], 2),
        ("validation", [entry.validation], 2),
    ]

    for field_name, values, weight in weighted_fields:
        field_score, field_reason = score_field(
            field_name=field_name,
            values=values,
            query_terms=query_terms,
            weight=weight,
        )
        score += field_score
        if field_reason:
            reasons.append(field_reason)

    return SearchResult(score=score, entry=entry, reasons=reasons)


def score_trigger_tags(trigger_tags: list[str], query_terms: set[str]) -> tuple[int, list[str]]:
    score: int = 0
    reasons: list[str] = []

    for tag in trigger_tags:
        normalized_tag: str = tag.lower()
        tag_terms: set[str] = tokenize(normalized_tag)
        if normalized_tag in query_terms:
            score += 10
            reasons.append(f"trigger_tags exact:{tag}")
            continue

        overlap: set[str] = query_terms & tag_terms
        if not overlap:
            continue

        tag_score: int = min(8, 2 * len(overlap))
        score += tag_score
        reasons.append(f"trigger_tags {tag} matched {','.join(sorted(overlap))}")

    return score, reasons


def score_field(
    field_name: str,
    values: list[str],
    query_terms: set[str],
    weight: int,
) -> tuple[int, str | None]:
    field_terms: set[str] = set()
    for value in values:
        field_terms.update(tokenize(value))

    overlap: set[str] = query_terms & field_terms
    if not overlap:
        return 0, None

    score: int = min(weight * 5, weight * len(overlap))
    reason: str = f"{field_name} matched {','.join(sorted(overlap))}"
    return score, reason


def has_frontmatter_value(values: dict[str, str | list[str]], key: str) -> bool:
    value: str | list[str] | None = values.get(key)
    if isinstance(value, list):
        return bool(value)
    if isinstance(value, str):
        return bool(value.strip())
    return False


def is_weak_trigger_tags(trigger_tags: list[str], entry_type: str) -> bool:
    strong_prefixes: tuple[str, ...] = (
        "component:",
        "domain:",
        "framework:",
        "tool:",
        "symptom:",
        "error:",
        "file:",
        "env:",
    )
    if len(trigger_tags) < 3:
        return True
    if f"type:{entry_type}" not in trigger_tags:
        return True
    if not any(tag.startswith(strong_prefixes) for tag in trigger_tags):
        return True
    return False


def find_duplicates(values: list[str]) -> list[str]:
    seen: set[str] = set()
    duplicates: set[str] = set()
    for value in values:
        normalized: str = " ".join(value.lower().split())
        if not normalized:
            continue
        if normalized in seen:
            duplicates.add(value)
        seen.add(normalized)
    return sorted(duplicates)


def print_audit_section(title: str, values: list[str]) -> None:
    if not values:
        return
    print(f"## {title}")
    print()
    for value in values:
        print(f"- {value}")
    print()


def normalize_query(query: str) -> list[str]:
    structured_terms: list[str] = re.split(r"[^a-zA-Z0-9_.:-]+", query.lower())
    all_terms: set[str] = set(tokenize(query))
    all_terms.update(term for term in structured_terms if term)
    return sorted(all_terms)


def expand_query_terms(query_terms: set[str]) -> set[str]:
    expanded_terms: set[str] = set(query_terms)

    for canonical, aliases in SEARCH_ALIASES.items():
        alias_terms: set[str] = {canonical}
        for alias in aliases:
            alias_terms.add(alias.lower())
            alias_terms.update(tokenize(alias))

        if query_terms & alias_terms:
            expanded_terms.update(alias_terms)
            expanded_terms.update(tokenize(canonical))

    return expanded_terms


def tokenize(value: str) -> set[str]:
    raw_terms: list[str] = re.split(r"[^0-9a-zA-Z\u4e00-\u9fff]+", value.lower())
    return {term for term in raw_terms if term}


def normalize_tokens(values: list[str]) -> list[str]:
    normalized: list[str] = []
    for value in values:
        for part in value.split(","):
            token: str = part.strip().lower()
            if token and token not in normalized:
                normalized.append(token)
    return normalized


def ensure_default_trigger_tags(entry_type: str, tags: list[str]) -> list[str]:
    default_type_tag: str = f"type:{entry_type}"
    if default_type_tag in tags:
        return tags
    return [default_type_tag, *tags]


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
