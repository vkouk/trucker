import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";

import { TruckRouter } from "./routes";

class App {
  public app: express.Application;
  public truckRoutes: TruckRouter = new TruckRouter();
  private postgresUri: string = "postgres://admin:vkouk@postgres:5432/trucker";
  private dbConfig: Knex.Config = {
    client: "pg",
    connection: this.postgresUri
  };
  public db: Knex = Knex(this.dbConfig);

  constructor() {
    this.app = express();
    this.config();
    this.truckRoutes.routes(this.app, this.db);
    this.db();
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }
}

export default new App().app;
