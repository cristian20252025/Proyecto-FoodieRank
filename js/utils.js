/* =============================
   utils.js - Funciones auxiliares
   ============================= */

// Formatear fechas en formato legible
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  
  // Generar estrellas visuales según puntuación
  export function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "⭐" : "☆";
    }
    return stars;
  }
  
  // Mostrar alertas simples en pantalla
  export function showAlert(message, type = "success") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
  
    setTimeout(() => alertBox.remove(), 3000);
  }
  
  // Validar campos de formulario
  export function validateFields(fields) {
    for (const field of fields) {
      if (!field.value.trim()) {
        showAlert(`El campo "${field.name}" es obligatorio.`, "error");
        field.focus();
        return false;
      }
    }
    return true;
  }
  
  // Scroll suave hacia arriba
  export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  