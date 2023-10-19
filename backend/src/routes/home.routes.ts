import { provideVideoStream, welcome } from "../controllers/home.controller";

import { Router } from "express";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.get("/video", provideVideoStream);
  }
}

export default new HomeRoutes().router;
