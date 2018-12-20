import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";

import { TruckRouter } from "./routes";

class App {
  public app: express.Application;
  private env: string = process.env === "development" ? "dev" : "prod";
  public truckRoutes: TruckRouter = new TruckRouter();
  private postgresUri: string =
    this.env === "dev"
      ? "postgres://admin:vkouk@postgres:5432/trucker"
      : "postgres://icdaoyotljaryo:2cf7dcb9196edbc6e5a70580b59ee902a6aef2dda030057b3530ed86088c39d0@ec2-54-247-125-116.eu-west-1.compute.amazonaws.com:5432/d2bv9srds92gqk?ssl=true";
  private dbConfig: Knex.Config = {
    client: "pg",
    connection: this.postgresUri
  };
  public db: Knex = Knex(this.dbConfig);

  constructor() {
    this.app = express();
    this.config();
    this.truckRoutes.routes(this.app, this.db);
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }
}

export default new App().app;
