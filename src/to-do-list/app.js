// constantes iniciales
const date = document.querySelector('#date'); //fecha
const list = document.querySelector('#task__list'); //lista de tareas
const input = document.querySelector('#input'); // placeholder para agregar la tarea
const submit = document.querySelector('#submit'); // botón para agregar la tarea

const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id= 0;

//* función agregar tarea

const addTask = (task, id, completed, removed) => {

    if (removed) {
        return
    }

    const COMPLETED = completed ? check : uncheck; 
    const LINE = completed ? lineThrough : ''; 

    const elemento= `
                        <li id="element">
                            <i class="far ${COMPLETED}" data="completed" id="${id}"></i>
                            <h2 class="text ${LINE}">${task}</h2>
                            <i class="fa-solid fa-trash-can borrar" data="removed" id="${id}"></i>
                        </li> 
                    `

    list.insertAdjacentHTML("beforeend", elemento);   //element.insertAdjacentHTML(posición, texto); Agrega cada tarea pero de última
}

// * Función tarea realizada 
    function taskCompleted(element) {
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector('.text').classList.toggle(lineThrough);
      
    }


// * Función tarea eliminada 
    function taskRemoved(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
      
    }

   



submit.addEventListener('click', (e)  => {
    e.preventDefault (); // Para evitar que se recargue la página
    const task = input.value; //valor del input
    // task ? addTask(task) : input.value = ''; //aplicando condicional ternario
    
    if (task) {
        addTask(task, id, false, false)
    }
    input.value = ''
    id++
});


//* Finalizar una tarea 

list.addEventListener('click', function(event) {
    
    const element = event.target
    const elementData = element.attributes.data.value;

    // console.log(element)
    // console.log(element.attributes)
    // console.log(element.attributes.data)
    // console.log(element.attributes.data.value)
    if (elementData === 'completed') {
        taskCompleted(element)
    }
    else if (elementData === 'removed')
        taskRemoved(element)
});