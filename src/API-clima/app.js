// Dirigirme a https://openweathermap.org/ e iniciar sesión
// Obtener una API key https://home.openweathermap.org/api_keys


// definiendo constantes
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

// Función para consultar la API
function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;oclomba
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        // Crear alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);
    }

    // Eliminar alerta después de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }
    , 5000);
}

function consultarAPI(ciudad, pais) {
    const appId = '77d4c687fbded85a9622f9f3663b7b42';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    console.log(url);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHtml() // limpiar html previo
            if(datos.cod === "404"){
                mostrarError('ciudad no encontrada, verifica');
                return
            }
            // imprime la respuesta en el html
            mostrarClima(datos)
        })
}

function mostrarClima(datos) {
    const {main: {temp} } = datos;
    const centigrados = kelvinACentigrados(temp)

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${centigrados} &#8451;`;
    tempActual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-black')
    resultadoDiv.appendChild(tempActual);

    resultado.appendChild(resultadoDiv)
}

const kelvinACentigrados = grados => parseInt(grados - 273.15)

function limpiarHtml() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}
