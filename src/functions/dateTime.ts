import {CityTimeResult} from "./timeForCity";


export function diffUtcDaysHoursMinutesDaysUnix(startUtc: number, endUtc: number) {
    if (!Number.isFinite(startUtc) || !Number.isFinite(endUtc)) {
        throw new Error("Invalid unix timestamp (must be a finite number).");
    }

    const diffSeconds = Math.abs(endUtc - startUtc);

    const days = Math.floor(diffSeconds / 86400); // 24*60*60
    const remainingAfterDays = diffSeconds % 86400;

    const hours = Math.floor(remainingAfterDays / 3600);
    const minutes = Math.floor((remainingAfterDays % 3600) / 60);

    return { days, hours, minutes };
}
