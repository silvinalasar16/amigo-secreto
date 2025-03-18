//Creación de variabes globales para la aplicación de Amigo Secreto
let amigos = []; // se guardaran los amigos que se vayan ingresando en el sistema
let sorteoRealizado = false; // controlar si el sorteo ya fue realizado

//Event Listener para la tecla Enter
 //Permite agregar nombres presionando Enter en lugar de hacer clic en el botón
 
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        agregarAmigo();
    }
});
/**
 * Función para agregar un nuevo amigo a la lista
 * 
 * @description
 * - Verifica si se puede agregar más nombres (sorteo no realizado)
 * - Valida que el nombre no esté vacío
 * - Comprueba que el nombre no esté duplicado
 * - Agrega el nombre a la lista y actualiza la visualización
 * 
 * @returns {void}
 */
function agregarAmigo() {
    // Verificar si ya se realizó el sorteo
    if (sorteoRealizado) {
        alert("No puedes agregar más amigos después del sorteo. Presiona 'Nuevo Juego' para reiniciar.");
        return;
    }

    limpiarResultado(); // Limpia cualquier resultado anterior
    
    // Obtener y limpiar el nombre ingresado
    let nombreAmigo = document.getElementById("amigo").value.trim();
    
    // Validaciones
    if (nombreAmigo === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    if (amigos.includes(nombreAmigo)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    // Agregar el nombre y actualizar la interfaz
    amigos.push(nombreAmigo);
    document.getElementById("amigo").value = "";  // Limpiar el campo de entrada
    document.getElementById("amigo").focus(); // Mantener el foco en el input
    mostrarListaAmigos();
}

/**
 * Función para mostrar la lista de amigos en la interfaz
 * 
 * @description
 * - Limpia la lista actual
 * - Crea elementos li para cada amigo
 * - Actualiza el DOM con la nueva lista
 * 
 * @returns {void}
 */
function mostrarListaAmigos() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";  // Limpiar la lista actual

    // Crear elementos para cada amigo
    amigos.forEach((amigo) => {
        let li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

/**
 * Función para realizar el sorteo del amigo secreto
 * 
 * @description
 * - Verifica que haya al menos 2 amigos en la lista
 * - Selecciona un amigo aleatorio
 * - Muestra el resultado con animaciones
 * - Marca el sorteo como realizado
 * 
 * @returns {void}
 */
function sortearAmigo() {
    // Verificar cantidad mínima de amigos
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Realizar el sorteo aleatorio
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSecreto = amigos[indiceAleatorio];

    // Mostrar el resultado con animaciones
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<li>El amigo secreto es: <strong>${amigoSecreto}</strong></li>`;

    // Marcar el sorteo como realizado
    sorteoRealizado = true;

    // Limpiar la lista de amigos
    amigos = [];
    mostrarListaAmigos();
}

/**
 * Función para limpiar el resultado del sorteo
 * 
 * @description
 * - Elimina el contenido del elemento resultado
 * - Se utiliza antes de agregar nuevos nombres
 * 
 * @returns {void}
 */
function limpiarResultado() {
    document.getElementById("resultado").innerHTML = "";
}

/**
 Función para reiniciar el juego
 * 
 * @description
 * - Limpia el campo de entrada
 * - Vacía la lista de amigos
 * - Resetea la bandera de sorteo
 * - Limpia las listas en pantalla
 * - Limpia el resultado
 * 
 * @returns {void}
 */
function nuevoJuego() {
    document.getElementById("amigo").value = "";  // Limpiar el campo de entrada
    amigos = []; // Vaciar la lista de amigos
    sorteoRealizado = false; // Permitir agregar nuevos nombres
    document.getElementById("listaAmigos").innerHTML = ""; // Limpiar la lista en pantalla
    limpiarResultado(); // Limpiar el resultado
}