// ==============================
// LÓGICA LOGIN / REGISTRO MEJORADA
// ==============================

const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// ===== ALTERNAR FORMULARIOS CON ANIMACIÓN =====
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

// ===== VALIDACIÓN DE EMAIL =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// ===== VALIDACIÓN DE CONTRASEÑA =====
function validatePassword(password) {
  // Mínimo 6 caracteres
  return password.length >= 6;
}

// ===== MOSTRAR MENSAJES DE ERROR =====
function showError(input, message) {
  const formGroup = input.parentElement;
  let errorDiv = formGroup.querySelector('.error-message');
  
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    formGroup.appendChild(errorDiv);
  }
  
  errorDiv.textContent = message;
  input.style.borderColor = '#e53e3e';
}

// ===== LIMPIAR MENSAJES DE ERROR =====
function clearError(input) {
  const formGroup = input.parentElement;
  const errorDiv = formGroup.querySelector('.error-message');
  
  if (errorDiv) {
    errorDiv.remove();
  }
  
  input.style.borderColor = '#cfe7d7';
}

// ===== VALIDACIÓN DE REGISTRO =====
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputs = registerForm.querySelectorAll('input');
  const email = inputs[0].value.trim();
  const password = inputs[1].value;
  const confirmPassword = inputs[2].value;
  
  let isValid = true;
  
  // Limpiar errores previos
  inputs.forEach(input => clearError(input));
  
  // Validar email
  if (!email) {
    showError(inputs[0], 'El email es requerido');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(inputs[0], 'Email inválido');
    isValid = false;
  }
  
  // Validar contraseña
  if (!password) {
    showError(inputs[1], 'La contraseña es requerida');
    isValid = false;
  } else if (!validatePassword(password)) {
    showError(inputs[1], 'La contraseña debe tener al menos 6 caracteres');
    isValid = false;
  }
  
  // Validar confirmación
  if (!confirmPassword) {
    showError(inputs[2], 'Confirma tu contraseña');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError(inputs[2], 'Las contraseñas no coinciden');
    isValid = false;
  }
  
  if (isValid) {
    // Simular guardado de usuario
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el usuario ya existe
    if (usuarios.some(u => u.email === email)) {
      showError(inputs[0], 'Este email ya está registrado');
      return;
    }
    
    usuarios.push({ email, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Mostrar mensaje de éxito
    alert('✅ Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
    
    // Cambiar a formulario de login
    btnLogin.click();
    registerForm.reset();
  }
});

// ===== VALIDACIÓN DE LOGIN =====
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputs = loginForm.querySelectorAll('input');
  const email = inputs[0].value.trim();
  const password = inputs[1].value;
  
  let isValid = true;
  
  // Limpiar errores previos
  inputs.forEach(input => clearError(input));
  
  // Validar email
  if (!email) {
    showError(inputs[0], 'El email es requerido');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(inputs[0], 'Email inválido');
    isValid = false;
  }
  
  // Validar contraseña
  if (!password) {
    showError(inputs[1], 'La contraseña es requerida');
    isValid = false;
  }
  
  if (isValid) {
    // Verificar credenciales
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
      // Guardar sesión
      localStorage.setItem('usuarioActivo', JSON.stringify({ email }));
      
      alert('✅ Inicio de sesión exitoso');
      
      // Redirigir al listado de restaurantes
      setTimeout(() => {
        window.location.href = 'listado-de-restaurantes.html';
      }, 500);
    } else {
      showError(inputs[0], 'Email o contraseña incorrectos');
      showError(inputs[1], 'Email o contraseña incorrectos');
    }
  }
});

// ===== LIMPIAR ERRORES AL ESCRIBIR =====
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    clearError(input);
  });
});

// ===== RECUPERAR CONTRASEÑA =====
const forgotLink = document.querySelector('.forgot');
if (forgotLink) {
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Ingresa tu email para recuperar tu contraseña:');
    
    if (email && validateEmail(email)) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuario = usuarios.find(u => u.email === email);
      
      if (usuario) {
        alert('📧 Se ha enviado un enlace de recuperación a tu email.');
      } else {
        alert('❌ No existe una cuenta con ese email.');
      }
    } else if (email) {
      alert('❌ Email inválido.');
    }
  });
}