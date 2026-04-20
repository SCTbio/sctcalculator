// src/views/result.ts

type ResultViewData = {
    collectionPlace: string;
    collectionDateTime: string;
    processingDateTime: string;
    labLocation: string;
};

function esc(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function renderResult(data: ResultViewData) {
    const { collectionPlace, collectionDateTime, processingDateTime, labLocation, result } = data;

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
          <li><strong>Collection Place:</strong> ${esc(collectionPlace)}</li>
          <li><strong>Collection Date/Time:</strong> ${esc(collectionDateTime)}</li>
          <li><strong>Processing Date/Time:</strong> ${esc(processingDateTime)}</li>
          <li><strong>Lab Location:</strong> ${esc(labLocation)}</li>
        </ul>

        <a class="btn btn-outline-primary" href="/">Back</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}