import { Hono } from "hono";
import { renderForm } from "./views/form";
import {getUtcAndLocalTimeForCity, timeForCity} from "./functions/timeForCity";
import { renderResult } from "./views/result";

type Env = {
    GOOGLE_MAPS_API_KEY: string;
};

const app = new Hono<{ Bindings: Env }>()

app.get("/", (c) => {
    return c.html(renderForm({ action: "/calculate" }));
});

app.post("/calculate", async (c) => {
    const body = await c.req.parseBody();

    const collectionPlace = typeof body.collectionPlace === "string" ? body.collectionPlace : "";
    const collectionDateTime = typeof body.collectionDateTime === "string" ? body.collectionDateTime : "";
    const processingDateTime = typeof body.processingDateTime === "string" ? body.processingDateTime : "";
    const labLocation = typeof body.labLocation === "string" ? body.labLocation : "Prague, CZ";


    // Basic validation (adjust as needed)
    const errors: string[] = [];
    if (!collectionPlace.trim()) errors.push("Collection Place is required.");
    if (!collectionDateTime) errors.push("Collection date/time is required.");
    if (!processingDateTime) errors.push("Processing date/time is required.");

    if (errors.length) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: errors.join(" "),
                values: { collectionPlace, collectionDateTime, processingDateTime, labLocation },
            }),
            400
        );
    }

    const res = await getUtcAndLocalTimeForCity(collectionPlace, c.env.GOOGLE_MAPS_API_KEY);
    return c.json(res);




    return c.html(
        renderResult({
            collectionPlace,
            collectionDateTime,
            processingDateTime,
            labLocation,

        })
    );
});

export default app;
