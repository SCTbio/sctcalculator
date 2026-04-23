
export type ResultViewData = {
    collectionPlaceGoogle:string;
    labLocation:string;
    hoursToProcess:string;
    productionMustStartBy:string;
    collectionTimeAndDateLab:string;
    collectionTimeAndDateCol:string;
};


export function renderResultProcessing(data: ResultViewData) {
    const {
        collectionPlaceGoogle,
        labLocation,
        hoursToProcess,
        productionMustStartBy,
        collectionTimeAndDateLab,
        collectionTimeAndDateCol,
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
              <td>${collectionPlaceGoogle}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
              <td>
                ${collectionTimeAndDateCol}
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
              <td>${labLocation}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
               <td>${collectionTimeAndDateLab}</td>
            </tr>
            <tr>
              <th>Production must start by</th>
           <td>${productionMustStartBy}</td>
            </tr>
            <tr>
              <th>Hours to process</th>
              <td>${hoursToProcess}</td>
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