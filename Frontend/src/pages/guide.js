export default function Guide() {
  const html = `
         <header class="flex flex-row justify-between items-center mb-4">
      <img class="max-w-[40px] lg:max-w-[60px]" src="./src/assets/img/logo/baymed_logo.png" alt="Logo" />
      <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
        <div >
</div>
    </header>
    <div class="px-6 pb-4 flex flex-col gap-6 bg-gray-100 min-h-screen rounded-2xl">
        <!-- Title -->
        
        <div class="rounded-xl bg-white h-[60vh] w-full ">
            <!-- Top Image -->
            <div class="w-full rounded-xl overflow-hidden">
                <img src="/src/assets/img/icons/bg_guide_img.png" class="w-full h-40 object-cover mb-4" />
            </div>

            <!-- Category   -->
            <section>
        
                <div class="border-b border-gray-400 mb-6 mx-3"></div>

                <!-- Card of category -->
                <div id="guide_content" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 overflow-auto h-[60vh]">
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
  const titleTop = document.getElementById("page-title");
  const searchInput = document.getElementById("guide_search");

  if (!contentContainer) {
    console.error("No se encontró el elemento #guide_content");
    return;
  }

  let allGuides = [];

  fetch('https://baymed-llct.onrender.com/api/guides')
.then(res => res.json())
  .then(json => {
    const guides = json.data;
    renderCards(guides);
  })
  .catch(err => console.error("Error al cargar el JSON:", err));

function renderCards(guides) {
  if (!Array.isArray(guides)) {
    console.error("Se esperaba un array, pero llegó:", guides);
    return;
  }

  contentContainer.innerHTML = ""; 
  guides.forEach(guide => {
    const card = document.createElement("div");
    card.className = "bg-sky-400 rounded-xl p-4 flex flex-col items-center text-white font-bold text-center hover:shadow-lg cursor-pointer";
    card.innerHTML = `
      <img src="${guide.image}" alt="${guide.area}" class="h-50 mb-2 md:h-60 " />
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


  /*//  Búsqueda dinámica
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredGuides = allGuides.filter(guide =>
      guide.title.toLowerCase().includes(query)
    );
    renderCards(filteredGuides);
  });*/

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