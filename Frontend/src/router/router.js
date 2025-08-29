import * as Home from "../pages/home.js";
import * as Guide from "../pages/guide.js";
import * as Scales from "../pages/scales.js";
import * as Calculator from "../pages/calculator.js";
import * as NotFound from "../pages/notFound.js";

const routes = {
  "/": Home,
  "/guide": Guide,
  "/scales": Scales,
  "/calculator": Calculator,
};

function router() {
  const path = location.hash.slice(1) || "/";
  const route = routes[path] || NotFound;

  // Renderiza la vista
  document.getElementById("app").innerHTML = route.default();
  Guide.initGuidePage()

if (typeof route.initGuidePage === "function") route.initGuidePage();
if (typeof route.initCalculator === "function") route.initCalculator();

  // Cambia el H3
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) pageTitle.textContent = route.title || "BAYMED";
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
