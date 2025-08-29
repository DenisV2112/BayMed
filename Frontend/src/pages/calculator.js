export default function Calculator() {
  const html = `<!-- ================== CALCULATOR ================== -->
<section id="calcApp" class="max-w-[1180px] mx-auto mt-4 mb-10 bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 grid grid-cols-[420px_1fr] gap-6 shadow-[0_10px_30px_rgba(0,0,0,.04),_inset_0_1px_0_#fff]">

  <!-- Columna izquierda -->
  <aside class="bg-white rounded-xl p-5 shadow-[0_6px_20px_rgba(0,0,0,.05)]">
    <!-- Selector de modo -->
    <div class="bg-gray-100 rounded-xl p-3 mb-4 flex items-center gap-2">
      <label for="mode" class="font-semibold text-gray-500">Modo</label>
      <select id="mode"
        class="flex-1 border-none bg-white px-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cyan-400">
        <option value="normal" selected>Normal</option>
        <option value="imc">IMC</option>
        <option value="bsa">BSA (DuBois)</option>
        <option value="cga">Cockcroft–Gault</option>
        <option value="peds">Dosis Pediátrica</option>
        <option value="mgml">Conversión mg ↔ mL</option>
        <option value="iv">Goteo IV</option>
      </select>
    </div>

    <!-- Keypad -->
    <div id="keypad" class="grid grid-cols-4 gap-3" aria-label="Teclado calculadora">
      <button data-act="clear" class="bg-gray-200 text-gray-700 rounded-xl py-5 shadow-inner">C</button>
      <button data-act="back" class="bg-gray-200 text-gray-700 rounded-xl py-5 shadow-inner">⌫</button>
      <button data-val="%" class="bg-gray-200 text-gray-700 rounded-xl py-5 shadow-inner">%</button>
      <button data-val="/" class="bg-gray-900 text-white rounded-xl py-5">/</button>

      <button data-val="7" class="bg-gray-100 rounded-xl py-5 shadow-inner">7</button>
      <button data-val="8" class="bg-gray-100 rounded-xl py-5 shadow-inner">8</button>
      <button data-val="9" class="bg-gray-100 rounded-xl py-5 shadow-inner">9</button>
      <button data-val="*" class="bg-gray-900 text-white rounded-xl py-5">×</button>

      <button data-val="4" class="bg-gray-100 rounded-xl py-5 shadow-inner">4</button>
      <button data-val="5" class="bg-gray-100 rounded-xl py-5 shadow-inner">5</button>
      <button data-val="6" class="bg-gray-100 rounded-xl py-5 shadow-inner">6</button>
      <button data-val="-" class="bg-gray-900 text-white rounded-xl py-5">−</button>

      <button data-val="1" class="bg-gray-100 rounded-xl py-5 shadow-inner">1</button>
      <button data-val="2" class="bg-gray-100 rounded-xl py-5 shadow-inner">2</button>
      <button data-val="3" class="bg-gray-100 rounded-xl py-5 shadow-inner">3</button>
      <button data-val="+" class="bg-gray-900 text-white rounded-xl py-5">+</button>

      <button data-val="0" class="col-span-2 bg-gray-100 rounded-xl py-5 shadow-inner">0</button>
      <button data-val="." class="bg-gray-100 rounded-xl py-5 shadow-inner">.</button>
      <button data-act="equals" class="bg-cyan-500 text-white font-bold rounded-xl py-5">=</button>
    </div>
  </aside>

  <!-- Panel derecho -->
  <section class="bg-white rounded-xl p-5 flex flex-col">
    <!-- Historial -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-gray-600">Historial</h3>
        <button id="clearHistory" class="text-xs bg-red-500 text-white px-2 py-1 rounded">Borrar</button>
      </div>
      <div id="history" class="bg-gray-100 rounded-lg p-3 h-32 overflow-y-auto text-sm text-gray-700"></div>
    </div>

    <!-- Contenido dinámico -->
    <div id="rightContent" class="flex-1 bg-gray-50 rounded-lg p-6 relative min-h-[320px]">
      <p class="text-gray-400 font-semibold">Selecciona un modo para empezar.</p>
    </div>
  </section>
</section>
  `;
  return html;

}

