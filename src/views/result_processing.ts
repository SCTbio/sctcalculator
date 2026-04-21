
export type ResultViewData = {
    collectionPlace: string;
    productionMustStartByDate: string;
    collectionDateTimeFormatted: string;
    labLocation: string;
    googleCollectionPlace: string;
    googleLabLocationPlace: string;
    googleCollectionTZ: string;
    hoursToProcess: string;
    googleCollectionTimeDateFormatted: string;
};

function esc(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function renderResultProcessing(data: ResultViewData) {
    const {
        collectionDateTimeFormatted,
        labLocation,
        googleCollectionPlace,
        productionMustStartByDate,
        googleCollectionTimeDateFormatted,
        googleCollectionTZ,
        googleLabLocationPlace,
        hoursToProcess,
    } = data;

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Processing summary</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</head>

<body class="bg-light">
  <div class="container py-5">

    <h1 class="h3 mb-4 text-center">Processing prediction results</h1>

    <!-- Collection point -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white fw-semibold text-center">
        Collection point
      </div>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <tbody>
            <tr>
              <th class="w-50">Collection city</th>
              <td>${esc(googleCollectionPlace)}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
              <td>
                ${esc(googleCollectionTimeDateFormatted)}
                <span class="text-muted">(${esc(googleCollectionTZ)})</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Laboratory -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-primary text-white fw-semibold text-center">
        Laboratory
      </div>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <tbody>
            <tr>
              <th class="w-50">Laboratory location</th>
              <td>${esc(googleLabLocationPlace || labLocation)}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
              <td>${esc(collectionDateTimeFormatted)}</td>
            </tr>
            <tr>
              <th>Production must start by</th>
              <td>   TBD 🤷‍♂️</td>
            </tr>
            <tr>
              <th>Hours to process</th>
              <td>${esc(hoursToProcess)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center">
      <a class="btn btn-outline-primary px-4" href="/prediction">
        Recalculate
      </a>
    </div>

  </div>
</body>
</html>`;
}