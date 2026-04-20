// src/views/result.ts

type ResultViewData = {
    collectionPlace: string;
    collectionDateTimeFormatted: string;
    processingDateTimeFormatted: string;
    labLocation: string;
    googleCollectionPlace: string;
    googleLabLocationPlace: string;
    googleCollectionTZ: string;
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

export function renderResult(data: {
    collectionPlace: any;
    collectionDateTimeFormatted: any;
    processingDateTimeFormatted: any;
    labLocation: any;
    googleLabLocationPlace: string;
    googleCollectionTZ: string;
    googleCollectionPlace: string;
    googleCollectionTimeDateFormatted: string
}) {
    const {
        collectionDateTimeFormatted,
        processingDateTimeFormatted,
        labLocation,
        googleCollectionPlace,
        googleCollectionTimeDateFormatted,
        googleCollectionTZ,
        googleLabLocationPlace
    } = data;

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Result</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="bg-light">
  <div class="container py-5">
    <div class="card shadow-sm">
      <div class="card-body">
        <h1 class="h4 mb-3">Calculation received</h1>
        <ul class="mb-4">
          <li><strong>Collection City:</strong> ${esc(googleCollectionPlace)}</li>
          <li><strong>Collection Date/Time:</strong> ${esc(googleCollectionTimeDateFormatted)}  ${esc(googleCollectionTZ)}</li>
          <li><strong>Lab Location:</strong> ${esc(googleLabLocationPlace)}</li>
          <li><strong>Collection time and date:</strong> ${esc(collectionDateTimeFormatted)}</li>
          <li><strong>Production started at:</strong> ${esc(processingDateTimeFormatted)}</li>
          <li><strong>Exact time needed for processing:</strong> ${esc(processingDateTimeFormatted)}</li>
          <li><strong>Rounded time needed for processing:</strong> ${esc(processingDateTimeFormatted)}</li>
          <li><strong>Timezone difference:</strong> ${esc(processingDateTimeFormatted)}</li>
        </ul>

        <a class="btn btn-outline-primary" href="/">Back</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}