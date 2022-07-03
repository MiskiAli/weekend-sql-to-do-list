$(document).ready(onReady);

function onReady() {
    console.log('jQuery sourced.');
$('#submit').on('click', addToDoListBtn)
$('#listTable').on('click', completedBtn);
}

function addToDoListBtn() {
    console.log('Add To do list button clicked');
    let tasks = {};
    tasks.name = $('#tasks').val();
    tasks.date = $('#date').val();
    tasks.time = $('#time').val();
    tasks.notes = $('#notes').val();
    
}


// PUT
function completedBtn() {
    console.log('complete button clicked');
    const taskId = $(this).data('id');
    const completedBtn = $(this).data('complete');

// PUT ajax request
$.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
    data: {completed: !completedBtn},
}).then(function(){

    console.log('finished completedBtn');
}).catch(function (error){
alert('Error in completedBtn:', error);
});
}

// 
