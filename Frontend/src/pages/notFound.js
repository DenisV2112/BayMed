let asideBackup = ""; // variable global para guardar el contenido original

export default function NotFound() {
  const aside = document.querySelector("aside");
  if (aside) {
    // guardar el contenido actual solo si aún no se ha guardado
    if (!asideBackup) asideBackup = aside.innerHTML;

    // reemplazar contenido del aside
    aside.innerHTML = `
      <div class="bg-gray-900 h-full text-white flex flex-col ">
        <button 
          id="back-home" 
          class="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-left"
        >
          ⬅ Back to Home
        </button>
      </div>
    `;

    // evento del botón para restaurar
    const btn = aside.querySelector("#back-home");
    if (btn) {
      btn.addEventListener("click", () => {
        // restaurar aside al contenido previo
        aside.innerHTML = asideBackup;

        // redirigir al home
        window.location.hash = "#/";
      });
    }
  }

  return `
    <div class="min-h-screen flex flex-col bg-gray-950 text-white">
      <header class="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div></div>
        <h1 id="page-title" class="text-4xl lg:text-6xl font-bold mb-4 lg:mb-0">BAYMED</h1>
        <div class="w-10 text-right">Sol</div>
      </header>

      <!-- Grid ocupa toda la pantalla menos el header -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div class="col-span-3 flex justify-center items-center">
          <p class="text-3xl font-bold">404 | Página no encontrada</p>
        </div>
      </div>
    </div>
  `;
}

export const title = "Error";

