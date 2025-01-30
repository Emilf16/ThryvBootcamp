// Variables para los elementos del DOM
const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const sumarBtn = document.getElementById("sumar");
const restarBtn = document.getElementById("restar");
const multiplicarBtn = document.getElementById("multiplicar");
const dividirBtn = document.getElementById("dividir");
const limpiarBtn = document.getElementById("limpiar");
const resultado = document.getElementById("resultado");

// Función para verificar si los inputs están llenos y habilitar o deshabilitar los botones.

function verificarInputs() {
  // Verifica si ambos inputs tienen valores
  const esValido = numero1.value.trim() !== "" && numero2.value.trim() !== "";

  // Habilita o deshabilita los botones según la validación
  sumarBtn.disabled = !esValido;
  restarBtn.disabled = !esValido;
  multiplicarBtn.disabled = !esValido;

  // Deshabilita la división si el segundo número es 0 para evitar errores matemáticos
  dividirBtn.disabled = !esValido || parseFloat(numero2.value) === 0;
}

// Función para sumar dos números.
function sumar() {
  // Convierte los valores de los inputs a números y realiza la suma
  const suma = parseFloat(numero1.value) + parseFloat(numero2.value);

  // Muestra el resultado en el HTML
  resultado.textContent = `Resultado: ${suma}`;
}

//Función para restar dos números.

function restar() {
  // Convierte los valores a números y realiza la resta
  const resta = parseFloat(numero1.value) - parseFloat(numero2.value);

  // Muestra el resultado en el HTML
  resultado.textContent = `Resultado: ${resta}`;
}

//Función para multiplicar dos números.

function multiplicar() {
  // Convierte los valores a números y realiza la multiplicación
  const producto = parseFloat(numero1.value) * parseFloat(numero2.value);

  // Muestra el resultado en el HTML
  resultado.textContent = `Resultado: ${producto}`;
}

//Función para dividir dos números.

function dividir() {
  // Verifica si el segundo número es 0 para evitar errores matemáticos
  if (parseFloat(numero2.value) === 0) {
    resultado.textContent = `Error: No se puede dividir por 0`;
    return;
  }

  // Realiza la división
  const cociente = parseFloat(numero1.value) / parseFloat(numero2.value);

  // Muestra el resultado en el HTML
  resultado.textContent = `Resultado: ${cociente}`;
}

// Función para limpiar los campos de entrada y el resultado.

function limpiarCampos() {
  // Vacía los valores de los inputs
  numero1.value = "";
  numero2.value = "";

  // Restablece el texto del resultado
  resultado.textContent = "Resultado:";

  // Llama a verificarInputs para deshabilitar los botones
  verificarInputs();
}

// Event Listeners para los botones de operación
sumarBtn.addEventListener("click", sumar);
restarBtn.addEventListener("click", restar);
multiplicarBtn.addEventListener("click", multiplicar);
dividirBtn.addEventListener("click", dividir);
limpiarBtn.addEventListener("click", limpiarCampos);

// Event Listeners para detectar cambios en los inputs
numero1.addEventListener("input", verificarInputs);
numero2.addEventListener("input", verificarInputs);

// Deshabilita los botones al inicio para evitar errores
verificarInputs();
