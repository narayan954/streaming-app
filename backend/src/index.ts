import cors, { CorsOptions } from "cors";
import express, { Application } from "express";

import Routes from "./routes";
import path from "path";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "*",
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.static(path.join(process.cwd(), "public")));
    app.use(express.urlencoded({ extended: true }));
  }
}
