// constantes iniciales
const date = document.querySelector('#date'); //fecha
const list = document.querySelector('#task__list'); //lista de tareas
const input = document.querySelector('#input'); // placeholder para agregar la tarea
const submit = document.querySelector('#submit'); // botón para agregar la tarea

//* 1. función agregar tarea

const addTask = (task) => {
    const element= `
                        <li id="element">
                            <i class="far fa-circle co" data="finish" id="0"></i>
                            <h2 class="text">${task}</h2>
                            <i class="fa-solid fa-trash-can borrar ata="delete" id="0""></i>
                        </li> 
                    `

    list.insertAdjacentHTML("beforeend", element);   //element.insertAdjacentHTML(posición, texto);
}

submit.addEventListener('click', (e)  => {
    e.preventDefault (); // Para evitar que se recargue la página
    const task = input.value; //valor del input
    task ? addTask(task) : input.value = ''; //aplicando condicional ternario
    
    // if (task) {
    //     addTask(task)
    // }
    // input.value = ''
});

