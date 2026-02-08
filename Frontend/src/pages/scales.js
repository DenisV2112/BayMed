export default function Scales() {
  const html = `
    <header class="flex flex-col lg:flex-row justify-between items-center mb-4">
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
function loadScales() {
  const listContainer = document.getElementById("scales-buttons");
  const content = document.getElementById("scale-content");
  const searchInput = document.getElementById("search-scale");

  let allScales = [];

  fetch("Data/data.json")
    .then(res => res.json())
    .then(data => {
      allScales = data.scales;

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


// Renderizar botones en lista lateral
function renderButtons(scales, listContainer, content) {
  listContainer.innerHTML = ""; // limpiar antes de pintar

  scales.forEach(scale => {
    const btn = document.createElement("button");
    btn.textContent = scale.name;
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
    const tdLabel = document.createElement("td");
    tdLabel.className = "px-4 py-3 bg-gray-100 rounded-l-lg font-semibold";
    tdLabel.textContent = field.label;

    // Columna 2: Input (derecha)
    const tdInput = document.createElement("td");
    tdInput.className = "px-4 py-3 bg-gray-100 rounded-r-lg text-right";

    let input;
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

    tdInput.appendChild(input);

    row.appendChild(tdLabel);
    row.appendChild(tdInput);
    form.appendChild(row);
  });
}

export const title = "SCALES";