export const title = "CALCULATOR";


  function tryInit() {
    const root = document.getElementById("calcApp");
    const modeSelect = document.getElementById("mode");
    const rightContent = document.getElementById("rightContent");
    const historyBox = document.getElementById("history");
    const clearHistoryBtn = document.getElementById("clearHistory");
    const keypad = document.getElementById("keypad");
    if (!root || !modeSelect || !rightContent || !historyBox || !clearHistoryBtn || !keypad) return false;


    // ===== Estado =====
    let displayValue = "";
    let activeInput = null;
    let activeForm = null;
    const MODES = ["normal","imc","bsa","cga","peds","mgml","iv"];
    const histories = Object.fromEntries(MODES.map(m => [m, []]));

    // ===== Historial =====
    function renderHistory() {
      const mode = modeSelect.value;
      const items = histories[mode];
      historyBox.innerHTML = items.length
        ? items.map(t => `<div class="border-b py-1">${t}</div>`).join("")
        : `<p class="text-gray-400 text-xs">Sin resultados</p>`;
    }
    function addHistory(text) {
      const mode = modeSelect.value;
      histories[mode].unshift(text);
      if (histories[mode].length > 5) histories[mode].pop();
      renderHistory();
    }
    clearHistoryBtn.addEventListener("click", () => {
      histories[modeSelect.value] = [];
      renderHistory();
    });

    // ===== Helpers foco/cursor =====
    rightContent.addEventListener("focusin", (e) => {
      if (e.target.matches("input, select, textarea")) activeInput = e.target;
    });
    function afterRenderMedicalForm() {
      activeForm = rightContent.querySelector("form");
      activeInput = activeForm?.querySelector("input, select, textarea") || null;
      setTimeout(() => activeInput?.focus(), 0);
    }
    function insertAtCursor(el, text) {
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      el.value = el.value.slice(0, start) + text + el.value.slice(end);
      el.setSelectionRange(start + text.length, start + text.length);
    }
    function backspaceAtCursor(el) {
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      if (start !== end) {
        el.value = el.value.slice(0, start) + el.value.slice(end);
        el.setSelectionRange(start, start);
      } else if (start > 0) {
        el.value = el.value.slice(0, start - 1) + el.value.slice(end);
        el.setSelectionRange(start - 1, start - 1);
      }
    }
    function clearField(el) { el.value = ""; el.setSelectionRange(0, 0); }

    // ===== Mostrar resultado =====
    function showResult(label, value, extra = "") {
      const html = `<div class="mt-3 bg-white rounded-md p-4 shadow text-sm"><strong>${label}:</strong> ${value}${extra ? ` <span class="text-gray-500">(${extra})</span>` : ``}</div>`;
      addHistory(`<strong>${label}:</strong> ${value}${extra ? ` (${extra})` : ``}`);
    }

    // ===== Renderizadores =====
    function renderNormal() {
      rightContent.innerHTML = `<div class="text-4xl font-bold text-gray-700 h-16 w-full flex items-center justify-end px-2 overflow-x-auto">${displayValue || 0}</div>`;
    }
 

    function renderIMC() {
      rightContent.innerHTML = `
        <form id="formIMC" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">IMC (Índice de Masa Corporal)</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="imcPeso" class="text-xs text-gray-500">Peso (kg)</label>
              <input id="imcPeso" type="number" inputmode="decimal" min="0" step="0.1" required
                class="w-full p-3 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label for="imcTalla" class="text-xs text-gray-500">Talla (cm)</label>
              <input id="imcTalla" type="number" inputmode="decimal" min="0" step="0.1" required
                class="w-full p-3 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-cyan-400"/>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Calcular</button>
        </form>`;
      rightContent.querySelector('#formIMC').addEventListener('submit', (e) => {
        e.preventDefault();
        const peso = parseFloat(document.getElementById('imcPeso').value);
        const talla = parseFloat(document.getElementById('imcTalla').value) / 100;
        const imc = (peso / (talla * talla)).toFixed(2);
        showResult('IMC', imc, `${peso} kg, ${(talla*100).toFixed(1)} cm`);
      });
      afterRenderMedicalForm();
    }
    function renderBSA() {
      rightContent.innerHTML = `
        <form id="formBSA" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">BSA (Superficie Corporal, DuBois)</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="bsaPeso" class="text-xs text-gray-500">Peso (kg)</label>
              <input id="bsaPeso" type="number" inputmode="decimal" min="0" step="0.1" required
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label for="bsaTalla" class="text-xs text-gray-500">Talla (cm)</label>
              <input id="bsaTalla" type="number" inputmode="decimal" min="0" step="0.1" required
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Calcular</button>
        </form>`;
      rightContent.querySelector('#formBSA').addEventListener('submit', (e) => {
        e.preventDefault();
        const peso = parseFloat(document.getElementById('bsaPeso').value);
        const talla = parseFloat(document.getElementById('bsaTalla').value);
        const bsa = (0.007184 * Math.pow(peso, 0.425) * Math.pow(talla, 0.725)).toFixed(2);
        showResult('BSA', `${bsa} m²`, `${peso} kg, ${talla} cm`);
      });
      afterRenderMedicalForm();
    }
    function renderCGA() {
      rightContent.innerHTML = `
        <form id="formCGA" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">Cockcroft–Gault</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500">Edad</label>
              <input id="cgaEdad" type="number" inputmode="numeric" min="1" required
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Peso (kg)</label>
              <input id="cgaPeso" type="number" inputmode="decimal" min="1" step="0.1" required
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Creatinina (mg/dL)</label>
              <input id="cgaCreat" type="number" inputmode="decimal" min="0.1" step="0.01" required
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Sexo</label>
              <select id="cgaSexo" class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400">
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Calcular</button>
        </form>`;
      rightContent.querySelector('#formCGA').addEventListener('submit', (e) => {
        e.preventDefault();
        const edad = parseInt(document.getElementById('cgaEdad').value);
        const peso = parseFloat(document.getElementById('cgaPeso').value);
        const creat = parseFloat(document.getElementById('cgaCreat').value);
        const sexo = document.getElementById('cgaSexo').value;
        let val = ((140 - edad) * peso) / (72 * creat);
        if (sexo === 'F') val *= 0.85;
        showResult('Clearance', `${val.toFixed(2)} mL/min`, `${edad}a, ${peso} kg, Cr ${creat} mg/dL, ${sexo}`);
      });
      afterRenderMedicalForm();
    }
    function renderPeds() {
      rightContent.innerHTML = `
        <form id="formPeds" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">Dosis Pediátrica</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500">Edad (años)</label>
              <input id="pedEdad" type="number" inputmode="decimal" min="0" step="0.1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Dosis adulta (mg)</label>
              <input id="pedAdult" type="number" inputmode="decimal" min="0" step="0.1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Calcular</button>
        </form>`;
      rightContent.querySelector('#formPeds').addEventListener('submit', (e) => {
        e.preventDefault();
        const edad = parseFloat(document.getElementById('pedEdad').value);
        const adult = parseFloat(document.getElementById('pedAdult').value);
        const dosis = (edad / (edad + 12)) * adult;
        showResult('Dosis Niño', `${dosis.toFixed(2)} mg`, `${edad} años, adulto ${adult} mg`);
      });
      afterRenderMedicalForm();
    }
    function renderMgMl() {
      rightContent.innerHTML = `
        <form id="formMgMl" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">Conversión mg ↔ mL</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500">Dosis (mg)</label>
              <input id="convMg" type="number" inputmode="decimal" step="0.1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Concentración (mg/mL)</label>
              <input id="convConc" type="number" inputmode="decimal" step="0.1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Convertir</button>
        </form>`;
      rightContent.querySelector('#formMgMl').addEventListener('submit', (e) => {
        e.preventDefault();
        const mg = parseFloat(document.getElementById('convMg').value);
        const conc = parseFloat(document.getElementById('convConc').value);
        const ml = (mg / conc).toFixed(2);
        showResult('Volumen', `${ml} mL`, `${mg} mg @ ${conc} mg/mL`);
      });
      afterRenderMedicalForm();
    }
    function renderIV() {
      rightContent.innerHTML = `
        <form id="formIV" class="grid gap-3 max-w-md">
          <h3 class="text-lg font-semibold mb-2">Goteo IV</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500">Volumen (mL)</label>
              <input id="ivVol" type="number" inputmode="numeric" min="1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Tiempo (h)</label>
              <input id="ivTime" type="number" inputmode="decimal" min="0.1" step="0.1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
            <div>
              <label class="text-xs text-gray-500">Factor goteo (gtt/mL)</label>
              <input id="ivDrop" type="number" inputmode="numeric" min="1"
                class="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"/>
            </div>
          </div>
          <button type="submit" class="px-4 py-3 rounded-lg bg-cyan-500 text-white font-bold">Calcular</button>
        </form>`;
      rightContent.querySelector('#formIV').addEventListener('submit', (e) => {
        e.preventDefault();
        const vol = parseFloat(document.getElementById('ivVol').value);
        const time = parseFloat(document.getElementById('ivTime').value);
        const drop = parseFloat(document.getElementById('ivDrop').value);
        const rate = (vol * drop) / (time * 60);
        showResult('Goteo', `${rate.toFixed(2)} gtt/min`, `${vol} mL en ${time} h, factor ${drop}`);
      });
      afterRenderMedicalForm();
    }

    // ===== Cambio de modo =====
    modeSelect.addEventListener('change', () => {
      if (modeSelect.value === 'normal') renderNormal();
      else if (modeSelect.value === 'imc') renderIMC();
      else if (modeSelect.value === 'bsa') renderBSA();
      else if (modeSelect.value === 'cga') renderCGA();
      else if (modeSelect.value === 'peds') renderPeds();
      else if (modeSelect.value === 'mgml') renderMgMl();
      else if (modeSelect.value === 'iv') renderIV();
      renderHistory();
    });

    // Render inicial
    renderNormal();
    renderHistory();

    // ===== Keypad (delegación) =====
    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-val], button[data-act]');
      if (!btn) return;
      e.preventDefault();
      const val = btn.dataset.val;
      const act = btn.dataset.act;

      // --- MODO NORMAL ---
      if (modeSelect.value === 'normal') {
        if (val) {
          displayValue += val;
        } else if (act === 'clear') {
          displayValue = '';
        } else if (act === 'back') {
          displayValue = displayValue.slice(0, -1);
        } else if (act === 'equals') {
          try {
            if (!/^[-+*/%.() 0-9]*$/.test(displayValue)) throw new Error('Invalid');
            const result = Function('return (' + displayValue + ')')();
            addHistory(`${displayValue} = ${result}`);
            displayValue = String(result);
          } catch {
            displayValue = 'Error';
          }
        }
        renderNormal();
        return;
      }

      // --- MODOS MÉDICOS ---
      if (!activeForm) activeForm = rightContent.querySelector('form');
      if (!activeInput || !activeForm?.contains(activeInput)) {
        activeInput = activeForm?.querySelector('input, select, textarea') || null;
      }

      if (act === 'equals') { activeForm?.dispatchEvent(new Event('submit', { cancelable: true })); return; }

      if (!activeInput || activeInput.tagName === 'SELECT' || activeInput.disabled || activeInput.readOnly) {
        activeForm?.querySelector('input, select, textarea')?.focus();
        return;
      }

      if (val) {
        if (/^\d$/.test(val) || val === '.') insertAtCursor(activeInput, val);
        else if (val === '+' || val === '-') {
          const v = activeInput.value || '';
          activeInput.value = v.startsWith('-') ? v.slice(1) : '-' + v;
          const pos = activeInput.value.length; activeInput.setSelectionRange(pos, pos);
        }
      } else if (act === 'back') backspaceAtCursor(activeInput);
      else if (act === 'clear') clearField(activeInput);

      activeInput.focus();
    });

    // ===== Teclado físico =====
    document.addEventListener('keydown', (e) => {
      const isTyping = document.activeElement && ['INPUT','TEXTAREA'].includes(document.activeElement.tagName);

      if (modeSelect.value === 'normal') {
        if (/^[0-9+\-*/%.()]$/.test(e.key)) { displayValue += e.key; renderNormal(); }
        else if (e.key === 'Enter') {
          try {
            if (!/^[-+*/%.() 0-9]*$/.test(displayValue)) throw new Error('Invalid');
            const result = Function('return (' + displayValue + ')')();
            addHistory(`${displayValue} = ${result}`);
            displayValue = String(result);
          } catch { displayValue = 'Error'; }
          renderNormal();
        } else if (e.key === 'Backspace') { displayValue = displayValue.slice(0, -1); renderNormal(); }
        else if (e.key === 'Escape') { displayValue = ''; renderNormal(); }
        return;
      }

      // Médicos
      if (e.key === 'Enter') {
        const form = rightContent.querySelector('form');
        form?.dispatchEvent(new Event('submit', { cancelable: true }));
        e.preventDefault();
        return;
      }
      if (isTyping && activeInput && rightContent.contains(activeInput)) {
        if (!e.ctrlKey && !e.metaKey && (/^[0-9.]$/.test(e.key))) {
          // permitido
        } else if (['Backspace','Delete','ArrowLeft','ArrowRight','Tab'].includes(e.key)) {
          // navegación
        } else {
          if ((activeInput.getAttribute('type')||'').includes('number')) e.preventDefault();
        }
      }
    });

    return true;
  }
  

  if (!tryInit()) {
    const obs = new MutationObserver(() => { if (tryInit()) obs.disconnect(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  export function initCalculator() {
  tryInit();
}
