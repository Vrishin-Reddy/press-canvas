import { describe, it, expect } from "vitest";
import { filesToBase64 } from "@/lib/filesToBase64";

function makeInputWithFiles(files: File[]): HTMLInputElement {
  const input = document.createElement("input");
  Object.defineProperty(input, "files", { value: files, writable: false });
  return input as HTMLInputElement;
}

describe("filesToBase64", () => {
  it("converts selected files to base64 with metadata", async () => {
    const f1 = new File([new Uint8Array([1, 2, 3])], "a.txt", { type: "text/plain" });
    const f2 = new File([new Uint8Array([4, 5])], "b.bin", { type: "application/octet-stream" });
    const el = makeInputWithFiles([f1, f2]);
    const out = await filesToBase64([el]);
    expect(out).toHaveLength(2);
    expect(out[0].filename).toBe("a.txt");
    expect(typeof out[0].content).toBe("string");
    expect(out[0].contentType).toBe("text/plain");
    expect(out[0].size).toBe(f1.size);
  });
});


