const fs = require("fs");
const path = require("path");

const banned = [/\"builds\"\s*:/i, /\"use\"\s*:/i, /@now\//i, /now-/i, /@vercel\/node\"\s*:/i]; // unversioned "use"
const hit = [];

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (f === "node_modules" || f.startsWith(".")) continue;
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) scan(p);
    else if (/\.(json|js|ts|cjs|mjs|jsonc)$/i.test(f)) {
      const s = fs.readFileSync(p, "utf8");
      for (const re of banned) {
        if (re.test(s)) hit.push(`${p} :: matches ${re}`);
      }
    }
  }
}
scan(process.cwd());
if (hit.length) {
  console.error("❌ Legacy Now/Vercel config found:\n" + hit.join("\n"));
  process.exit(1);
} else {
  console.log("✅ No legacy config detected.");
}
