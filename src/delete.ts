import { Request, Response } from "express";
import { dirname } from "path";

import { convertToAbsolutePath } from "./path-utils";
import { deleteExistingFile } from "./file-utils";
import { deleteEmptyDirectoryRecursive } from "./directory-utils";

export default function doDelete(filesDir: string) {
  return [handleDelete(filesDir)];
}

function handleDelete(filesDir: string) {
  return (request: Request, response: Response) => {
    const absoluteFileName = convertToAbsolutePath(filesDir, request.path);
    deleteExistingFile(absoluteFileName);
    const parentDirectory = dirname(absoluteFileName);
    deleteEmptyDirectoryRecursive(parentDirectory);

    response.send("File deleted.");
  };
}
