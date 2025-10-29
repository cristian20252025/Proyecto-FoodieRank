/* =============================
   footer.js - Componente Footer
   ============================= */

   export function renderFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
  
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <p>&copy; ${year} RankingRestaurants | Desarrollado con 💻 Node.js + HTML + CSS + JS</p>
      </div>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", renderFooter);
  