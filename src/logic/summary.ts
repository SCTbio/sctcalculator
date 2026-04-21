type FormValues = {
    collectionPlace?: string;
    collectionDateTime?: string;
    processingDateTime?: string;
    labLocation?: string;
};

function esc(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export function renderForm(opts?: {
    action?: string;
    values?: FormValues;
    error?: string;
}) {
    const action = opts?.action ?? "/calculate";
    const v = opts?.values ?? {};

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SCT Leukapheresis Calculator</title>

  <!-- Bootstrap 5 -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</head>

<body class="bg-light">
  <!-- Top banner -->
<div class="py-5 bg-secondary bg-opacity-10 border-bottom">
  <div class="container text-center">

    <h1 class="display-5 fw-semibold mb-3">
      SCT Leukapheresis Calculator
    </h1>

    <!-- Horizontal links -->
    <ul class="nav justify-content-center gap-3">
      <li class="nav-item">
        <a class="nav-link" href="/">Summary</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Prediction</a>
      </li>
    </ul>

  </div>
</div>

  <main class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-7 col-xl-6">
        <div class="py-5">
          <h2 class="text-center fw-semibold mb-4">Processing summary calculation</h2>

          ${
        opts?.error
            ? `<div class="alert alert-danger" role="alert">${esc(opts.error)}</div>`
            : ""
    }

          <form method="post" action="${esc(action)}" class="bg-white p-4 p-md-5 rounded-3 shadow-sm">
            <!-- Collection place -->
            <div class="mb-3">
              <label for="collectionPlace" class="form-label">Collection Place:</label>
              <input
                type="text"
                class="form-control"
                id="collectionPlace"
                name="collectionPlace"
                value="${v.collectionPlace ? esc(v.collectionPlace) : ""}"
                autocomplete="off"
              />
            </div>

            <!-- Collection datetime -->
            <div class="mb-3">
              <label for="collectionDateTime" class="form-label">Local date and time of collection:</label>
              <div class="form-text mb-1">Format: 2026-04-20 10:51:15</div>
              <input
                type="datetime-local"
                class="form-control"
                id="collectionDateTime"
                name="collectionDateTime"
                value="${v.collectionDateTime ? esc(v.collectionDateTime) : ""}"
              />
            </div>

            <!-- Processing datetime -->
            <div class="mb-4">
              <label for="processingDateTime" class="form-label">Local date and time of processing:</label>
              <input
                type="datetime-local"
                class="form-control"
                id="processingDateTime"
                name="processingDateTime"
                value="${v.processingDateTime ? esc(v.processingDateTime) : ""}"
              />
            </div>

            <!-- Lab location -->
            <fieldset class="mb-4">
              <legend class="col-form-label pt-0">Select Laboratory location:</legend>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="labLocation"
                  id="labPrague"
                  value="Prague, CZ"
                  ${!v.labLocation || v.labLocation === "Prague, CZ" ? "checked" : ""}
                />
                <label class="form-check-label" for="labPrague">
                  Prague, CZ
                </label>
              </div>

              <!-- Add more locations if you want:
              <div class="form-check">
                <input class="form-check-input" type="radio" name="labLocation" id="labX" value="..." />
                <label class="form-check-label" for="labX">...</label>
              </div>
              -->
            </fieldset>

            <button type="submit" class="btn btn-primary px-4">Calculate</button>
          </form>
        </div>
      </div>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}