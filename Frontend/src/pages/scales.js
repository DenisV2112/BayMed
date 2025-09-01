
export default function Scales() {
  const html = `
       <header class="flex flex-row justify-between items-center mb-4">
      <img class="max-w-[40px] lg:max-w-[60px]" src="./src/assets/img/logo/baymed_logo.png" alt="Logo" />
      <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
        <div class="relative inline-block">
  <!-- Icono de traducción -->
  <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" class="iconLanguage_tqOs"><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path><path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></svg>
  </div>

  <select class="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-8 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option value="en">English</option>
    <option value="es">Español</option>
  </select>

  <!-- Flecha personalizada -->
  <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12vh)]">
      <aside id="scales-list" class="lg:col-span-1 bg-white p-6 rounded-2xl shadow overflow-y-auto">
        <input 
          id="search-scale" 
          type="text" 
          placeholder="Buscar escala..." 
          class="w-full mb-4 p-2 border rounded focus:ring focus:ring-blue-300"
        />
        <div id="scales-buttons" class="grid grid-cols-2 gap-4"></div>
      </aside>

      <div id="scale-content" class="col-span-2 bg-white p-6 rounded-2xl shadow overflow-y-auto mr-[5vw]">
        <h2 class="text-2xl font-bold">Selecciona una escala</h2>
        <p>El contenido aparecerá aquí.</p>
      </div>
    </div>
  `;

  requestAnimationFrame(loadScales);
  return html;
}

// Cargar todas las escalas desde el backend
function loadScales() {
  const listContainer = document.getElementById("scales-buttons");
  const content = document.getElementById("scale-content");
  const searchInput = document.getElementById("search-scale");

  let allScales = [];

  fetch("https://baymed-llct.onrender.com/api/scales")
    .then(res => res.json())
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar las escalas");
      allScales = response.data; // ✅ ahora sí es un array
      renderButtons(allScales, listContainer, content);

      // Filtro dinámico
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allScales.filter(scale =>
          scale.name.toLowerCase().includes(term)
        );
        renderButtons(filtered, listContainer, content);
      });
    })
    .catch(err => console.error("Error cargando escalas:", err));
}

// Renderizar botones laterales
function renderButtons(scales, listContainer, content) {
  listContainer.innerHTML = "";

  if (!Array.isArray(scales) || scales.length === 0) {
    listContainer.innerHTML = `<p class="text-gray-500 text-sm">No se encontraron escalas</p>`;
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
        .catch(err => console.error("Error cargando escala:", err));
    });

    listContainer.appendChild(btn);
  });
}

// Renderizar la escala seleccionada
function renderScale(scaleKey, scaleDef, content) {
  content.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${scaleDef.name}</h2>
    <p class="mb-4 text-gray-600">${scaleDef.description || ""}</p>

    <div class="overflow-x-auto">
      <table class="w-full table-fixed border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th class="text-left w-2/3 px-4">Input</th>
            <th class="text-right w-1/3 px-4">Valor</th>
          </tr>
        </thead>
        <tbody id="scale-form"></tbody>
      </table>
    </div>

    <div class="flex justify-center mt-4">
      <button id="calcBtn" class="px-5 py-2 bg-red-600 text-white rounded-full shadow">CALCULAR</button>
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
      input.type = "number"; // numérico por defecto
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
          `Resultado: ${result.data.score} (${result.data.interpretation})`;
      })
      .catch(err => {
        document.getElementById("calcResult").textContent =
          "Error: " + err.message;
      });
  });
}

export const title = "SCALES";