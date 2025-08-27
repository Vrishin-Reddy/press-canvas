<<<<<<< HEAD
import fs from "node:fs";
import path from "node:path";

const findings = [];

function checkObjectForLegacy(obj, filePath, pathTrail = []) {
  if (!obj || typeof obj !== "object") return;

  // Legacy top-level 'builds' array (Now/Vercel v1)
  if (Array.isArray(obj.builds)) {
    findings.push(`${filePath} :: contains legacy 'builds'`);
  }

  for (const [key, value] of Object.entries(obj)) {
    const nextTrail = [...pathTrail, key];
    if (typeof value === "string") {
      // Legacy 'use' or 'runtime' without version suffix like @vercel/node@3
      if ((key === "use" || key === "runtime") && /@(?:now|vercel)\//i.test(value) && !/@\d/.test(value)) {
        findings.push(`${filePath} :: ${nextTrail.join(".")} has unversioned runtime '${value}'`);
      }
    } else if (value && typeof value === "object") {
      checkObjectForLegacy(value, filePath, nextTrail);
    }
  }
}
=======
const fs = require("fs");
const path = require("path");

const banned = [/\"builds\"\s*:/i, /\"use\"\s*:/i, /@now\//i, /now-/i, /@vercel\/node\"\s*:/i]; // unversioned "use"
const hit = [];
>>>>>>> e725d928e6f4f8c5d7c283483279184bcd76fc85

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (f === "node_modules" || f.startsWith(".")) continue;
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
<<<<<<< HEAD
    if (stat.isDirectory()) {
      scan(p);
    } else if (/\.(json|jsonc|yml|yaml)$/i.test(f)) {
      try {
        const raw = fs.readFileSync(p, "utf8");
        const json = JSON.parse(raw);
        checkObjectForLegacy(json, p);
      } catch (_) {
        // ignore non-JSON or commented JSON files
=======
    if (stat.isDirectory()) scan(p);
    else if (/\.(json|js|ts|cjs|mjs|jsonc)$/i.test(f)) {
      const s = fs.readFileSync(p, "utf8");
      for (const re of banned) {
        if (re.test(s)) hit.push(`${p} :: matches ${re}`);
>>>>>>> e725d928e6f4f8c5d7c283483279184bcd76fc85
      }
    }
  }
}
<<<<<<< HEAD

scan(process.cwd());
if (findings.length) {
  console.error("❌ Legacy Now/Vercel config found:\n" + findings.join("\n"));
=======
scan(process.cwd());
if (hit.length) {
  console.error("❌ Legacy Now/Vercel config found:\n" + hit.join("\n"));
>>>>>>> e725d928e6f4f8c5d7c283483279184bcd76fc85
  process.exit(1);
} else {
  console.log("✅ No legacy config detected.");
}
