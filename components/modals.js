/* =============================
   modals.js - Ventanas emergentes
   ============================= */

   export function openModal(title, contentHTML, onConfirm = null) {
    closeModal(); // Cerrar si hay otra abierta
  
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <h2>${title}</h2>
        <div class="modal-content">${contentHTML}</div>
        <div class="modal-actions">
          <button id="modal-cancel" class="btn-outline">Cancelar</button>
          <button id="modal-confirm" class="btn">Confirmar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  
    // Cerrar modal
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
  
    // Confirmar acción
    document.getElementById("modal-confirm").addEventListener("click", () => {
      if (onConfirm) onConfirm();
      closeModal();
    });
  }
  
  export function closeModal() {
    const existing = document.querySelector(".modal-overlay");
    if (existing) existing.remove();
  }
  