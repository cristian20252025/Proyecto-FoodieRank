/* =============================
   restaurantDetail.js - Detalle
   ============================= */

   import { apiGet, apiPost } from "./api.js";
   import { getToken, getUser } from "./auth.js";
   
   const params = new URLSearchParams(window.location.search);
   const id = params.get("id");
   
   document.addEventListener("DOMContentLoaded", async () => {
     if (!id) return (document.body.innerHTML = "<h2>Restaurante no encontrado</h2>");
     await loadRestaurant();
   });
   
   async function loadRestaurant() {
     try {
       const data = await apiGet(`/restaurants/${id}`, getToken());
       renderRestaurant(data.restaurant);
       renderReviews(data.reviews);
     } catch (err) {
       document.body.innerHTML = `<p class="form-error">${err.message}</p>`;
     }
   }
   
   function renderRestaurant(r) {
     document.getElementById("rest-name").textContent = r.name;
     document.getElementById("rest-category").textContent = `${r.category} • ${r.location}`;
     document.getElementById("rest-image").src = r.image || "assets/img/default-restaurant.jpg";
     document.getElementById("rest-rating").textContent = `⭐ ${r.avgRating || 0}/5`;
   }
   
   function renderReviews(reviews) {
     const container = document.getElementById("reviews-list");
     if (!reviews.length) {
       container.innerHTML = "<p>No hay reseñas aún.</p>";
       return;
     }
   
     container.innerHTML = reviews
       .map(
         (r) => `
         <div class="card review-card">
           <p><strong>${r.userName}</strong> - ⭐ ${r.rating}</p>
           <p>${r.comment}</p>
         </div>
       `
       )
       .join("");
   }
   
   // Crear reseña
   const reviewForm = document.getElementById("review-form");
   if (reviewForm) {
     reviewForm.addEventListener("submit", async (e) => {
       e.preventDefault();
       const rating = +document.getElementById("review-rating").value;
       const comment = document.getElementById("review-comment").value.trim();
   
       try {
         await apiPost(`/reviews/${id}`, { rating, comment }, getToken());
         alert("Reseña enviada correctamente.");
         location.reload();
       } catch (err) {
         document.getElementById("review-error").textContent = err.message;
       }
     });
   }
   