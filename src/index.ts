import {Hono} from "hono";
import {renderForm} from "./logic/summary";
import {predictionForm} from "./logic/prediction";
import {getUtcAndLocalTimeForCity} from "./functions/timeForCity";
import {convertIsoToTimeZone, localDateTimeToUtcIso} from "./functions/convertTimeZone";
import {dateTime as formatDateTime, diffUtcHoursMinutesIso, addHoursToUtcIso} from "./functions/dateTime";
import {renderResult} from "./views/result";
import {renderResultProcessing} from "./views/result_processing";

type Env = {
    GOOGLE_MAPS_API_KEY: string;
};

const index = new Hono<{ Bindings: Env }>();

index.get("/", (c) => c.html(renderForm({action: "/calculate"})));
index.get("/prediction", (c) => c.html(predictionForm({action: "/prediction"})));
index.post("/calculate", async (c) => {





    const body = await c.req.parseBody();

    const collectionPlace = typeof body.collectionPlace === "string" ? body.collectionPlace : "";
    const collectionDateTime = typeof body.collectionDateTime === "string" ? body.collectionDateTime : "";
    const processingDateTime = typeof body.processingDateTime === "string" ? body.processingDateTime : "";
    const labLocation = typeof body.labLocation === "string" ? body.labLocation : "Prague, CZ";

    const errors: string[] = [];
    if (!collectionPlace.trim()) errors.push("Collection Place is required.");
    if (!collectionDateTime) errors.push("Collection date/time is required.");
    if (!processingDateTime) errors.push("Processing date/time is required.");

    if (errors.length) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: errors.join(" "),
                values: {collectionPlace, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }


    // 1) get lab timezone/time info
    const lab = await getUtcAndLocalTimeForCity(labLocation, c.env.GOOGLE_MAPS_API_KEY);
    if (!lab.resolvedAddress) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Lab lookup failed: ${JSON.stringify(lab)}`,
                values: {collectionPlace, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }

    // 2) get collection place timezone/time info
    const col = await getUtcAndLocalTimeForCity(collectionPlace, c.env.GOOGLE_MAPS_API_KEY);
    if (!col.resolvedAddress) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Collection place lookup failed: ${c.json(col)}`,
                values: {collectionPlace, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }

    // Google-derived display fields
    const googleLabLocationPlace = lab.resolvedAddress;
    const googleCollectionPlace = col.resolvedAddress;
    const googleCollectionTZ = col.timeZoneName;
    const googleCollectionTimeDateFormatted = formatDateTime(col.localTimeIso);


    const collectionUtc = localDateTimeToUtcIso(collectionDateTime, col.totalOffsetSeconds);
    const labUtc = localDateTimeToUtcIso(processingDateTime, lab.totalOffsetSeconds);


    if (labUtc < collectionUtc) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Processing time must ber equal or greater than collection time`,
                values: {collectionPlace, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }


    const collectionDateTimeFormatted = convertIsoToTimeZone(collectionUtc, lab.timeZoneId);
    const processingDateTimeFormatted = convertIsoToTimeZone(labUtc, lab.timeZoneId);

    const diffHours = diffUtcHoursMinutesIso(labUtc,collectionUtc);
    const hours = diffHours.hours;
    const minutes = diffHours.minutes;


    return c.html(
        renderResult({
            collectionPlace,
            collectionDateTimeFormatted,
            processingDateTimeFormatted,
            labLocation,
            googleLabLocationPlace,
            googleCollectionTZ,
            googleCollectionPlace,
            googleCollectionTimeDateFormatted,
            hours,
            minutes,
        })
    );
});




index.post("/prediction", async (c) => {





    const body = await c.req.parseBody();

    const collectionPlace = typeof body.collectionPlace === "string" ? body.collectionPlace : "";
    const collectionDateTime = typeof body.collectionDateTime === "string" ? body.collectionDateTime : "";
    const hoursToProcess = typeof body.hoursToProcess === "string" ? body.hoursToProcess : "";
    const labLocation = typeof body.labLocation === "string" ? body.labLocation : "Prague, CZ";
// return c.json(hoursToProcess)
    const errors: string[] = [];
    if (!collectionPlace.trim()) errors.push("Collection Place is required.");
    if (!collectionDateTime) errors.push("Collection date/time is required.");
    if (!hoursToProcess) errors.push("Hours to process is required.");

    if (errors.length) {
        return c.html(
            predictionForm({
                action: "/prediction",
                error: errors.join(" "),
                values: {collectionPlace, collectionDateTime,  labLocation, hoursToProcess},
            }),
            400
        );
    }


    // 1) get lab timezone/time info
    const lab = await getUtcAndLocalTimeForCity(labLocation, c.env.GOOGLE_MAPS_API_KEY);
    if (!lab.resolvedAddress) {
        return c.html(
            predictionForm({
                action: "/prediction",
                error: `Lab lookup failed: ${JSON.stringify(lab)}`,
                values: {collectionPlace, collectionDateTime, labLocation, hoursToProcess},
            }),
            400
        );
    }

    // 2) get collection place timezone/time info
    const col = await getUtcAndLocalTimeForCity(collectionPlace, c.env.GOOGLE_MAPS_API_KEY);
    if (!col.resolvedAddress) {
        return c.html(
            predictionForm({
                action: "/prediction",
                error: `Collection place lookup failed: ${c.json(col)}`,
                values: {collectionPlace, collectionDateTime, labLocation, hoursToProcess},
            }),
            400
        );
    }

    // Google-derived display fields
    const googleLabLocationPlace = lab.resolvedAddress;
    const googleCollectionPlace = col.resolvedAddress;
    const googleCollectionTZ = col.timeZoneName;
    const googleCollectionTimeDateFormatted = formatDateTime(col.localTimeIso);


    const collectionUtc = localDateTimeToUtcIso(collectionDateTime, col.totalOffsetSeconds);

    const collectionDateTimeFormatted = convertIsoToTimeZone(collectionUtc, lab.timeZoneId);

    const productionMustStartByDate = addHoursToUtcIso(collectionUtc, Number(hoursToProcess));


    return c.html(
        renderResultProcessing({
            collectionPlace,
            collectionDateTimeFormatted,
            labLocation,
            hoursToProcess,
            googleLabLocationPlace,
            googleCollectionTZ,
            productionMustStartByDate,
            googleCollectionPlace,
            googleCollectionTimeDateFormatted,
        })
    );
});

export default index;