// Variables para los elementos del DOM
const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const sumarBtn = document.getElementById("sumar");
const restarBtn = document.getElementById("restar");
const multiplicarBtn = document.getElementById("multiplicar");
const dividirBtn = document.getElementById("dividir");
const limpiarBtn = document.getElementById("limpiar");
const resultado = document.getElementById("resultado");

// Función para verificar si los inputs están llenos
function verificarInputs() {
    const esValido = numero1.value.trim() !== "" && numero2.value.trim() !== "";
    sumarBtn.disabled = !esValido;
    restarBtn.disabled = !esValido;
    multiplicarBtn.disabled = !esValido;
    dividirBtn.disabled = !esValido || parseFloat(numero2.value) === 0; // Evita división por 0
}

// Función para sumar dos números
function sumar() {
    const suma = parseFloat(numero1.value) + parseFloat(numero2.value);
    resultado.textContent = `Resultado: ${suma}`;
}

// Función para restar dos números
function restar() {
    const resta = parseFloat(numero1.value) - parseFloat(numero2.value);
    resultado.textContent = `Resultado: ${resta}`;
}

// Función para multiplicar dos números
function multiplicar() {
    const producto = parseFloat(numero1.value) * parseFloat(numero2.value);
    resultado.textContent = `Resultado: ${producto}`;
}

// Función para dividir dos números
function dividir() {
    if (parseFloat(numero2.value) === 0) {
        resultado.textContent = `Error: No se puede dividir por 0`;
        return;
    }
    const cociente = parseFloat(numero1.value) / parseFloat(numero2.value);
    resultado.textContent = `Resultado: ${cociente}`;
}

// Función para limpiar campos
function limpiarCampos() {
    numero1.value = "";
    numero2.value = "";
    resultado.textContent = "Resultado:";
    verificarInputs();
}

// Event Listeners para botones
sumarBtn.addEventListener("click", sumar);
restarBtn.addEventListener("click", restar);
multiplicarBtn.addEventListener("click", multiplicar);
dividirBtn.addEventListener("click", dividir);
limpiarBtn.addEventListener("click", limpiarCampos);

// Event Listeners para inputs
numero1.addEventListener("input", verificarInputs);
numero2.addEventListener("input", verificarInputs);

// Deshabilitar botones al inicio
verificarInputs();
