
type GeocodeResponse = {
    status: string;
    error_message?: string;
    results: Array<{
        geometry: { location: { lat: number; lng: number } };
        formatted_address: string;
    }>;
};

type TimeZoneResponse = {
    status: string;
    errorMessage?: string;          // some responses use errorMessage
    error_message?: string;         // some use error_message
    dstOffset?: number;             // seconds
    rawOffset?: number;             // seconds
    timeZoneId?: string;            // IANA tz id
    timeZoneName?: string;          // long name
};

export type CityTimeResult = {
    cityQuery: string;
    resolvedAddress: string;
    lat: number;
    lng: number;

    utcNowIso: string;
    utcNowUnix: number;

    timeZoneId: string;
    timeZoneName: string;
    rawOffsetSeconds: number;
    dstOffsetSeconds: number;
    totalOffsetSeconds: number;

    localTimeIso: string;
};

async function geocodeCity(city: string, apiKey: string): Promise<{ lat: number; lng: number; address: string }> {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.set("address", city);
    url.searchParams.set("key", apiKey);

    const resp = await fetch(url.toString());
    const data = (await resp.json()) as GeocodeResponse;

    if (!resp.ok || data.status !== "OK" || !data.results?.[0]) {
        const msg = data.error_message ?? `Geocoding failed: ${data.status}`;
        throw new Error(msg);
    }

    const first = data.results[0];
    return {
        lat: first.geometry.location.lat,
        lng: first.geometry.location.lng,
        address: first.formatted_address,
    };
}

/**
 * Time Zone API request needs:
 * - location=lat,lng
 * - timestamp=seconds since epoch (UTC)
 * It returns rawOffset + dstOffset (seconds) and tz identifiers. [2](https://developers.google.com/maps/documentation/timezone/requests-timezone)[1](https://developers.google.com/maps/documentation/timezone/overview)
 */
async function getTimeZone(lat: number, lng: number, utcUnixSeconds: number, apiKey: string): Promise<Required<TimeZoneResponse>> {
    const url = new URL("https://maps.googleapis.com/maps/api/timezone/json");
    url.searchParams.set("location", `${lat},${lng}`);
    url.searchParams.set("timestamp", String(utcUnixSeconds));
    url.searchParams.set("key", apiKey);

    const resp = await fetch(url.toString());
    const data = (await resp.json()) as TimeZoneResponse;

    if (!resp.ok || data.status !== "OK") {
        const msg = data.error_message ?? data.errorMessage ?? `Time Zone API failed: ${data.status}`;
        throw new Error(msg);
    }

    // Ensure required fields exist
    if (
        typeof data.rawOffset !== "number" ||
        typeof data.dstOffset !== "number" ||
        typeof data.timeZoneId !== "string" ||
        typeof data.timeZoneName !== "string"
    ) {
        throw new Error("Time Zone API returned an unexpected shape.");
    }

    return data as Required<TimeZoneResponse>;
}

export async function getUtcAndLocalTimeForCity(city: string, apiKey: string): Promise<CityTimeResult> {
    const utcNow = new Date();
    const utcNowUnix = Math.floor(utcNow.getTime() / 1000);

    const { lat, lng, address } = await geocodeCity(city, apiKey);
    const tz = await getTimeZone(lat, lng, utcNowUnix, apiKey);

    const totalOffsetSeconds = tz.rawOffset + tz.dstOffset;

    const localMillis = (utcNowUnix + totalOffsetSeconds) * 1000;
    const localTimeIso = new Date(localMillis).toISOString();

    return {
        cityQuery: city,
        resolvedAddress: address,
        lat,
        lng,

        utcNowIso: utcNow.toISOString(),
        utcNowUnix,

        timeZoneId: tz.timeZoneId,
        timeZoneName: tz.timeZoneName,
        rawOffsetSeconds: tz.rawOffset,
        dstOffsetSeconds: tz.dstOffset,
        totalOffsetSeconds,

        localTimeIso,
    };
}
