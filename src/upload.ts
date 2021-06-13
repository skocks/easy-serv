import { writeFileSync } from "fs";
import { dirname } from "path";

import express, { Request, Response } from "express";

import { convertToAbsolutePath } from "./path-utils";
import { deleteExistingFile } from "./file-utils";
import { assertDirectory } from "./directory-utils";

export default function upload(filesDir: string) {
  return [express.raw(), handleUpload(filesDir)];
}

function handleUpload(filesDir: string) {
  return (request: Request, response: Response) => {
    const absoluteFileName = convertToAbsolutePath(filesDir, request.path);
    const absoluteDirectoryName = dirname(absoluteFileName);
    assertDirectory(absoluteDirectoryName);
    deleteExistingFile(absoluteFileName);
    writeBodyToFile(absoluteFileName, request.body);

    response.send("File uploaded.");
  };
}

function writeBodyToFile(absoluteFileName: string, body: Buffer) {
  writeFileSync(absoluteFileName, body);
}
