// Importamos la URL de la API y el helper de sesión
import { API_URL, guardarSesion } from "./api.js";

const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const mensajeError = document.getElementById("mensajeError");

// ===== ALTERNAR FORMULARIOS =====
btnRegister.addEventListener("click", () => {
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  mensajeError.textContent = "";
});

btnLogin.addEventListener("click", () => {
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  mensajeError.textContent = "";
});


// ===== LÓGICA DE REGISTRO (CONECTADA A LA API) =====
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  mensajeError.textContent = "";

  const nombre = document.getElementById("regNombre").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  
  // Validaciones simples del frontend
  if (!nombre || !email || !password) {
    mensajeError.textContent = "Todos los campos son obligatorios.";
    return;
  }
  if (password.length < 6) {
    mensajeError.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  // Deshabilitar botón para evitar doble click
  const boton = registerForm.querySelector("button");
  boton.disabled = true;
  boton.textContent = "Registrando...";

  try {
    const respuesta = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      // Si la API devuelve un error (ej. 400, 409)
      throw new Error(data.message || "Error al registrarse.");
    }

    // Éxito
    alert("✅ ¡Cuenta creada exitosamente! Por favor, inicia sesión.");
    btnLogin.click(); // Mover al formulario de login
    registerForm.reset();

  } catch (error) {
    mensajeError.textContent = error.message;
  } finally {
    // Reactivar el botón
    boton.disabled = false;
    boton.textContent = "Crear Cuenta";
  }
});


// ===== LÓGICA DE LOGIN (CONECTADA A LA API) =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  mensajeError.textContent = "";

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    mensajeError.textContent = "Email y contraseña son obligatorios.";
    return;
  }
  
  const boton = loginForm.querySelector("button");
  boton.disabled = true;
  boton.textContent = "Ingresando...";

  try {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await respuesta.json();

    if (!respuesta.ok) {
      // Si la API devuelve un error (ej. 401 Credenciales inválidas)
      throw new Error(data.message || "Error al iniciar sesión.");
    }

    // ¡ÉXITO! Guardamos la sesión
    guardarSesion(data);

    // Redirigimos al listado de restaurantes
    window.location.href = "listado-de-restaurantes.html";

  } catch (error) {
    mensajeError.textContent = error.message;
  } finally {
    boton.disabled = false;
    boton.textContent = "Iniciar Sesión";
  }
});

// Manejo simple de "Olvidaste tu contraseña"
const forgotLink = document.querySelector(".forgot");
if (forgotLink) {
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Función no implementada. Contacta al administrador.");
  });
}