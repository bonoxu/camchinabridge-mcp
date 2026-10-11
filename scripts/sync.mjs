#!/usr/bin/env node
/**
 * Rewrites tools.json and the README tool table from the live server's
 * tools/list, so this repo always describes what is deployed. Run by the
 * daily workflow; the workflow commits only when something changed.
 */
import { readFileSync, writeFileSync } from "node:fs";

const ENDPOINT = "https://camchinabridge.co.uk/mcp";
const START = "<!-- tools:start -->";
const END = "<!-- tools:end -->";

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
  body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} })
});
if (!response.ok) throw new Error(`tools/list: HTTP ${response.status}`);
const body = await response.json();
const tools = body?.result?.tools;
if (!Array.isArray(tools) || tools.length === 0) throw new Error("tools/list returned no tools");

const firstSentence = (text) => {
  const match = String(text ?? "").match(/^[\s\S]*?[.!?](\s|$)/);
  return (match ? match[0] : String(text ?? "")).trim();
};

writeFileSync(
  "tools.json",
  JSON.stringify(
    tools.map(({ name, title, description, inputSchema, annotations }) => ({
      name,
      title,
      description,
      inputSchema,
      annotations
    })),
    null,
    2
  ) + "\n"
);

const rows = tools.map((tool) => {
  const kind =
    tool.annotations?.readOnlyHint === false
      ? "acts (sends an email after the user confirms)"
      : "read-only";
  return `| \`${tool.name}\` | ${tool.title ?? ""} | ${firstSentence(tool.description).replace(/\|/g, "\|")} | ${kind} |`;
});
const table = ["| Tool | Title | What it does | Type |", "| --- | --- | --- | --- |", ...rows].join("\n");

const readme = readFileSync("README.md", "utf8");
const start = readme.indexOf(START);
const end = readme.indexOf(END);
if (start < 0 || end < 0) throw new Error("README is missing the tools markers");
writeFileSync("README.md", `${readme.slice(0, start + START.length)}\n${table}\n${readme.slice(end)}`);
console.log(`Synced ${tools.length} tools.`);
