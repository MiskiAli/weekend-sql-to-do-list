$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced.');
$('#submit').on('click', addToDoListBtn)
$('#listTable').on('click', completedBtn);
}

function addToDoListBtn() {
    console.log('Add To do list button clicked');
    let tasks = {};
    tasks.task = $('#task').val();
    tasks.date = $('#date').val();
    tasks.time = $('#time').val();
    tasks.notes = $('#notes').val();
    
}

// GET REQUEST
function getTask(){
    $.ajax({
        type: 'GET',
        url: '/task',
    }).then(function(response){
        console.log(response);
        renderfunction();
        }).catch(function(errror){
        console.log('Error is in the GET request: ', errror);
    })
}

// POST REQUEST
function addNewTask(tasks){
    $.ajax({
        type: 'POST',
        url: '/task',
        data: tasks
    }).then(function(response){
        console.log('response from the server', response);
        getTask()
    }).catch(function(error){
        console.log('Error is in the POST request', error);
    })
}


// PUT REQUEST
function completedBtn() {
    console.log('complete button clicked');
    const taskId = $(this).data('id');
    const completedBtn = $(this).data('complete');

// PUT ajax request
$.ajax({
    method: 'PUT',
    url: `/task/${taskId}`,
    data: {completed: !completedBtn},
}).then(function(){

    console.log('finished completedBtn');
}).catch(function (error){
alert('Error is in the completedBtn function', error);
});
}

// 

function renderfunction(tasks){
    $('#listTable').empty();
    let compeleteTasks = 'incompleteTasks';
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.completed === true){
            compeleteTasks === 'complete'
        }
        $('#table').append(`
        <tr>
        <td>${tasks.title}</td>
        <td><${tasks.date}/td>
        <td>${tasks.time}</td>
        <td>${tasks.notes}</td>
        <td><${task.completed}/td>
        <td> <button data-id=${tasks[i].id} data-completed = "compelete"
        class ="completedBtn">Task Completed?</button
        </td>
        </tr>
        `)
        compeleteTasks = 'incompleteTasks'; // add return
    }
}