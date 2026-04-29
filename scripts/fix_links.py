#!/usr/bin/env python3
"""Sweep all HTML files and rewrite /pinelabs_docs/<x> links into proper relative paths."""
import os, re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent

URL_MAP = {
    "": "index.html",
    "init": "init.html",
    "do-transaction": "do-transaction.html",
    "devices": "devices.html",
    "devices/data.json": "devices/data.json",
    "css/style.css": "css/style.css",
    "js/main.js": "js/main.js",
}

PINELABS_RE = re.compile(r"""/pinelabs_docs/([^"'\s#)]*)?(#[^"'\s)]*)?""")


def rel(target_repo_path, from_file):
    target, _, frag = target_repo_path.partition("#")
    rp = os.path.relpath(root / target, start=(root / from_file).parent)
    rp = rp.replace(os.sep, "/")
    return rp + (("#" + frag) if frag else "")


def resolve(url_tail, frag, from_file):
    url_tail = url_tail or ""
    frag = frag or ""
    if url_tail in URL_MAP:
        return rel(URL_MAP[url_tail], from_file) + frag
    if url_tail.startswith("devices/") and not url_tail.endswith(".json"):
        slug = url_tail.split("/", 1)[1]
        if slug and "/" not in slug:
            return rel("device-detail.html", from_file) + f"?slug={slug}" + frag
    if url_tail.startswith("concepts/"):
        slug = url_tail.split("/", 1)[1]
        if slug and not slug.endswith(".html"):
            return rel(f"concepts/{slug}.html", from_file) + frag
    return rel(url_tail or "index.html", from_file) + frag


def main():
    changed = []
    for path in root.rglob("*.html"):
        rp = path.relative_to(root).as_posix()
        text = path.read_text(encoding="utf-8")
        new = PINELABS_RE.sub(lambda m: resolve(m.group(1), m.group(2), rp), text)
        if new != text:
            path.write_text(new, encoding="utf-8")
            changed.append(rp)
    print("Updated", len(changed), "files:")
    for c in changed:
        print(" -", c)


if __name__ == "__main__":
    main()
