export default function Scales() {
  const html = `
       <header class="flex flex-row justify-between items-center mb-4">
      <img class="max-w-[40px] lg:max-w-[60px]" src="./src/assets/img/logo/baymed_logo.png" alt="Logo" />
      <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
        <div ></div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12vh)]">
      <aside id="scales-list" class="lg:col-span-1 bg-white p-6 rounded-2xl shadow overflow-y-auto">
        <input 
          id="search-scale" 
          type="text" 
          placeholder="Search scale..." 
          class="w-full mb-4 p-2 border rounded focus:ring focus:ring-blue-300"
        />
        <div id="scales-buttons" class="grid grid-cols-2 gap-4"></div>
      </aside>

      <div id="scale-content" class="col-span-2 bg-white p-6 rounded-2xl shadow overflow-y-auto mr-[5vw]">
        <h2 class="text-2xl font-bold">Select a scale</h2>
        <p>The content will appear here.</p>
      </div>
    </div>
  `;

  requestAnimationFrame(loadScales);
  return html;
}

// Load all scales from backend
function loadScales() {
  const listContainer = document.getElementById("scales-buttons");
  const content = document.getElementById("scale-content");
  const searchInput = document.getElementById("search-scale");

  let allScales = [];

  fetch("https://baymed-llct.onrender.com/api/scales")
    .then(res => res.json())
    .then(response => {
      if (!response.ok) throw new Error("Error loading scales");
      allScales = response.data; // ✅ now it's an array
      renderButtons(allScales, listContainer, content);

      // Dynamic filter
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allScales.filter(scale =>
          scale.name.toLowerCase().includes(term)
        );
        renderButtons(filtered, listContainer, content);
      });
    })
    .catch(err => console.error("Error loading scales:", err));
}

// Render sidebar buttons
function renderButtons(scales, listContainer, content) {
  listContainer.innerHTML = "";

  if (!Array.isArray(scales) || scales.length === 0) {
    listContainer.innerHTML = `<p class="text-gray-500 text-sm">No scales found</p>`;
    return;
  }

  scales.forEach(scale => {
    const btn = document.createElement("button");
    btn.textContent = scale.name;
    btn.className = "px-6 bg-gray-100 rounded-3xl font-bold text-gray-600 tracking-wid h-[10vh]";
    btn.dataset.scaleKey = scale.key;

    btn.addEventListener("click", () => {
      fetch(`https://baymed-llct.onrender.com/api/scales/${scale.key}`)
        .then(res => res.json())
        .then(json => {
          if (!json.ok) throw new Error(json.error);
          renderScale(scale.key, json.data, content);
        })
        .catch(err => console.error("Error loading scale:", err));
    });

    listContainer.appendChild(btn);
  });
}

// Render the selected scale
function renderScale(scaleKey, scaleDef, content) {
  content.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${scaleDef.name}</h2>
    <p class="mb-4 text-gray-600">${scaleDef.description || ""}</p>

    <div class="overflow-x-auto">
      <table class="w-full table-fixed border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th class="text-left w-2/3 px-4">Input</th>
            <th class="text-right w-1/3 px-4">Value</th>
          </tr>
        </thead>
        <tbody id="scale-form"></tbody>
      </table>
    </div>

    <div class="flex justify-center mt-4">
      <button id="calcBtn" class="px-5 py-2 bg-red-600 text-white rounded-full shadow">CALCULATE</button>
    </div>

    <div id="calcResult" class="mt-6 text-lg font-semibold text-center text-blue-700"></div>
  `;

  const form = document.getElementById("scale-form");

  scaleDef.fields.forEach(field => {
    const row = document.createElement("tr");

    const tdLabel = document.createElement("td");
    tdLabel.className = "px-4 py-3 bg-gray-100 rounded-l-lg font-semibold";
    tdLabel.textContent = field.label;

    const tdInput = document.createElement("td");
    tdInput.className = "px-4 py-3 bg-gray-100 rounded-r-lg text-right";

    let input;
    if (field.type === "categorical" && field.options) {
      input = document.createElement("select");
      input.className = "p-1 border rounded";
      field.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.id || opt;
        option.textContent = opt.label || opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = "number"; // numeric by default
      input.className = "p-1 border rounded w-24 text-center";
    }

    input.name = field.id || field.name;
    tdInput.appendChild(input);

    row.appendChild(tdLabel);
    row.appendChild(tdInput);
    form.appendChild(row);
  });

  document.getElementById("calcBtn").addEventListener("click", () => {
    const inputs = {};
    form.querySelectorAll("input, select").forEach(el => {
      if (el.type === "checkbox") {
        inputs[el.name] = el.checked;
      } else if (el.type === "number" || el.type === "range") {
        inputs[el.name] = parseFloat(el.value);
      } else {
        inputs[el.name] = el.value;
      }
    });

    fetch(`https://baymed-llct.onrender.com/api/scales/${scaleKey}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then(res => res.json())
      .then(result => {
        if (!result.ok) throw new Error(result.error);
        document.getElementById("calcResult").textContent =
          `Result: ${result.data.score} (${result.data.interpretation})`;
      })
      .catch(err => {
        document.getElementById("calcResult").textContent =
          "Error: " + err.message;
      });
  });
}

export const title = "SCALES";
