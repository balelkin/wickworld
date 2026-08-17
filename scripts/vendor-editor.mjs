import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "public", "editor");
const cache = path.join(root, ".cache", "wick-editor-gh-pages");
const bridgeSrc = path.join(root, "scripts", "wickworld-bridge.js");
const skip =
  process.env.npm_lifecycle_event === "dev" &&
  existsSync(path.join(dest, "wickworld-bridge.js")) &&
  process.env.VENDOR_EDITOR_FORCE !== "1";

if (skip) {
  process.exit(0);
}

if (!existsSync(path.join(cache, "index.html"))) {
  mkdirSync(path.dirname(cache), { recursive: true });
  execSync(
    `git clone --depth 1 --branch gh-pages https://github.com/Wicklets/wick-editor.git "${cache}"`,
    { stdio: "inherit" },
  );
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

const skipNames = new Set([".git", "CNAME", "examples", "electron.js", "icon.icns"]);

for (const name of [
  "asset-manifest.json",
  "builtinlibrary",
  "corelibs",
  "cursors",
  "favicon.ico",
  "fonts",
  "index.html",
  "license_en.txt",
  "manifest.json",
  "preloader-animation.css",
  "static",
  "wait-overlay.css",
]) {
  if (skipNames.has(name)) {
    continue;
  }
  const from = path.join(cache, name);
  if (existsSync(from)) {
    cpSync(from, path.join(dest, name), { recursive: true });
  }
}

cpSync(bridgeSrc, path.join(dest, "wickworld-bridge.js"));

const indexPath = path.join(dest, "index.html");
let html = readFileSync(indexPath, "utf8");
html = html.replace(
  /<script async defer="defer" data-domain="wickeditor.com" src="https:\/\/plausible.io\/js\/plausible.hash.js"><\/script>/,
  "",
);
html = html.replace(
  '<script src="./corelibs/wick-engine/wickengine.js"></script>',
  '<script src="./corelibs/wick-engine/wickengine.js"></script><script src="./wickworld-bridge.js"></script>',
);
writeFileSync(indexPath, html);

writeFileSync(
  path.join(dest, "GPL-NOTICE.txt"),
  "Wick Editor is GPL v3. Source: https://github.com/balelkin/wick-editor (upstream Wicklets/wick-editor).\n",
);

console.log("Vendored Wick Editor into public/editor");
