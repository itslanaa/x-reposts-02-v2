// makefun-x-reposts-02 v2 re-entry (Node 22, standard library only).
//
// The entry itself is the six X posts listed in POSTS.json: each one quotes
// a different make.fun post from @makefunai, from the single public account
// @RAprnty, carrying make.fun and the play code makefun-candy-barrel-sweater
// in its own words. The house scores them from X directly, 2 points per
// repost, 2 per quote and 1 per like, added up over all six posts.
//
// This program does the one job the grader asks of it: it hands POSTS.json
// over to the output directory, byte for byte, so the gate can read the
// list. It makes no network call, reads no clock, touches no file outside
// this repository, and prints nothing when it succeeds, so two runs of it
// always write the same bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function fail(message: string): never {
  console.error(`x-reposts-02-v2: ${message}`);
  process.exit(1);
}

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const sourcePath = join(botDir, "POSTS.json");

let raw: string;
try {
  raw = readFileSync(sourcePath, "utf8");
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw!);
} catch (err) {
  fail(`POSTS.json is not valid JSON: ${(err as Error).message}`);
}

const posts = (parsed as { posts?: unknown }).posts;
if (!Array.isArray(posts)) {
  fail("POSTS.json must be an object with a posts array");
}
if (posts.length === 0 || posts.length > 15) {
  fail(`POSTS.json must name 1 to 15 posts, found ${posts.length}`);
}

const seen = new Set<string>();
for (const entry of posts) {
  if (typeof entry !== "string") {
    fail("every entry in posts must be a URL string");
  }
  if (!/^https:\/\/(x\.com|twitter\.com)\/\S+\/status\/\d+$/.test(entry)) {
    fail(`not an X post address: ${entry}`);
  }
  if (seen.has(entry)) {
    fail(`duplicate post listed twice: ${entry}`);
  }
  seen.add(entry);
}

mkdirSync(outputDir, { recursive: true });
try {
  writeFileSync(join(outputDir, "POSTS.json"), raw!, "utf8");
} catch (err) {
  fail(`could not write output POSTS.json: ${(err as Error).message}`);
}
