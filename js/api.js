// Variable global con la URL de tu backend
export const API_URL = "http://localhost:4000/api/v1";

/**
 * Guarda el token y los datos del usuario en localStorage.
 * @param {object} data - Los datos recibidos del login { token, usuario }
 */
export function guardarSesion(data) {
  localStorage.setItem("token", data.token);
  // Guardamos el usuario como string JSON para acceder a su nombre y rol
  localStorage.setItem("usuario", JSON.stringify(data.usuario));
}

/**
 * Elimina los datos de sesión de localStorage.
 */
export function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

/**
 * Obtiene el token JWT de localStorage.
 * @returns {string | null}
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Obtiene los datos del usuario de localStorage.
 * @returns {object | null}
 */
export function getUsuario() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

/**
 * Verifica si hay un token de sesión activo.
 * @returns {boolean}
 */
export function estaAutenticado() {
  return !!getToken();
}