export default function Home() {
  return `
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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mr-0 lg:mr-[4vw]">
      
      <!-- Heart -->
      <div class="bg-white p-6 rounded-2xl shadow flex justify-center items-center">
        <div class="relative w-48 h-48 sm:w-64 sm:h-64">
          <div class="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-50"></div>
          <img alt="Anatomical heart illustration" class="w-full h-full object-contain animate-pulse-heart" src="/src/assets/img/icons/heart.png"/>
        </div>
      </div>

      <!-- Scales -->
      <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
        <h2 class="font-semibold text-2xl mb-4">Your last scales</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-start bg-red-50 p-6 rounded-2xl h-32">
            <div class="bg-red-100 p-3 rounded-lg mr-4 flex items-center justify-center">
              <span class="material-symbols-outlined text-red-500 text-3xl">bloodtype</span>
            </div>
            <div>
              <p class="text-base text-gray-500">Blood Scale</p>
              <p class="font-bold text-2xl">100/70</p>
              <p class="text-sm text-gray-400">100% precise</p>
            </div>
          </div>
          <div class="flex items-start bg-green-50 p-6 rounded-2xl h-32">
            <div class="bg-green-100 p-3 rounded-lg mr-4 flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500 text-3xl">glucose</span>
            </div>
            <div>
              <p class="text-base text-gray-500">Glucose Level</p>
              <p class="font-bold text-2xl">78-92</p>
              <p class="text-sm text-gray-400">On higher than last week</p>
            </div>
          </div>
          <div class="flex items-start bg-purple-50 p-6 rounded-2xl h-32">
            <div class="bg-purple-100 p-3 rounded-lg mr-4 flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-500 text-3xl">monitor_heart</span>
            </div>
            <div>
              <p class="text-base text-gray-500">Heart Scale</p>
              <p class="font-bold text-2xl">78 bmp</p>
              <p class="text-sm text-gray-400">2% faster than last week</p>
            </div>
          </div>
          <div class="flex items-start bg-pink-50 p-6 rounded-2xl h-32">
            <div class="bg-pink-100 p-3 rounded-lg mr-4 flex items-center justify-center">
              <span class="material-symbols-outlined text-pink-500 text-3xl">science</span>
            </div>
            <div>
              <p class="text-base text-gray-500">Blood Calculator</p>
              <p class="font-bold text-2xl">9,500/ml</p>
              <p class="text-sm text-gray-400">Calculate ml and make diagnosis</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Heart Rate -->
      <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 class="font-semibold text-2xl">Heart Rate</h2>
            <p class="text-lg sm:text-2xl text-gray-500">17-23 January 2021</p>
          </div>
          <div class="text-red-500 font-semibold text-xl sm:text-2xl">75 bmp <span class="text-gray-400 font-normal">Baymed</span></div>
        </div>
        <div class="h-48 sm:h-64">
          <svg xmlns="http://www.w3.org/2000/svg" id="svg5" version="1.1" viewBox="0 0 502.98 108.61">
  
  <path   pathLength="1" id="line" d="M5.32 78.13c.96-.01 5-8.5 5.54-8.54.58-.05 6.1 8.51 7.1 8.51 3.66 0 9.29.06 10.71.05 2.53-.01 4.82-72.88 4.82-72.88l4.76 97.28 3.97-24.45 20.45-.22C64 77.86 77.1 63.66 78.36 63.8c1.31.15 6.68 14.08 7.94 14.07 2.3-.03 33.32.04 35.76.02.96 0 5-8.5 5.53-8.53.59-.05 6.1 8.51 7.1 8.5 3.66 0 9.3.07 10.72.06 2.53-.02 4.81-72.89 4.81-72.89l4.77 97.28 3.97-24.44s83.34-3.33 74.69 7.67c-8.65 11-45.3-42.94-31.65-53.58 25.6-19.96 49.96 36.94 40.26 36.5-12.2-.53 1.8-62.32 23.41-51.7 32.24 15.86-17.56 84.92-26.4 81.77-5.73-2.05-.68-21.68 31.4-26.58 26.65-6.42 29.5 2.35 52.62 7.11 2.53-.02 4.82-72.89 4.82-72.89l4.76 97.28 3.97-24.44 20.45-.22c1.31-.02 14.41-14.22 15.68-14.07 1.32.15 6.7 14.08 7.95 14.07 2.29-.03 33.32.04 35.76.02.95 0 5-8.5 5.53-8.54.58-.04 6.1 8.52 7.1 8.52 3.66 0 9.3.06 10.72.05 2.53-.02 4.81-72.89 4.81-72.89l4.77 97.28 3.97-24.44 20.45-.23c1.31-.01 14.4-14.22 15.68-14.07 1.32.16 6.69 14.09 7.94 14.07" />
</svg>
<!-- partial -->
  
        </div>
      </div>

      <!-- Documents -->
      <div class="lg:col-span-1 bg-white p-6 rounded-2xl shadow">
  <div class="flex justify-between items-center mb-6">
    <h2 class="font-semibold text-2xl">Documents</h2>
    <a class="text-lg text-blue-600 hover:underline" href="#/guide">View all</a>
  </div>

  <!-- Responsive grid -->
  <div class="  gap-4 flex flex-col">
    <!-- Documento 1 -->
    <div class="flex items-center bg-red-50 p-4 rounded-xl">
      <div class="bg-red-100 p-3 rounded-lg mr-4 flex items-center justify-center">
        <span class="material-symbols-outlined text-red-500 text-3xl">description</span>
      </div>
      <div class="flex-grow">
        <p class="font-medium text-base">Blood Status Report.pdf</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>

    <!-- Documento 2 -->
    <div class="flex items-center bg-blue-50 p-4 rounded-xl">
      <div class="bg-blue-100 p-3 rounded-lg mr-4 flex items-center justify-center">
        <span class="material-symbols-outlined text-blue-500 text-3xl">description</span>
      </div>
      <div class="flex-grow">
        <p class="font-medium text-base">Heart Rate Report.pdf</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>

    <!-- Documento 3 -->
    <div class="flex items-center bg-green-50 p-4 rounded-xl">
      <div class="bg-green-100 p-3 rounded-lg mr-4 flex items-center justify-center">
        <span class="material-symbols-outlined text-green-500 text-3xl">description</span>
      </div>
      <div class="flex-grow">
        <p class="font-medium text-base">Glucose Report.pdf</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>

    <!-- Documento 4 -->
    <div class="flex items-center bg-pink-50 p-4 rounded-xl">
      <div class="bg-pink-100 p-3 rounded-lg mr-4 flex items-center justify-center">
        <span class="material-symbols-outlined text-pink-500 text-3xl">description</span>
      </div>
      <div class="flex-grow">
        <p class="font-medium text-base">Blood Count Report.pdf</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <span class="material-symbols-outlined">more_horiz</span>
      </button>
    </div>
  </div>
</div>


    </div>
  `;
}
