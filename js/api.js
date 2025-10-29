/* =============================
   api.js - Conexión con Backend
   ============================= */

   const API_URL = "http://localhost:4000/api/v1"; // Cambia según tu entorno

   // Helper para manejar respuestas
   async function handleResponse(response) {
     const data = await response.json().catch(() => ({}));
     if (!response.ok) throw new Error(data.message || "Error en la solicitud");
     return data;
   }
   
   // Petición GET
   export async function apiGet(endpoint, token) {
     const res = await fetch(`${API_URL}${endpoint}`, {
       headers: { Authorization: token ? `Bearer ${token}` : "" },
     });
     return handleResponse(res);
   }
   
   // Petición POST
   export async function apiPost(endpoint, body, token) {
     const res = await fetch(`${API_URL}${endpoint}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: token ? `Bearer ${token}` : "",
       },
       body: JSON.stringify(body),
     });
     return handleResponse(res);
   }
   
   // Petición PUT
   export async function apiPut(endpoint, body, token) {
     const res = await fetch(`${API_URL}${endpoint}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         Authorization: token ? `Bearer ${token}` : "",
       },
       body: JSON.stringify(body),
     });
     return handleResponse(res);
   }
   
   // Petición DELETE
   export async function apiDelete(endpoint, token) {
     const res = await fetch(`${API_URL}${endpoint}`, {
       method: "DELETE",
       headers: { Authorization: token ? `Bearer ${token}` : "" },
     });
     return handleResponse(res);
   }
   