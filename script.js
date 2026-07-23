
// La palabra clave se valida sin distinguir mayúsculas/minúsculas.
const PALABRA_CLAVE = "ALEXIS";
const RETRASO_OCULTAR_MS = 550;

const formulario = document.getElementById("form-acceso");
const campoUsuario = document.getElementById("usuario");
const contenedorCampo = campoUsuario.closest(".campo");
const mensajeError = document.getElementById("mensaje-error");
const botonMostrar = document.getElementById("boton-mostrar");

const pantallaAcceso = document.getElementById("pantalla-acceso");
const pantallaResultado = document.getElementById("pantalla-resultado");
const botonVolver = document.getElementById("boton-volver");

let valorReal = "";
let revelada = false;
let indiceVisibleTemporal = -1;
let temporizadorOcultar = null;

function pintarCampo() {
  if (revelada) {
    campoUsuario.value = valorReal;
    return;
  }
  let resultado = "";
  for (let i = 0; i < valorReal.length; i++) {
    resultado += i === indiceVisibleTemporal ? valorReal[i] : "•";
  }
  campoUsuario.value = resultado;
}

function mostrarUltimoCaracterTemporalmente() {
  clearTimeout(temporizadorOcultar);
  indiceVisibleTemporal = valorReal.length - 1;
  pintarCampo();
  temporizadorOcultar = setTimeout(function () {
    indiceVisibleTemporal = -1;
    pintarCampo();
  }, RETRASO_OCULTAR_MS);
}

campoUsuario.addEventListener("input", function () {
  const posicionCursor = campoUsuario.selectionStart;
  const valorMostrado = campoUsuario.value;
  const diferencia = valorMostrado.length - valorReal.length;

  if (diferencia > 0) {
    const inicioInsercion = posicionCursor - diferencia;
    const insertados = valorMostrado.slice(inicioInsercion, posicionCursor);
    valorReal =
      valorReal.slice(0, inicioInsercion) +
      insertados +
      valorReal.slice(inicioInsercion);

    if (revelada) {
      pintarCampo();
    } else {
      mostrarUltimoCaracterTemporalmente();
    }
  } else if (diferencia < 0) {
    valorReal =
      valorReal.slice(0, posicionCursor) +
      valorReal.slice(posicionCursor - diferencia);
    pintarCampo();
  } else {
    pintarCampo();
  }

  campoUsuario.setSelectionRange(posicionCursor, posicionCursor);
});

botonMostrar.addEventListener("click", function () {
  revelada = !revelada;
  clearTimeout(temporizadorOcultar);
  indiceVisibleTemporal = -1;
  botonMostrar.setAttribute("aria-pressed", String(revelada));
  botonMostrar.setAttribute(
    "aria-label",
    revelada ? "Ocultar clave" : "Mostrar clave"
  );
  pintarCampo();
  campoUsuario.focus();
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const valorIngresado = valorReal.trim().toUpperCase();

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
  void contenedorCampo.offsetWidth;
  contenedorCampo.classList.add("error");

  reiniciarCampo();
  campoUsuario.focus();
}

function reiniciarCampo() {
  clearTimeout(temporizadorOcultar);
  valorReal = "";
  indiceVisibleTemporal = -1;
  pintarCampo();
}

if (botonVolver) {
  botonVolver.addEventListener("click", function () {
    pantallaResultado.classList.remove("activa");
    pantallaAcceso.classList.add("activa");
    reiniciarCampo();
    mensajeError.classList.remove("visible");
  });
}
