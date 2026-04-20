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

    const dt= new Date(localUnix * 1000).toISOString();

    return dateTime(dt) +" "+ targetTz.timeZoneName;
}