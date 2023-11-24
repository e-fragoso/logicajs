const taskArray = [];

function addTask() {
  const titleInput = document.getElementById('taskTitle');
  const descriptionInput = document.getElementById('taskDescription');

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!validateTask(title, description)) {
    alert('Por favor, preencha os campos corretamente.');
    return;
  }

  const task = {
    taskId: generateId(),
    taskTitle: title,
    taskDescription: description
  };

  if (isTitleDuplicated(title)) {
    alert('Já existe uma tarefa com este título.');
    return;
  }

  taskArray.push(task);
  displayTasks();
  titleInput.value = '';
  descriptionInput.value = '';
}

function validateTask(title, description) {
  return title.length >= 4 && description.length >= 20 && !/^\d+$/.test(title);
}

function isTitleDuplicated(title) {
  return taskArray.some(task => task.taskTitle === title);
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  taskArray.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${task.taskTitle}</strong> - ${task.taskDescription} 
                    <button onclick="editTask('${task.taskId}')">Editar</button>
                    <button onclick="removeTask('${task.taskId}')">Remover</button>`;
    taskList.appendChild(li);
  });
}

function editTask(id) {
  const task = taskArray.find(task => task.taskId === id);

  if (!task) {
    alert('Tarefa não encontrada.');
    return;
  }

  const newTitle = prompt('Novo título:', task.taskTitle);
  const newDescription = prompt('Nova descrição:', task.taskDescription);

  if (!validateTask(newTitle, newDescription)) {
    alert('Por favor, preencha os campos corretamente.');
    return;
  }

  if (isTitleDuplicated(newTitle) && newTitle !== task.taskTitle) {
    alert('Já existe uma tarefa com este título.');
    return;
  }

  task.taskTitle = newTitle;
  task.taskDescription = newDescription;
  displayTasks();
}

function removeTask(id) {
  const index = taskArray.findIndex(task => task.taskId === id);

  if (index === -1) {
    alert('Tarefa não encontrada.');
    return;
  }

  taskArray.splice(index, 1);
  displayTasks();
}

displayTasks();