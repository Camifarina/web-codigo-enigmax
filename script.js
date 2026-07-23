// =========================================================
// PROGRAMA INMORTALIDAD — Lógica de validación de acceso
// =========================================================

// La palabra clave se valida sin distinguir mayúsculas/minúsculas.
const PALABRA_CLAVE = "ALEXIS";

const formulario = document.getElementById("form-acceso");
const campoUsuario = document.getElementById("usuario");
const contenedorCampo = campoUsuario.closest(".campo");
const mensajeError = document.getElementById("mensaje-error");

const pantallaAcceso = document.getElementById("pantalla-acceso");
const pantallaResultado = document.getElementById("pantalla-resultado");
const botonVolver = document.getElementById("boton-volver");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const valorIngresado = campoUsuario.value.trim().toUpperCase();

  if (valorIngresado === PALABRA_CLAVE) {
    concederAcceso();
  } else {
    denegarAcceso();
  }
});

function concederAcceso() {
  mensajeError.classList.remove("visible");
  contenedorCampo.classList.remove("error");

  pantallaAcceso.classList.remove("activa");
  pantallaResultado.classList.add("activa");
}

function denegarAcceso() {
  mensajeError.textContent = "ACCESO DENEGADO · CLAVE INCORRECTA";
  mensajeError.classList.add("visible");

  contenedorCampo.classList.remove("error");
  // Forzar reinicio de la animación de temblor
  void contenedorCampo.offsetWidth;
  contenedorCampo.classList.add("error");

  campoUsuario.value = "";
  campoUsuario.focus();
}

// Permite volver a la pantalla de acceso y limpiar el formulario
if (botonVolver) {
  botonVolver.addEventListener("click", function () {
    pantallaResultado.classList.remove("activa");
    pantallaAcceso.classList.add("activa");
    campoUsuario.value = "";
    mensajeError.classList.remove("visible");
  });
}
