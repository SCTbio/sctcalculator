import {CityTimeResult} from "./timeForCity";

/**
 * Formats an ISO datetime string to "YYYY-MM-DD HH:mm:ss"
 * Example:
 *   "2026-04-20T15:08:19.000Z" → "2026-04-20 15:08:19"
 */
export function dateTime(dateTime: string): string {
    return dateTime
        .slice(0, 19)
        .replace("T", " ");
}


export function convertToTimezone(utcNowUnix: number,targetTz: CityTimeResult) {
    const localUnix = utcNowUnix + targetTz.totalOffsetSeconds;

    return  new Date(localUnix * 1000).toISOString();
}

export function diffUtcHoursMinutesIso(startUtcIso: string, endUtcIso: string) {
    const startMs = Date.parse(startUtcIso);
    const endMs = Date.parse(endUtcIso);

    if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
        throw new Error("Invalid UTC ISO datetime string (expected ...Z).");
    }

    const diffSeconds = Math.abs(endMs - startMs) / 1000;

    return {
        hours: Math.floor(diffSeconds / 3600),
        minutes: Math.floor((diffSeconds % 3600) / 60),
    };
}

export function addHoursToUtcIso(utcIso: string, hoursToAdd: number): string {
    const date = new Date(utcIso);
    date.setUTCSeconds(date.getUTCSeconds() + hoursToAdd * 3600);
    return date.toISOString();
}
``