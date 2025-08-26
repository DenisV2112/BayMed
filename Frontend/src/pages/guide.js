export default function Guide() {
  const html = `
    <div class="px-6 pb-4 flex flex-col gap-6 bg-gray-100 min-h-screen rounded-2xl">
        <!-- Title -->
        <h1 id="top_title" class="text-4xl lg:text-6xl font-bold mb-2 lg:mb-0 text-center">Guide</h1>
        <div class="rounded-xl bg-white h-full w-full ">
            <!-- Top Image -->
            <div class="w-full rounded-xl overflow-hidden">
                <img src="./Frontend/src/assets/img/icons/top_image.webp" class="w-full h-40 object-cover mb-4" />
            </div>

            <!-- Category   -->
            <section>

                <div class="flex justify-between mb-4">
                    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Category</h2>
                    <!-- Search bar -->
                    <input id="guide_search" type="text" placeholder="Search"
                        class="w-40 px-4 py-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-80 " />
                </div>
                <div class="border-b border-gray-400 mb-6 mx-3"></div>

                <!-- Card of category -->
                <div id="guide_content" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 overflow-auto h-[58vh]">

                    
                </div>
            </section>
        </div>
    </div>

  `;
  
  return html
}

  export function initGuidePage() {
  const contentContainer = document.getElementById("guide_content");
  const modal = document.getElementById("guideModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");
  const titleTop = document.getElementById("top_title");
  const searchInput = document.getElementById("guide_search");

  if (!contentContainer) {
    console.error("No se encontró el elemento #guide_content");
    return;
  }

  let allGuides = [];

  fetch('./Data/data.json')
    .then(response => response.json())
    .then(data => {
      allGuides = data.guides;
      renderCards(allGuides);
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
    });

  function renderCards(guides) {
    contentContainer.innerHTML = ""; // Limpiar contenido previo
    guides.forEach(guide => {
      const card = document.createElement("div");
      card.className = "bg-sky-400 rounded-xl p-4 flex flex-col items-center text-white font-bold text-center hover:shadow-lg cursor-pointer";
      card.innerHTML = `
        <img src="${guide.image}" alt="${guide.title}" class="h-50 mb-2 md:h-60 " />
        ${guide.title}
      `;
      card.addEventListener("click", () => {
        titleTop.textContent = `GUIDE/${guide.title}`;
        modalTitle.textContent = guide.title;
        modalContent.textContent = guide.content;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });

      contentContainer.appendChild(card);
    });
  }

  // 🔍 Evento para búsqueda dinámica
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredGuides = allGuides.filter(guide =>
      guide.title.toLowerCase().includes(query)
    );
    renderCards(filteredGuides);
  });

  // Cerrar modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    titleTop.textContent = "GUIDE";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      titleTop.textContent = "GUIDE";
    }
  });
}


