$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced.');
    clickHandler();
    getTask();
}

function clickHandler(){
$('#submit').on('click', addToDoListBtn)
$('#listTable').on('click', completedBtn);
$('#listTable').on('click', deletedBtn); 
}
function addToDoListBtn() {
    console.log('Add To do list button clicked');
    let tasks = {};
    tasks.name = $('#task').val();
    tasks.date = $('#date').val();
    tasks.time = $('#time').val();
    tasks.notes = $('#notes').val();
    addNewTask(tasks);
    tasks.name = $('#task').val('');
    tasks.notes = $('#notes').val('');
}
// GET request
function getTask() {
    $.ajax({
    type: 'GET',
    url: '/tasks',
    })
    .then(function (response) {
        console.log(response);
        renderFunction(response); 
    })
    .catch(function (error) {
        console.log('error in GET', error);
});
}

// POST request
function addNewTask(tasks) {
    $.ajax({
    type: 'POST',
    url: '/tasks',
    data: tasks,
    })
    .then(function (response) {
        console.log('response from the server', response);
        getTask();
    })
    .catch(function (error) {
        console.log('Error is in the POST request', error);
        alert('Unable to add task at this time. Please try again later.');
    });
}
// PUT REQUEST
function completedBtn() {
    console.log('complete button clicked');
    const taskId = $(this).data('id');
    $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    }).then(function () {
        getTask();
        console.log('finished completedBtn');
    }).catch(function (error) {
        alert('Error is in the completedBtn function', error);
    });
}

//DELETE request
function deleting() {
    if (confirm('Are you sure you want to delete?') == true) { //fix this later
    return true;
    }
    return false;
}
function deletedBtn() {
    if (deleting()) {
    let taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
        .then(function () {
        console.log('Deleted task!');
        getTask();
        })
        .catch(function (error) {
        alert('error deleting:', error);
        });
    }
}

function renderFunction(tasks) {
    $('#listTable').empty();
    let completedTask = 'not-completed';
    for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];
    if (task.completed === true) {
        completedTask = 'completed';
    }
      // For each task, append a new row
    $('#listTable').append(`
        <tr class='${completedTask}'>
            <td>${task.name}</td>
            <td>${tasks.date}</td>
            <td>${tasks.time}</td>
            <td>${tasks.notes}</td>
            <td>${task.completed}</td>
            <td>
            <button data-id=${tasks[i].id}
            data-completed="completed"
            class="completed-btn">Task Completed ✅</button>
            <button data-id=${tasks[i].id}
            data-delete="delete"
            class="delete-btn">Delete ❌</button>
            </td>
        </tr>
        `);
      // Reset completed task so we don't continuously render the wrong class
    completedTask = 'not-completed';
    }
}