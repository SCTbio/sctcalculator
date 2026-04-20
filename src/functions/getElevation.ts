// src/lib/getElevation.ts

export type ElevationApiResponse = {
    results: Array<{
        elevation: number
        location: { lat: number; lng: number }
        resolution: number
    }>
    status: string
    error_message?: string
}

export type ElevationResult = ElevationApiResponse["results"][number]

/**
 * Cloudflare Workers compatible (uses fetch).
 * Returns the first elevation result for the given lat/lng.
 */
export async function getElevation(
    lat: number,
    lng: number,
    apiKey: string,
    opts?: { timeoutMs?: number }
): Promise<ElevationResult> {
    const url = new URL("https://maps.googleapis.com/maps/api/elevation/json")
    url.searchParams.set("locations", `${lat},${lng}`)
    url.searchParams.set("key", apiKey)

    // Optional timeout (works in Workers)
    const timeoutMs = opts?.timeoutMs ?? 5000
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), timeoutMs)

    try {
        const resp = await fetch(url.toString(), {
            method: "GET",
            signal: controller.signal,
            headers: {
                "Accept": "application/json",
            },
        })

        const contentType = resp.headers.get("content-type") ?? ""
        const isJson = contentType.includes("application/json")

        const data = (isJson ? await resp.json() : null) as ElevationApiResponse | null

        // Google may return HTTP 200 with status != "OK"
        if (!resp.ok) {
            const msg =
                data?.error_message ??
                `HTTP ${resp.status} ${resp.statusText}`
            throw new Error(msg)
        }

        if (!data) {
            throw new Error("Unexpected non-JSON response from Google Elevation API.")
        }

        if (data.status !== "OK") {
            const msg = data.error_message ?? `Google Elevation status: ${data.status}`
            throw new Error(msg)
        }

        const result = data.results?.[0]
        if (!result) {
            throw new Error("Google Elevation API returned no results.")
        }

        return result
    } catch (e: unknown) {
        // Improve error message for AbortError
        if (e instanceof Error && e.name === "AbortError") {
            throw new Error(`Google Elevation request timed out after ${timeoutMs}ms`)
        }
        throw e
    } finally {
        clearTimeout(t)
    }
}
