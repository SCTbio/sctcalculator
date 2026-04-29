export function documentationForm(opts?: {
    action?: string;
    error?: string;
}) {
    const action = opts?.action ?? "/documentation";

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Documentation</title>

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
      Documentation
    </h1>

    <!-- Horizontal links -->
    <ul class="nav justify-content-center gap-3">
      <li class="nav-item">
        <a class="nav-link" href="/">Summary</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Prediction</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/documentation">Documentation</a>
      </li>
    </ul>

  </div>
</div>

  <main class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-7 col-xl-6">
        <div class="py-5">
          <h2 class="text-center fw-semibold mb-4">Documentation</h2>

          ${
        opts?.error
            ? `<div class="alert alert-danger" role="alert">${opts.error}</div>`
            : ""
    }



<hr>

  <section id="ucel">
    <h2>1) Účel aplikace</h2>
    <p>
      Aplikace <span class="k">SCT Leukapheresis Calculator</span> slouží k výpočtu časového intervalu mezi
      <span class="k">odběrem (collection)</span> a <span class="k">zahájením zpracování / výroby (processing/production)</span>
      v cílové laboratoři. Výpočet zohledňuje zadané datum a čas a zvolenou lokaci laboratoře (časové pásmo).
    </p>
    <div class="note ok">
      <strong>Výsledek:</strong> Přehledná tabulka s místem odběru, časem odběru v čase laboratoře, časem startu produkce,
      přesnou dobou zpracování a zaokrouhlením v hodinách.
    </div>
  </section>

  <section id="navigace">
    <h2>2) Navigace aplikace</h2>
    <p class="muted">V horní liště aplikace jsou dostupné sekce:</p>
    <ul class="list">
      <li><span class="k">Summary</span> – hlavní stránka pro zadání vstupů a zobrazení výsledků.</li>
      <li><span class="k">Prediction</span> – predikční část (může obsahovat odhadové výpočty).</li>
      <li><span class="k">Documentation</span> – doplňková dokumentace aplikace.</li>
    </ul>
  </section>

  <section id="vstupy">
    <h2>3) Vstupní formulář – Processing summary calculation</h2>
    <p>
      V této části vyplníte údaje potřebné pro výpočet. Po vyplnění klikněte na tlačítko <span class="k">Calculate</span>.
    </p>

    <div class="grid">
      <div class="col-12">
     
          <h3>3.1 Collection Place <span class="pill">Text</span></h3>
          <p>
            Textové pole pro zadání <span class="k">místa odběru</span> (typicky město a stát).
          </p>
          <pre>Příklad: Lima, Peru</pre>
        </div>


      <div class="col-12">
  
          <h3>3.2 Local date and time of collection <span class="pill">Datum/čas</span></h3>
          <p>
            Datum a čas <span class="k">provedení odběru</span>. Zadává se jako lokální čas dle odběrového místa.
            Pole podporuje výběr přes kalendář/časovač.
          </p>
          <pre>Formát pole (UI): mm/dd/yyyy --:-- --</pre>
        </div>
  

          <div class="col-12">
          <h3>3.3 Local date and time of processing <span class="pill">Datum/čas</span></h3>
          <p>
            Datum a čas, kdy má <span class="k">začít zpracování</span> (processing/production).
            Zadává se jako lokální čas dle laboratoře.
          </p>
          <pre>Formát pole (UI): mm/dd/yyyy --:-- --</pre>
        </div>


        <div class="col-12">
          <h3>3.4 Select Laboratory location <span class="pill">Volba</span></h3>
          <p>
            Výběr cílové <span class="k">laboratoře</span>. Volba určuje především <span class="k">časové pásmo</span> a referenční lokaci pro výpočty.
          </p>
          <pre>Příklad volby: Prague, CZ</pre>
      
      </div>

      <div class="col-12">
        <div class="note">
          <strong>Spuštění výpočtu:</strong> Po vyplnění polí klikněte na tlačítko <span class="k">Calculate</span>.
        </div>
        <div class="note warn">
          <strong>Doporučení:</strong> Pokud zadáváte časy z různých zemí, dbejte na správné lokální časy (časové pásmo se projeví ve výsledku).
        </div>
      </div>
    </div>
  </section>

  <section id="vystup">
    <h2>4) Výstup – Processing summary</h2>
    <p>
      Po kliknutí na <span class="k">Calculate</span> se zobrazí tabulkový přehled rozdělený na dvě části:
      <span class="k">Collection point</span> a <span class="k">Laboratory</span>.
    </p>

    <div class="grid">
      <div class="col-12">
          <h3>4.1 Collection point</h3>
          <ul class="list">
            <li>
              <span class="k">Collection city</span> – město/místo odběru převzaté ze vstupu (např. <em>Lima, Peru</em>).
            </li>
            <li>
              <span class="k">Collection time and date</span> – datum a čas odběru zobrazený s časovým pásmem laboratoře
              (např. <code>1.4.2026 17:23:00 [Europe/Prague]</code>).
            </li>
          </ul>
        </div>


      <div class="col-12">
          <h3>4.2 Laboratory</h3>
          <ul class="list">
            <li><span class="k">Laboratory location</span> – vybraná cílová laboratoř (např. <em>Prague, Czechia</em>).</li>
            <li><span class="k">Collection time and date</span> – znovu uvedený čas odběru pro přehlednost.</li>
            <li><span class="k">Production started at</span> – datum a čas zahájení zpracování/produkce.</li>
            <li>
              <span class="k">Exact time needed for processing</span> – přesná doba mezi odběrem a startem produkce
              (např. <em>28 days 17 hours 0 minutes</em>).
            </li>
            <li>
              <span class="k">Rounded time needed for processing</span> – zaokrouhlená doba v hodinách
              (např. <em>689 hours</em>).
            </li>
          </ul>
        </div>
    

      <div class="col-12">
        <div class="note ok">
          <strong>Interpretace:</strong> „Exact time…“ je detailní rozdíl (dny/hodiny/minuty). „Rounded time…“ je praktická hodnota v hodinách pro plánování a reporting.
        </div>
      </div>
    </div>
  </section>

  <section id="recalculate">
    <h2>5) Recalculate</h2>
    <p>
      Tlačítko <span class="k">Recalculate</span> umožňuje provést nový výpočet – typicky po úpravě vstupních údajů.
      Po stisknutí se vrátíte k formuláři pro změny a opětovné spuštění výpočtu.
    </p>
  </section>

  <section id="tipy">
    <h2>6) Tipy a doporučení</h2>
    <ul class="list">
      <li>Zadávejte datum a čas konzistentně podle lokálního času místa (odběr vs. laboratoř).</li>
      <li>Pokud se výsledek zdá neočekávaný, ověřte zvolenou <span class="k">lokaci laboratoře</span> (časové pásmo).</li>
      <li>Pro sdílení výsledků je vhodné použít tisk do PDF (tlačítko nahoře nebo funkce prohlížeče).</li>
    </ul>
  <img src="https://files.sotio.eu/sotcalc/summary_calc.png" alt="" srcset="">
  </section>

