import { Response, Request } from "express";

export class TruckRouter {
  public routes(app, Knex): void {
    /**
     * fetchTrucks
     */
    app.get(
      "/api/trucks",
      async (req: Request, res: Response): Response => {
        const trucks: Array<Object> = await Knex.select("*").from("trucks");

        return res.json(trucks);
      }
    );
  }
}
