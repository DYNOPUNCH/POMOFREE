const addTaskFormBlock = $('#task-form-template').html();
const addTaskBlock = $('#task-template').html();

var time = '25m';
var count = 0;

var _timer = $("#timer").timer({
    countdown: true,
    duration: time
}).timer('pause');

$('#add-new-task-button').on('click', function () {

    // Clear and append the task form block to the overlay holder
    $('#overlay-holder').html(addTaskFormBlock);
});

// Event delegation for form buttons inside the overlay holder
$('#overlay-holder').on('click', '#form-close', function () {
    $('#overlay-holder').empty();
});

$('#overlay-holder').on('click', '#add-task', function () {
    // Get the description from the input field
    var description = $('#taskDescription').val();

    // Exit if the description is blank.
    if(description == "")
        return false;

    // Clone the task template
    var taskBlock = $(addTaskBlock);

    // Insert the description into the task description placeholder
    taskBlock.find('.task-description').text(description); // Using `.text()` to insert the description

    // Append the task block to the task list
    $('#task-list').append(taskBlock);

    // Clear the overlay
    $('#overlay-holder').empty();
});

// Use event delegation for the dynamically added task close button
$('#task-list').on('click', '.task-close', function () {
    $(this).closest('.task').remove();
});

// Initial state.
$('#action-button').data('state', 'paused');

// change the state depending on it's current state
$('#action-button').on('click', function () {
    if ($('#action-button').data('state') === 'running') {
        $('#timer').timer('pause');
        $('#action-button').html("Resume");
        $('#action-button').data('state', 'paused');
        return;
    }
    if ($('#action-button').data('state') === 'paused') {
        $('#timer').timer('resume');
        $('#action-button').html("Pause");
        $('#action-button').data('state', 'running');
        return;
    }
});

$('#pomodoro-button').on('click', function () {
    _timer.timer('remove');
    _timer = $("#timer").timer({
        countdown: true,
        duration: '25m'
    }).timer('pause');
})

$('#short-break-button').on('click', function () {
    _timer.timer('remove');
    _timer = $("#timer").timer({
        countdown: true,
        duration: '15m'
    }).timer('pause');
})

$('#long-break-button').on('click', function () {
    _timer.timer('remove');
    _timer = $("#timer").timer({
        countdown: true,
        duration: '5m'
    }).timer('pause');
})

//$('#task-list').append('<div class=\"container d-flex justify-content-center bg-primary py-3 mb-3 fw-bold text-light fs-5 rounded \">New Task</div>')