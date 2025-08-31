export default function Guide() {
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
    <div class="px-6 pb-4 flex flex-col gap-6 bg-gray-100 min-h-screen rounded-2xl">
        <!-- Title -->
        
        <div class="rounded-xl bg-white h-full w-full ">
            <!-- Top Image -->
            <div class="w-full rounded-xl overflow-hidden">
                <img src="/src/assets/img/icons/top_image.webp" class="w-full h-40 object-cover mb-4" />
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
                <div id="guide_content" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 overflow-auto h-[50vh]">
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
  const modalDescription = document.getElementById("modalDescription");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");
  const titleTop = document.getElementById("top_title");
  const searchInput = document.getElementById("guide_search");

  if (!contentContainer) {
    console.error("No se encontró el elemento #guide_content");
    return;
  }

  let allGuides = [];

  fetch('https://baymed-llct.onrender.com/api/guides')
    .then(response => response.json())
    .then(data => {
      allGuides = data.guides;
      renderCards(allGuides);
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
    });

  function renderCards(guides) {
    contentContainer.innerHTML = ""; 
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
        modalDescription.textContent = guide.description;
        modalContent.innerHTML = `
          <iframe src="${guide.url_pdf}" class="w-full h-full" frameborder="0"></iframe>`;
        modal.classList.remove("hidden");
        modal.classList.add("flex");  
      });

      contentContainer.appendChild(card);
    });
  }

  // 🔍 Búsqueda dinámica
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredGuides = allGuides.filter(guide =>
      guide.title.toLowerCase().includes(query)
    );
    renderCards(filteredGuides);
  });

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
export const title = "GUIDES";