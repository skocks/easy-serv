import { join, normalize } from "path";

export function convertToAbsolutePath(filesDir: string, path: string) {
  return normalize(join(process.cwd(), filesDir, path));
}
