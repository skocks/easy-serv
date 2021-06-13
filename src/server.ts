import express from "express";
import serveIndex from "serve-index";

import upload from "./upload";
import doDelete from "./delete";

export interface ServerConfig {
  port: number;
  filesDir: string;
}

export function start({ port, filesDir }: ServerConfig): Promise<void> {
  const app = express();

  return new Promise((resolve, reject) => {
    try {
      app.post(["/", "/*"], upload(filesDir));
      app.delete(["/", "/*"], doDelete(filesDir));
      app.use(express.static(filesDir, { }), serveIndex(filesDir, {}));

      app.listen(port, () => {
        console.log(`EasyServ listening at http://localhost:${port}`);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
