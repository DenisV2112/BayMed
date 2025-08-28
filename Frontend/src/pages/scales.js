export default function Scales() {
  const html = `
    <header class="flex flex-col lg:flex-row justify-between items-center mb-4">
<<<<<<< HEAD
  <div></div>
  <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
  <div class="w-10 text-right">Sol</div>
</header>

<!-- Grid ocupa toda la pantalla menos el header -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12vh)]">
  <!-- Botones -->
  <aside id="scales-list" class="lg:col-span-1 bg-white p-6 rounded-2xl shadow overflow-y-auto ">
    <!-- Buscador -->
    <input 
      id="search-scale" 
      type="text" 
      placeholder="Buscar escala..." 
      class="w-full mb-4 p-2 border rounded focus:ring focus:ring-blue-300"
    />
    <div id="scales-buttons"></div>
  </aside>

  <!-- Contenedor dinámico -->
  <div id="scale-content" class="col-span-2 bg-white p-6 rounded-2xl shadow overflow-y-auto mr-[5vw]">
    <h2 class="text-2xl font-bold">Selecciona una escala</h2>
    <p>El contenido aparecerá aquí.</p>
  </div>
</div>

  `;

  // Espera a que el DOM se pinte
  requestAnimationFrame(loadScales);

  return html;
}


// Función para cargar escalas dinámicamente
=======
      <div></div>
      <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
      <div class="w-10 text-right">Sol</div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-12vh)]">
      <aside id="scales-list" class="lg:col-span-1 bg-white p-6 rounded-2xl shadow overflow-y-auto">
        <input 
          id="search-scale" 
          type="text" 
          placeholder="Buscar escala..." 
          class="w-full mb-4 p-2 border rounded focus:ring focus:ring-blue-300"
        />
        <div id="scales-buttons"></div>
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
>>>>>>> feature/backend_integration
function loadScales() {
  const listContainer = document.getElementById("scales-buttons");
  const content = document.getElementById("scale-content");
  const searchInput = document.getElementById("search-scale");

  let allScales = [];

<<<<<<< HEAD
  fetch("Data/data.json")
    .then(res => res.json())
    .then(data => {
      allScales = data.scales;

=======
  fetch("http://localhost:3000/api/scales")
    .then(res => res.json())
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar las escalas");
      allScales = response.data; // ✅ ahora sí es un array
>>>>>>> feature/backend_integration
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

<<<<<<< HEAD

// Renderizar botones en lista lateral
function renderButtons(scales, listContainer, content) {
  listContainer.innerHTML = ""; // limpiar antes de pintar
=======
// Renderizar botones laterales
function renderButtons(scales, listContainer, content) {
  listContainer.innerHTML = "";

  if (!Array.isArray(scales) || scales.length === 0) {
    listContainer.innerHTML = `<p class="text-gray-500 text-sm">No se encontraron escalas</p>`;
    return;
  }
>>>>>>> feature/backend_integration

  scales.forEach(scale => {
    const btn = document.createElement("button");
    btn.textContent = scale.name;
<<<<<<< HEAD
    btn.className =
      "block w-full p-3 bg-gray-200 mb-2 rounded hover:bg-gray-300";
    btn.dataset.scaleId = scale.id;

    btn.addEventListener("click", () => renderScale(scale, content));

    listContainer.appendChild(btn);
  });

  if (scales.length === 0) {
    listContainer.innerHTML = `<p class="text-gray-500 text-sm">No se encontraron escalas</p>`;
  }
}


// Renderizar escala seleccionada
function renderScale(scale, content) {
  content.innerHTML = `
  <h2 class="text-2xl font-bold mb-4">${scale.title}</h2>

  <div class="overflow-x-auto">
    <table class="w-full table-fixed border-separate border-spacing-y-2">
      <thead>
        <tr>
          <th class="text-left w-2/3 px-4">Input</th>
          <th class="text-right w-1/3 px-4">Status</th>
        </tr>
      </thead>
      <tbody id="scale-form"></tbody>
    </table>
  </div>

  <div class="flex justify-center mt-4">
    <button id="calcBtn" class="px-5 py-2 bg-red-600 text-white rounded-full shadow">
      CALCULAR
    </button>
  </div>
`;

  const form = document.getElementById("scale-form");
  scale.fields.forEach(field => {
    const row = document.createElement("tr");

    // Columna 1: Label (izquierda)
=======
    btn.className = "block w-full p-3 bg-gray-200 mb-2 rounded hover:bg-gray-300";
    btn.dataset.scaleKey = scale.key;

    btn.addEventListener("click", () => {
      fetch(`http://localhost:3000/api/scales/${scale.key}`)
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

>>>>>>> feature/backend_integration
    const tdLabel = document.createElement("td");
    tdLabel.className = "px-4 py-3 bg-gray-100 rounded-l-lg font-semibold";
    tdLabel.textContent = field.label;

<<<<<<< HEAD
    // Columna 2: Input (derecha)
=======
>>>>>>> feature/backend_integration
    const tdInput = document.createElement("td");
    tdInput.className = "px-4 py-3 bg-gray-100 rounded-r-lg text-right";

    let input;
<<<<<<< HEAD
    if (field.type === "range") {
      input = document.createElement("input");
      input.type = "range";
      input.min = field.min;
      input.max = field.max;
      input.className = "w-32 md:w-40 lg:w-48 accent-red-500";
    } else if (field.type === "checkbox") {
      input = document.createElement("input");
      input.type = "checkbox";
      input.className = "w-5 h-5";
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
      input.className = "p-1 border rounded w-24 text-center";
    }

=======
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
>>>>>>> feature/backend_integration
    tdInput.appendChild(input);

    row.appendChild(tdLabel);
    row.appendChild(tdInput);
    form.appendChild(row);
  });
<<<<<<< HEAD
}

export const title = "SCALES";
=======

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

    fetch(`http://localhost:3000/api/scales/${scaleKey}/calculate`, {
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
>>>>>>> feature/backend_integration
