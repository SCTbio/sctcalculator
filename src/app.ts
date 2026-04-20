import { Hono } from "hono";
import { renderForm } from "./views/form";

const app = new Hono();

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

    // logika
    return c.html(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Result</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
  <div class="container py-5">
    <div class="card shadow-sm">
      <div class="card-body">
        <h1 class="h4 mb-3">Calculation received</h1>
        <ul class="mb-4">
          <li><strong>Collection Place:</strong> ${collectionPlace}</li>
          <li><strong>Collection Date/Time:</strong> ${collectionDateTime}</li>
          <li><strong>Processing Date/Time:</strong> ${processingDateTime}</li>
          <li><strong>Lab Location:</strong> ${labLocation}</li>
        </ul>

        <a class="btn btn-outline-primary" href="/">Back</a>
      </div>
    </div>
  </div>
</body>
</html>`);
});

export default app;