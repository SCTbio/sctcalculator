import {Temporal} from "@js-temporal/polyfill";

export function convertToUnixTimestamp(
    dateTime: string,
    timeZone: string
): number {

    const pdt = Temporal.PlainDateTime.from(dateTime);

    const zdt = pdt.toZonedDateTime(timeZone);

    const instant = zdt.toInstant();

    return instant.epochMilliseconds / 1000;
}

export function unixSecondsToUtcAndLocalIso(
    unixSeconds: number,
    timeZone: string
): string {
    const instant = Temporal.Instant.fromEpochMilliseconds(1000 * unixSeconds);
    const zdt = instant.toZonedDateTimeISO(timeZone);

    const hh = String(zdt.hour).padStart(2, "0");
    const mm = String(zdt.minute).padStart(2, "0");
    const ss = String(zdt.second).padStart(2, "0");

    return `${zdt.day}.${zdt.month}.${zdt.year} ${hh}:${mm}:${ss} [${zdt.timeZoneId}]`;
}
