// splash.js o al inicio de tu router.js

function showSplash() {
  const splash = document.createElement("div");
  splash.id = "splash";
  splash.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-red-700 transition-opacity duration-500";

  splash.innerHTML = `
    <div class="text-center text-white">
      <img src="./Frontend/src/assets/img/logo/baymed_logo.png" 
           alt="BAYMED" 
           class="w-72 mx-auto animate-pulse-heart"/>
      <h1 class="text-5xl font-bold mt-4">BAY<span class="underline">MED</span></h1>
      <div class="loading"> 
  <svg width="16px" height="12px">
    <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
    <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
  </svg>
</div>
      <p class="mt-2 text-lg">Cargando...</p>
    </div>
  `;

  document.body.appendChild(splash);

  // Quitar splash después de 5 segundos
  /*setTimeout(() => {
    splash.classList.add("opacity-0"); // animación de fade-out
    setTimeout(() => splash.remove(), 500); // remover después de desvanecer
  }, 5000);*/
}

// Lanzar splash en cada carga de la app
document.addEventListener("DOMContentLoaded", showSplash);
