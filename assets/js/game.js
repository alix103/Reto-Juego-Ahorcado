const palabrasJuego = ['perro', 'gato', 'casa', 'carro', 'ballena', 'gorila', 'manzana', 'matematicas', 'dibujo', 'corazon', 'espada', 'elefante', 'juguetes', 'hamburguesa', 'pelota']

const palabra = document.getElementById('palabra');
const btn = document.getElementById('btn');
const letrasUsadas = document.getElementById('letras-usadas');
const puntuacion = document.getElementById('score');

let canvas = document.getElementById('paint');
let ahorcado = canvas.getContext('2d');
ahorcado.canvas.width = 0;
ahorcado.canvas.height = 0;

const partesDibujo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabraSeleccionada;
let letraUsada;
let errores;
let aciertos;
let score = 0;

const seleccionadorPalabra = () => {
    let palabras = palabrasJuego[Math.floor((Math.random() * palabrasJuego.length))].toUpperCase();
    palabraSeleccionada = palabras.split('');
}

const gameOver = () => {
    document.removeEventListener('keydown', eventLetter);
    btn.style.display = 'block';
    alert("Perdiste");
}

const finJuego = () => {
    document.removeEventListener('keydown', eventLetter);
    btn.style.display = 'block';
    alert("¡Lo has logrado!");
}

const añadirLetra = letra => {
    const letter = document.createElement('span');
    letter.innerHTML = letra.toUpperCase();
    letrasUsadas.appendChild(letter);
}

const agregarCuerpo = parteDibujo => {
    ahorcado.fillStyle = '#8c009d';
    ahorcado.fillRect(...parteDibujo);
};

const letraIncorrecta = () => {
    agregarCuerpo(partesDibujo[errores]);
    errores++;
    if(errores === partesDibujo.length) gameOver();
}

const letraCorrecta = letra => {
    const {children} =  palabra;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letra) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.length) finJuego();
}

const letraIngresada = letra =>{
    if(palabraSeleccionada.includes(letra)) {
        letraCorrecta(letra);
        score++;
        document.getElementById("score").innerHTML = score;
    } else {
        letraIncorrecta();
    }
    añadirLetra(letra);
    letraUsada.push(letra);
}

const eventLetter = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !letraUsada.includes(newLetter)) {
        letraIngresada(newLetter);
    };
};

const pintarPalabra = () => {
    palabraSeleccionada.forEach(element => {
        const letter = document.createElement('span');
        letter.innerHTML = element.toUpperCase();
        letter.classList.add('letter');
        letter.classList.add('hidden');
        palabra.appendChild(letter);
    });
}

const dibujarAhorcado = () => {
    ahorcado.canvas.width = 120;
    ahorcado.canvas.height = 160;
    ahorcado.scale(20, 20);
    ahorcado.clearRect(0, 0, canvas.width, canvas.height);
    ahorcado.fillStyle = '#576cf3';
    ahorcado.fillRect(0, 7, 6, 1);
    ahorcado.fillRect(1, 0, 1, 8);
    ahorcado.fillRect(2, 0, 3, 1);
    ahorcado.fillRect(4, 1, 1, 1);
}

const iniciarJuego = () => {
    letraUsada = [];
    errores = 0;
    aciertos = 0;
    palabra.innerHTML = '';
    letrasUsadas.innerHTML = '';
    btn.style.display = 'none';
    dibujarAhorcado();
    seleccionadorPalabra();
    pintarPalabra();
    document.addEventListener('keydown', eventLetter);
    document.getElementById("score").innerHTML = 0;
}

btn.addEventListener('click', iniciarJuego);