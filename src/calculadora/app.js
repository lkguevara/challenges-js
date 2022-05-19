// traer todos los elementos data-número
const textoValorSuperior = document.querySelector('[data-valor-superior]');
const textoValorInferior = document.querySelector('[data-valor-inferior]');
const borrarTodo = document.querySelector('[data-borrar-todo]');
const borrar = document.querySelector('[data-borrar]');
const numeros = document.querySelectorAll('[data-numero]')
const operadores = document.querySelectorAll('[data-operador]');
const igual = document.querySelector('[data-igual]');

// console.log(igual);

class Calculadora {
    constructor (textoValorInferior,textoValorSuperior){
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined

    }

    // Método para que aparezcan los números en pantalla

    agregarNumero(numero) {
        this.valorInferior = this.valorInferior + numero;
    }

    imprimirDisplay () {
        this.textoValorInferior.innerText = this.valorInferior;
    }

}

const calculadora = new Calculadora  (textoValorInferior, textoValorSuperior  )

numeros.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText);
        calculadora.imprimirDisplay();

      
    })
})




