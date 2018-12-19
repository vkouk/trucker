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

    /**
     * fetchTruck by Title
     */
    app.get(
      "/api/truck/:title",
      async (req: Request, res: Response): Response => {
        const truck: Object = await Knex.select("*")
          .from("trucks")
          .where("title", req.params.title);

        return res.json(truck);
      }
    );

    /**
     * fetch all truck's locstions
     */
    app.get(
      "/api/truck/:title/locations",
      async (req: Request, res: Response): Response => {
        const truckLocations: Array<Object> = await Knex.select(
          "id",
          "title",
          "locations"
        )
          .from("trucks")
          .where("title", req.params.title);

        return res.json(truckLocations);
      }
    );
  }
}
