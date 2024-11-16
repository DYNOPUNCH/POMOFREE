
const addTaskFormBlock = $('#task-form-template').html();
const addTaskBlock = $('#task-template').html();

$("#timer").timer({
    countdown: true,
    duration: '25m'
}).timer('pause');


$('#add-new-task-button').on('click', function () {
    $('#overlay-holder').append(addTaskFormBlock);
    $('#form-close').on('click', function () {$('#overlay-holder').empty();})
    $('#add-task').on('click', function () {
        $('#task-list').append(addTaskBlock);
        $('#overlay-holder').empty();
    })
}
);
$('#action-button').on('click', function () {
    $('#timer').timer('resume');
})


//$('#task-list').append('<div class=\"container d-flex justify-content-center bg-primary py-3 mb-3 fw-bold text-light fs-5 rounded \">New Task</div>')