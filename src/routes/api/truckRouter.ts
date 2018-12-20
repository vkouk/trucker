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
     * fetch/update truck's locstions
     */
    app
      .route("/api/truck/:title/locations")
      .get(
        async (req: Request, res: Response): Response => {
          const truckLocations: Array<Object> = await Knex.select("locations")
            .from("trucks")
            .where("title", req.params.title);

          return res.json(truckLocations[0]);
        }
      )
      .post(
        async (req: Request, res: Response): Response => {
          const prevLocations: Array<Object> = await Knex.select("locations")
            .from("trucks")
            .where("title", req.params.title);

          return Knex("trucks")
            .update({
              locations: {
                ...prevLocations[0].locations,
                ...req.body.locations
              }
            })
            .where("title", req.params.title)
            .then(() => {
              res.json({
                message: `You have succesfully add new locations for ${
                  req.params.title
                }!`
              });
            });
        }
      );

    /**
     * create new truck
     */
    app.post(
      "/api/truck",
      (req: Request, res: Response): Response => {
        return Knex("trucks")
          .insert(req.body)
          .then(() => {
            return res.json({
              message: "You have succesfully added your new truck!"
            });
          });
      }
    );

    /**
     * edit existing truck
     */
    app.put(
      "/api/truck/:id/edit",
      (req: Request, res: Response): Response => {
        const { title, model, brand, licence, color, size } = req.body;

        return Knex("trucks")
          .where("id", req.params.id)
          .update({
            title,
            model,
            brand,
            licence,
            color,
            size
          })
          .then(() => {
            return res.json({
              message: "You have succesfully added your new truck!"
            });
          });
      }
    );
  }
}
