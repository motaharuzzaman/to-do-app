document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value.trim();

    if (taskText === '') return;

    addTaskToDOM(taskText);

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    textInput.value = '';
}

function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span>
            <span class="edit btn btn-primary" onclick="editTask(this)">Edit</span>
            <span class="delete btn btn-danger" onclick="deleteTask(this)">Delete</span>
        </span>
    `;

    ul.appendChild(li);
}

function editTask(element) {
    let li = element.parentElement.parentElement;
    let taskTextSpan = li.querySelector('.task-text');
    let oldText = taskTextSpan.innerText;

    let inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = oldText;
    inputField.classList.add('edit-input');

    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.classList.add('save-btn');
    saveButton.onclick = function () {
        saveTask(li, oldText, inputField.value);
    };

    li.innerHTML = '';
    li.appendChild(inputField);
    li.appendChild(saveButton);
}

function saveTask(li, oldText, newText) {
    newText = newText.trim(); // Trim spaces

    if (newText === '') return; // Prevent saving empty tasks

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let taskIndex = tasks.indexOf(oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    li.innerHTML = `
        <span class="task-text">${newText}</span>
        <span>
            <span class="edit btn btn-primary" onclick="editTask(this)">Edit</span>
            <span class="delete btn btn-danger" onclick="deleteTask(this)">Delete</span>
        </span>
    `;
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove(); // Remove from UI

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