</hr>




  <section id="ucel">
    <h2>1) Účel</h2>
    <p>
      Stránka <span class="k">Processing summary</span> slouží k výpočtu časového intervalu mezi
      <span class="k">odběrem (collection)</span> a <span class="k">zahájením zpracování/produkce (processing/production)</span>
      v cílové laboratoři. Vypočtený interval je zobrazen jako:
    </p>
    <ul>
      <li><span class="k">přesný čas</span> (dny/hodiny/minuty)</li>
      <li><span class="k">zaokrouhlený čas</span> (v hodinách)</li>
    </ul>
    <div class="note ok">
      <strong>Hlavní výstup:</strong> přehled <span class="k">Processing summary</span> rozdělený na část
      <span class="k">Collection point</span> a <span class="k">Laboratory</span>.
    </div>
  </section>

  <section id="vstupy">
    <h2>2) Vstupy – Processing summary calculation</h2>
    <p>
      Vstupní formulář obsahuje čtyři části: místo odběru, datum/čas odběru, datum/čas zpracování a volbu laboratoře.
      Po vyplnění se výpočet spouští tlačítkem <span class="k">Calculate</span>.
    </p>

    <div class="grid">

     <div class="col-12">
          <h3>2.1 Collection Place <span class="pill">text</span></h3>
          <p>
            Pole pro zadání <span class="k">místa odběru</span> (typicky město, případně region a země).
          </p>
          <div class="note">
            <strong>Viditelné na vstupu:</strong> „Sidney“ (pravděpodobně Sydney).
          </div>
        </div>

     <div class="col-12">
          <h3>2.2 Local date and time of collection <span class="pill">datum/čas</span></h3>
          <p>
            Lokální datum a čas <span class="k">odběru</span>. Ve formuláři je uveden i text „Format: 2026-04-20 10:51:15“
            jako příklad očekávaného formátu. V poli je vidět americké zobrazení data:
          </p>
          <pre>04/01/2026 10:33 AM</pre>
          <div class="note warn">
            <strong>Poznámka:</strong> Zobrazení může být v UI jako mm/dd/yyyy a AM/PM – dbejte na správné zadání.
          </div>
        </div>

     <div class="col-12">
          <h3>2.3 Local date and time of processing <span class="pill">datum/čas</span></h3>
          <p>
            Lokální datum a čas, kdy má být <span class="k">zahájeno zpracování</span> v laboratoři.
            Ve vstupu je vidět hodnota:
          </p>
          <pre>04/14/2026 10:33 AM</pre>
        </div>

     <div class="col-12">
          <h3>2.4 Select Laboratory location <span class="pill">výběr</span></h3>
          <p>
            Volba cílové <span class="k">laboratoře</span>. Zvolená laboratoř určuje časové pásmo, ve kterém se zobrazí výstup.
          </p>
          <div class="note">
            <strong>Viditelné na vstupu:</strong> vybráno „Prague, CZ“.
          </div>
        </div>

     <div class="col-12">
          <h3>2.5 Calculate <span class="pill">akce</span></h3>
          <p>
            Tlačítko <span class="k">Calculate</span> provede výpočet a zobrazí stránku <span class="k">Processing summary</span>.
          </p>
        </div>


    </div>
  </section>

  <section id="vystup">
    <h2>3) Výstup – Processing summary</h2>
    <p>
      Výstup je tabulkový přehled rozdělený do dvou bloků: <span class="k">Collection point</span> a <span class="k">Laboratory</span>.
      Každý blok obsahuje klíčové informace pro audit a plánování.
    </p>

    <div class="grid">
     <div class="col-12">
          <h3>3.1 Collection point</h3>
          <p class="muted">Položky v části Collection point:</p>
          <table class="table" aria-label="Collection point">
            <tr>
              <th>Collection city</th>
              <td>Místo/město odběru (převzaté ze vstupu).</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
              <td>
                Datum a čas odběru zobrazený v časovém pásmu laboratoře (včetně označení např. <code>[Europe/Prague]</code>).
              </td>
            </tr>
          </table>
        </div>

     <div class="col-12">
          <h3>3.2 Laboratory</h3>
          <p class="muted">Položky v části Laboratory:</p>
          <table class="table" aria-label="Laboratory">
            <tr>
              <th>Laboratory location</th>
              <td>Zvolená cílová laboratoř (lokalita).</td>
            </tr>
            <tr>
              <th>Collection time and date</th>
              <td>Čas odběru zobrazený v čase laboratoře (pro přehlednost).</td>
            </tr>
            <tr>
              <th>Production started at</th>
              <td>Datum a čas zahájení zpracování/produkce v časovém pásmu laboratoře.</td>
            </tr>
            <tr>
              <th>Exact time needed for processing</th>
              <td>Přesný časový rozdíl mezi odběrem a startem produkce (dny/hodiny/minuty).</td>
            </tr>
            <tr>
              <th>Rounded time needed for processing</th>
              <td>Zaokrouhlený časový rozdíl vyjádřený v hodinách.</td>
            </tr>
          </table>
        </div>
  

      <div class="col-12">
        <div class="note ok">
          <strong>Interpretace výpočtu:</strong>
          „Exact time needed for processing“ slouží jako detailní hodnota pro dohledatelnost,
          „Rounded time needed for processing“ je praktická hodnota pro plánování a reporting.
        </div>
      </div>

      <div class="col-12">

          <h3>3.3 Recalculate <span class="pill">akce</span></h3>
          <p>
            Tlačítko <span class="k">Recalculate</span> vrací uživatele na vstupní formulář pro úpravu hodnot a opětovné spuštění výpočtu.
          </p>
        </div>
      </div>

  </section>

  <section id="priklad">
    <h2>4) Příklad (podle zaslaného výstupu)</h2>
    <p class="muted">
      Níže je přepsaný příklad hodnot z výstupního přehledu pro demonstraci.
    </p>

    <div class="grid">
      <div class="col-12">
      
          <h3>Collection point – ukázka</h3>
          <pre>Collection city: Sydney NSW, Australia
