

export type ConvertOptions = {
    locale?: string;           // e.g. "en-GB", "cs-CZ"
    withSeconds?: boolean;     // default true
    timeZoneName?: "short" | "long" | "none"; // default "short"
};

/**
 * Convert/format an ISO datetime string into a target IANA timezone.
 * Input can be ISO with "Z" or with offset; Date will parse it.
 */
export function convertIsoToTimeZone(
    isoDateTime: string,
    targetTimeZoneId: string,
    opts: ConvertOptions = {}
): string {
    const d = new Date(isoDateTime);
    if (Number.isNaN(d.getTime())) return "";

    const locale = opts.locale ?? "en-GB";
    const withSeconds = opts.withSeconds ?? true;
    const timeZoneName = opts.timeZoneName ?? "short";

    const fmt = new Intl.DateTimeFormat(locale, {
        timeZone: targetTimeZoneId,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        ...(withSeconds ? { second: "2-digit" as const } : {}),
        hour12: false,
        ...(timeZoneName === "none" ? {} : { timeZoneName }),
    });

    return fmt.format(d);
}

/**
 * Convert a local datetime string (YYYY-MM-DDTHH:mm)
 * interpreted in a timezone with known offset
 * into a UTC ISO string.
 *
 * @param localDateTime - e.g. "2026-04-21T09:28"
 * @param totalOffsetSeconds - e.g. 7200 for CEST
 * @returns UTC ISO string, e.g. "2026-04-21T07:28:00.000Z"
 */
export function localDateTimeToUtcIso(
    localDateTime: string,
    totalOffsetSeconds: number
): string {
    const naiveUnix =
        Math.floor(Date.parse(localDateTime + "Z") / 1000);

    const unixUtc = naiveUnix - totalOffsetSeconds;

    return new Date(unixUtc * 1000).toISOString();
}

