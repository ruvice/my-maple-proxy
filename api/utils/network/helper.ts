export function getAPIDate(): string {
    const now = new Date();

    // SGT is UTC+8
    const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;
    const sgtTime = new Date(now.getTime() + SGT_OFFSET_MS);

    const hourSGT = sgtTime.getUTCHours(); // already offset to SGT
    // If it's before 2am in SGT, use 2 days ago, else we want previous day
    if (hourSGT < 2) {
        sgtTime.setDate(sgtTime.getDate() - 2);
    } else {
        sgtTime.setDate(sgtTime.getDate() - 1);
    }

    const year = sgtTime.getUTCFullYear();
    const month = String(sgtTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(sgtTime.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Used for Maplesea Open APIs
export function getAPIDateForXDaysAgo(offset: number): string {
    const now = new Date();

    // SGT is UTC+8
    const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;
    const sgtTime = new Date(now.getTime() + SGT_OFFSET_MS);

    const hourSGT = sgtTime.getUTCHours(); // already offset to SGT
    // If it's before 2am in SGT, use 2 days ago, else we want previous day
    if (hourSGT < 2) {
        sgtTime.setDate(sgtTime.getDate() - 1 - offset);
    } else {
        sgtTime.setDate(sgtTime.getDate() - offset);
    }

    const year = sgtTime.getUTCFullYear();
    const month = String(sgtTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(sgtTime.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getNext2amSGTEpoch(): number {
    const now = new Date();

    // Get SGT (UTC+8) offset in milliseconds
    const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;

    // Current time in SGT
    const nowInSGT = new Date(now.getTime() + SGT_OFFSET_MS);

    const next2am = new Date(nowInSGT);
    next2am.setHours(2, 0, 0, 0);

    // If now is past 2am SGT, move to next day
    if (nowInSGT.getHours() >= 2) {
        next2am.setDate(next2am.getDate() + 1);
    }

    // Convert 2am SGT back to UTC
    const next2amUTC = new Date(next2am.getTime() - SGT_OFFSET_MS);

    // Epoch seconds
    return Math.floor(next2amUTC.getTime() / 1000);
}

export function getCurrentDateTimeInSGT(): string {
    const now = new Date();

    // Convert to SGT (UTC+8)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const sgt = new Date(utc + 8 * 60 * 60000);

    // Roll back one day if before 2AM SGT
    if (sgt.getHours() < 2) {
        sgt.setDate(sgt.getDate() - 1);
    }

    const pad = (n: number) => String(n).padStart(2, '0');

    const year = sgt.getFullYear();
    const month = pad(sgt.getMonth() + 1);
    const day = pad(sgt.getDate());
    const hours = pad(sgt.getHours());
    const minutes = pad(sgt.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}+08:00`;
}