Collection time and date: 1.4.2026 01:33:00 [Europe/Prague]</pre>
        </div>
   

          <div class="col-12">
          <h3>Laboratory – ukázka</h3>
          <pre>Laboratory location: Prague, Czechia
Collection time and date: 1.4.2026 01:33:00 [Europe/Prague]
Production started at: 14.4.2026 10:33:00 [Europe/Prague]
Exact time needed for processing: 13 days 9 hours 0 minutes
Rounded time needed for processing: 321 hours</pre>

      </div>
    </div>

    <div class="note warn">
      <strong>Upozornění:</strong> Vstupní pole mohou zobrazovat datum v americkém formátu (mm/dd/yyyy) a AM/PM,
      zatímco výstup může být ve formátu dd.m.yyyy a s uvedením časového pásma. To je očekávané chování UI.
    </div>
  </section>

  <section id="poznamky">
    <h2>5) Poznámky a doporučení</h2>
    <ul>
      <li>Ověřte, že zadáváte správné lokální časy (odběr vs. laboratoř) – časové pásmo ovlivňuje výsledek.</li>
      <li>Pokud výpočet nedává smysl, zkontrolujte datum/čas (AM/PM) a zvolenou lokaci laboratoře.</li>
      <li>Pro sdílení dokumentace nebo výsledků použijte tisk do PDF (funkce prohlížeče).</li>
    </ul>


<img src="https://files.sotio.eu/sotcalc/prediction_calc.png" alt="" srcset="">
  </section>

</main>






        </div>
      </div>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}