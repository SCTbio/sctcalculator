import {Hono} from "hono";
import {renderForm} from "./logic/summary";
import {predictionForm} from "./logic/prediction";
import {getUtcAndLocalTimeForCity} from "./functions/timeForCity";
import {convertToUnixTimestamp,unixSecondsToUtcAndLocalIso} from "./functions/temporal";
import {renderResult} from "./views/result";
import {renderResultProcessing} from "./views/result_processing";
import {diffUtcDaysHoursMinutesDaysUnix} from "./functions/dateTime";

type Env = {
    GOOGLE_MAPS_API_KEY: string;
};

const index = new Hono<{ Bindings: Env }>();

index.get("/", (c) => c.html(renderForm({action: "/calculate"})));
index.get("/prediction", (c) => c.html(predictionForm({action: "/prediction"})));
index.post("/calculate", async (c) => {





    const body = await c.req.parseBody();

    const collectionCity = typeof body.collectionPlace === "string" ? body.collectionPlace : "";
    const collectionDateTime = typeof body.collectionDateTime === "string" ? body.collectionDateTime : "";
    const processingDateTime = typeof body.processingDateTime === "string" ? body.processingDateTime : "";
    const labLocation = typeof body.labLocation === "string" ? body.labLocation : "Prague, CZ";

    const errors: string[] = [];
    if (!collectionCity.trim()) errors.push("Collection Place is required.");
    if (!collectionDateTime) errors.push("Collection date/time is required.");
    if (!processingDateTime) errors.push("Processing date/time is required.");

    if (errors.length) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: errors.join(" "),
                values: {collectionPlace: collectionCity, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }
    const lab = await getUtcAndLocalTimeForCity(labLocation, c.env.GOOGLE_MAPS_API_KEY);
    const col = await getUtcAndLocalTimeForCity(collectionCity, c.env.GOOGLE_MAPS_API_KEY);


    if (!lab.resolvedAddress) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Lab lookup failed: ${JSON.stringify(lab)}`,
                values: {collectionPlace: collectionCity, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }

    // 2) get collection place timezone/time info

    if (!col.resolvedAddress) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Collection place lookup failed: ${c.json(col)}`,
                values: {collectionPlace: collectionCity, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }

const labUtc = convertToUnixTimestamp(processingDateTime,lab.timeZoneId)
const collectionUtc = convertToUnixTimestamp(collectionDateTime,col.timeZoneId)


    if (labUtc < collectionUtc) {
        return c.html(
            renderForm({
                action: "/calculate",
                error: `Processing time must ber equal or greater than collection time`,
                values: {collectionPlace: collectionCity, collectionDateTime, processingDateTime, labLocation},
            }),
            400
        );
    }


    const diffHours = diffUtcDaysHoursMinutesDaysUnix(collectionUtc,labUtc);
    const hours = diffHours.hours;
    const minutes = diffHours.minutes;
    const days = diffHours.days;
    const collectionTimeAndDate = unixSecondsToUtcAndLocalIso(collectionUtc,lab.timeZoneId);
    const productionStartedAt = unixSecondsToUtcAndLocalIso(labUtc,lab.timeZoneId);
    const laboratoryLocation = lab.resolvedAddress;
    const colCity = col.resolvedAddress;
    const roundedTimeNeeded = hours + days*24 + ' hours';


    return c.html(
        renderResult({
            colCity,
            laboratoryLocation,
            collectionTimeAndDate,
            productionStartedAt,
            days,
            hours,
            minutes,
            roundedTimeNeeded,
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
    const collectionUnixSeconds = convertToUnixTimestamp(collectionDateTime,col.timeZoneId);

    const collectionTimeAndDateCol = unixSecondsToUtcAndLocalIso(collectionUnixSeconds,col.timeZoneId)
    const collectionTimeAndDateLab = unixSecondsToUtcAndLocalIso(collectionUnixSeconds,lab.timeZoneId)
    const productionMustStartBy = unixSecondsToUtcAndLocalIso(collectionUnixSeconds + 3600 * Number(hoursToProcess), lab.timeZoneId)
const collectionPlaceGoogle  = col.resolvedAddress;

    return c.html(
        renderResultProcessing({
            collectionPlaceGoogle,
            labLocation,
            hoursToProcess,
            collectionTimeAndDateLab,
            collectionTimeAndDateCol,
            productionMustStartBy,
        })
    );
});

export default index;