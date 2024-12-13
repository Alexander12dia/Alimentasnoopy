// Variables principales
const snoopy = document.getElementById('snoopy');
const food = document.getElementById('food1');
const message = document.getElementById('message');
const gameContainer = document.getElementById('game-container');  // Contenedor del juego
const overlay = document.createElement('div');  // Capa oscura
let snoopyStage = 0;
let snoopySize = 100; // Controla el tamaño de Snoopy
let currentMessageIndex = 0; // Empezamos con el primer mensaje

// Música de fondo (se reproduce a lo largo de todo el juego)
const backgroundMusic = new Audio('Sound/i love her.mp3'); // Ruta al archivo de música
backgroundMusic.loop = true;  // Hacer que la música se repita
backgroundMusic.volume = 0.5;  // Controlar el volumen (ajusta según tu preferencia)
backgroundMusic.play();  // Iniciar la música de fondo

// Imágenes para cada etapa de crecimiento
const snoopyStages = [
    'img/bebe.jpg',
    'img/bebe2.jpg',
    'img/bebe3.jpg',   // Bebé
    'img/joven.jpg',
    'img/joven2.jpg',
    'img/joven3.jpg',  // Joven
    'img/adulto.jpg',
    'img/adulto2.jpg',
    'img/adulto3.jpg',
    'img/adios.jpg'  // Adulto
];

// Mensajes motivadores
const messages = [
    "¡Muy bien, eres estupenda!",
    "¡Mira como crece jsjs waos!",
    "¡Owww muy lindooo!",
    "¡ay, ya está grandesito!",
    "¡Me haces falta:(!",
    "¡Genial, lo estás haciendo bien!",
    "¡Snoopy está creciendo rápido!",
    "¡Asu creció tan rápido :0!",
    "¡Jsjsjsj este es el límite!",
    "¡Gracias, pero me ilusioné mucho y no lo vuelvas a hacer cuidate jade!"
];

// Sonidos para cada etapa
const snoopySounds = [
    new Audio('JuegoParaMiNoviecita/sounds/bebe-sound.mp3'),   // Sonido de bebé
    new Audio('JuegoParaMiNoviecita/sounds/joven-sound.mp3'),  // Sonido de joven
    new Audio('JuegoParaMiNoviecita/sounds/adulto-sound.mp3')  // Sonido de adulto
];

// Delegar eventos de arrastrar y soltar
function initDragAndDrop() {
    food.addEventListener('dragstart', handleDragStart);
    snoopy.addEventListener('dragover', handleDragOver);
    snoopy.addEventListener('drop', handleDrop);
}

function handleDragStart(event) {
    event.dataTransfer.setData('text', 'food');
}

function handleDragOver(event) {
    event.preventDefault(); // Permitir soltar
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    if (data === 'food') {
        feedSnoopy();
    }
}

// Función para alimentar a Snoopy
function feedSnoopy() {
    if (snoopyStage < snoopyStages.length) {
        updateSnoopyImage();
        growSnoopy();
        playSnoopySound(); // Reproducir sonido
    }
    displayMessage(getNextMessage()); // Mostrar el siguiente mensaje en orden
}

function updateSnoopyImage() {
    snoopy.src = snoopyStages[snoopyStage];
    snoopyStage++;
}

function growSnoopy() {
    snoopySize += 20;
    snoopy.style.width = snoopySize + 'px';
    snoopy.classList.add('grow'); // Añadir animación
    setTimeout(() => {
        snoopy.classList.remove('grow'); // Remover animación tras un tiempo
    }, 500);
}

// Reproducir el sonido correspondiente a la etapa
function playSnoopySound() {
    if (snoopyStage - 1 < snoopySounds.length) {
        snoopySounds[snoopyStage - 1].play();
    }
}

// Función para obtener el siguiente mensaje en orden
function getNextMessage() {
    const message = messages[currentMessageIndex];  // Obtenemos el mensaje actual
    currentMessageIndex++;  // Avanzamos al siguiente mensaje
    
    // Si llegamos al final de la lista de mensajes, mostramos el mensaje final
    if (currentMessageIndex >= messages.length) {
        currentMessageIndex = 0;
        endGame();  // Fin del juego
    }
    
    return message;  // Devolvemos el mensaje actual
}

// Función para mostrar mensaje
function displayMessage(text) {
    message.textContent = text;
    message.style.opacity = 1;
    message.style.transform = 'translate(-50%, 0)';

    // Duración del mensaje (más larga si es el último mensaje)
    let displayDuration = 8000;  // Duración por defecto para todos los mensajes
    if (text === messages[messages.length - 1]) {
        displayDuration = 5455000;  // El último mensaje durará 10 segundos
    }

    // Esconde el mensaje después de su tiempo de duración
    setTimeout(() => {
        message.style.opacity = 0;
        message.style.transform = 'translate(-50%, -40px)';
    }, displayDuration); // Usar la duración correspondiente
}

// Función para finalizar el juego
function endGame() {
    // Crear la capa oscura
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '999';
    overlay.style.display = 'block';  // Hacer visible la capa oscura
    document.body.appendChild(overlay); // Añadir la capa al documento

    // Desactivar los eventos de interacción
    food.removeEventListener('dragstart', handleDragStart);
    snoopy.removeEventListener('dragover', handleDragOver);
    snoopy.removeEventListener('drop', handleDrop);

    // Mostrar mensaje final después de 1 segundo
    setTimeout(() => {
        displayMessage("¡Gracias por jugar, conmigo....!");
    }, 10000); // Esperamos un poco antes de mostrar el mensaje final
}

// Inicializar eventos
initDragAndDrop();
