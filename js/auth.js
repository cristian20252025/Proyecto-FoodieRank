// ==============================
// LÓGICA LOGIN / REGISTRO
// ==============================

const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Alternar formularios
btnRegister.addEventListener('click', () => {
  btnRegister.classList.add('active');
  btnLogin.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
});

btnLogin.addEventListener('click', () => {
  btnLogin.classList.add('active');
  btnRegister.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

// Validación simple (solo ejemplo)
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Cuenta creada exitosamente 🎉');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Inicio de sesión correcto ✅');
});
