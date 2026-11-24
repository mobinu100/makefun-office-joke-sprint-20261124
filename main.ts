import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke: the "quick sync" that is anything but quick.
// Setup names a concrete office ritual (the 47-slide deck + pre-read),
// the twist escalates it into a meeting about scheduling the next meeting.
const JOKE =
  "Our 'quick sync' has a 47-slide deck, a pre-read, and a follow-up meeting to schedule the follow-up meeting.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: entry must be 1-200 UTF-8 characters, one line, not only whitespace.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error(`entry length ${chars} characters is out of range`);
}
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// joke, so a partial write or encoding slip can never ship silently.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt on disk does not match the joke");
}
