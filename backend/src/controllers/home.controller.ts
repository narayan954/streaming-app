import { Request, Response } from "express";

import fs from "fs";
import path from "path";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to my application." });
}

export function provideVideoStream(req: Request, res: Response): Response {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
    return res;
  }
  const videoPath = path.resolve(process.cwd(), "public/vidio.mp4");
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range?.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.on("error", (err) => {
    console.error(err);
    res.end();
  });
  videoStream.pipe(res);
  return res;
}
