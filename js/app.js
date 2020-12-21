var tasks = [];
recoveryTasks();
const addTaskButton = document.querySelector('.add-task');

document.querySelector('.input-text-task').addEventListener('keyup', (event) => {
  
  if (event.target.value.length === 0) {
    addTaskButton.setAttribute('disabled', true);
  } else {
    addTaskButton.removeAttribute('disabled');
  }
})

document.querySelector('.add-task').addEventListener('click', () => {
  const task = document.querySelector('.input-text-task').value;
  tasks.push(task);
  document.querySelector('.input-text-task').value = '';
  addTaskButton.setAttribute('disabled', true);
  displayTasks();
});

/**
 * Muestra todas las tareas luego de que se agrege una nueva
 */
function displayTasks() {
  const containerTasks = document.querySelector('.container-tasks');
  containerTasks.innerHTML = '';

  tasks.forEach((task, id) => {
    containerTasks.innerHTML = containerTasks.innerHTML + `<div class="task"><b>${id + 1}</b> - ${task} ${createDeleteButton(id)} </div>`;
  });

  saveInLocalStorage()
}

/**
 * Crea un boton para eliminar tarea
 * @param {Number} id 
 */
function createDeleteButton(id) {
  return `<button class="danger delete-button" onclick="deleteTask(${id})">✖</button>`
}

/**
 * Elimina una tarea por su ID
 * @param {Number} id 
 */
function deleteTask(id) {
  tasks.splice(id, 1);
  displayTasks();
}

/**
 * Guarda todas las tareas en localstorage
 */
function saveInLocalStorage() {
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Recuperar todas mis tareas 
 */
function recoveryTasks() {
  let localStorageTasks = window.localStorage.getItem('tasks');

  if (localStorageTasks !== null) {
    tasks = JSON.parse(localStorageTasks) || []
    displayTasks();
  }
}