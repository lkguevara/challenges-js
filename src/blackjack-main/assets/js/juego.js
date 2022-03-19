// 2C = Two of clubs, 2D = Two of Diamands, 2H = Two of Hearts, 2S = Two of Spades

//* #1. Crear el arreglo

let deck = []; //Arreglo vacío

//Se crea una constante con las letras que se requieren para cada número.
const tipos = ['C', 'D', 'H', 'S'] 
const especiales = ['A', 'J', 'Q', 'K'] 
// constante para manipular los puntos del jugador - computadora
let puntosJugador =0;
let puntosComputadora =0;

// Referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const puntosHTML = document.querySelectorAll('small')



//Hacer un ciclo for, que empienza con el número 2 y llega hasta el número 10;
//Hacer otro ciclo for dentro del mismo para las letras A J Q K y pushear con el anterior ciclo

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let  tipo of tipos) {
            deck.push(i + tipo);
        }
    }
   
    for (let  tipo of tipos) {
        for (let  esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);

    //Llamar el shuffle del nuevo arreglo
    deck =_.shuffle (deck);
    console.log(deck);
    return deck;
}
//Llamar la función
crearDeck()

    /* Se va a imprimir lo siguiente
    '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S'
    */

    /*
        Lo anterior lo necesitamos en desorden, por ende se instalará la libreria underscore para que sea aleatorio:
        shuffle_.shuffle(list)
        Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

        _.shuffle([1, 2, 3, 4, 5, 6]);
        => [4, 1, 6, 3, 5, 2] 
        
    */

//* #2. Crear una función que permita tomar una carta de la baraja

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay más cartas'
    }
    const carta = deck.pop(); //Va a remover el último elemento del arreglo y lo regresa
    return carta;
}

// * #3. Valor de cada carta

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);
    // aplicando condicional ternario
    return (isNaN (valor)) ?  //Si no es un número, se preguntará por el valor ingresado y aqui se realiza nueva condición ternaria
                (valor === 'A') ? 11:10 // Si ese valor es "A" el valor sera 10 sino será 11,
                : valor * 1; //Pero si el valor es un número, este se multiplicará por 1 para no dar un string

    // Otra forma 
    // if (isNaN (valor)) {
    //     puntos = (valor === 'A') ? 11 : 10; //Si retorna A vale 11  caso contrario vale 10
    // }else {
    //     puntos = valor * 1; //Convierte a número
    // }
    // console.log(puntos)
}

//* turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta(); //Toma la carta de la baraja
        puntosComputadora+=valorCarta(carta); //Va sumando los punto de la carta
        puntosHTML[1].innerText=puntosComputadora //[0] para tomar el primer small del Computadora, posición 1 corresponde a la computadora.
    
        //* Mostrando las cartas en el document
        const imgCarta = document.createElement('img'); // crea una variable que me crea una imagen
        imgCarta.src= `assets/images/${ carta }.png`; // ubicación de la imagen
        imgCarta.classList.add('carta') //La clase de la imagen para los estilos
        divCartasComputadora.append(imgCarta); //  a la constante creada para manipular el id "jugador-cartas" se le agrega la imagen. 

        if (puntosMinimos > 21) {
            break;
        }
    } while (( puntosComputadora < puntosMinimos) && (puntosMinimos <=21));

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
};


//* #4 Eventos (pedir carta)
// Evento addEventListener(click, funcion (callback)); Cuando se haga click se va a disparar la función
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(); //Toma la carta de la baraja
    puntosJugador+=valorCarta(carta); //Va sumando los punto de la carta
    puntosHTML[0].innerText=puntosJugador //[0] para tomar el primer small del jugador, posición 1 corresponde a la computadora.

    //* Mostrando las cartas en el document
    const imgCarta = document.createElement('img'); // crea una variable que me crea una imagen
    imgCarta.src= `assets/images/${ carta }.png`; // ubicación de la imagen
    imgCarta.classList.add('carta') //La clase de la imagen para los estilos
    divCartasJugador.append(imgCarta); //  a la constante creada para manipular el id "jugador-cartas" se le agrega la imagen.

    // condicional para que no supere los 20ptos

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true; //Bloquea el botón pedir
        btnDetener.disabled = true; //Bloquea el botón detener
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21){
        console.warn('21, genial');
        btnPedir.disabled = true; //Bloquea el botón pedir
    }
});


btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

//*  #5. Reseteando el juego

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck=[];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora =0;

    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;

    divCartasComputadora.innerHTML = ''
    divCartasJugador.innerHTML = ''

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
});