
export type ResultViewData = {
    colCity:string;
    laboratoryLocation:string;
    collectionTimeAndDateCollection:string;
    productionStartedAt:string;
    days:number;
    hours:number;
    minutes:number;
    roundedTimeNeeded:string;
    collectionTimeAndDateLab:string;
};


export function renderResult(data: ResultViewData) {
    const {
        colCity,
        laboratoryLocation,
        collectionTimeAndDateCollection,
        productionStartedAt,
        days,
        hours,
        minutes,
        roundedTimeNeeded,
        collectionTimeAndDateLab,
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

    <h1 class="h3 mb-4 text-center">Processing summary</h1>

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
              <td>${colCity}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
                 <td>${collectionTimeAndDateCollection}</td>
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
            <td>${laboratoryLocation}</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
                  <td>${collectionTimeAndDateLab}</td>
            </tr>
            <tr>
              <th>Production started at</th>
                   <td>${productionStartedAt}</td>
            </tr>
            <tr>
              <th>Exact time needed for processing</th>
              <td>${days} days ${hours} hours ${minutes} minutes </td>
            </tr>
            
               <tr>
              <th>Rounded time needed for processing</th>
             <td>${roundedTimeNeeded}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center">
      <a class="btn btn-outline-primary px-4" href="/">
        Recalculate
      </a>
    </div>

  </div>
</body>
</html>`;
}