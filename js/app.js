const addTaskFormBlock = $('#task-form-template').html();
const addTaskBlock = $('#task-template').html();
const popupBlock = $('#popup-template').html();
const settingsBlock = $('#settings-template').html();

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

$('#settings-button').on('click', function () {
   $('#overlay-holder').html(settingsBlock);
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

// The pomodoro and break events
// This also holds the times for now
// TODO: Make the times editable.
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

// Create a div when clicking on #options-button
$('#options-button').on('click', function (e) {
    // Remove existing popup
    $(".popup").remove();

    // Create a new div
    const newDiv = $(popupBlock);

    // Position the div at the mouse location
    newDiv.css({
        top: e.pageY + "px",
        left: e.pageX + "px"
    });

    // Append the div to the body
    $('body').append(newDiv);

    // Delete task popup is button is clicked.
    // Also delete any and all created tasks.
    $('.delete-tasks-button').on('click', function () {
        $(".popup").remove();
        $(".task").remove();
    })

    // Prevent click event on #options-button from propagating to document
    e.stopPropagation();
});

// Remove the popup when clicking outside of it
$(document).on('click', function (e) {
    // Check if the clicked target is not the .popup or its children
    if (!$(e.target).closest('.popup').length) {
        $(".popup").remove();
    }
});

// Prevent clicks inside the popup from propagating to the document
$(document).on('click', '.popup', function (e) {
    e.stopPropagation();
});

// Remove the div when clicking outside of it
$(document).on('click', '.dynamic-div', function (e) {
    e.stopPropagation(); // Prevent click inside the div from propagating
});

$(document).on('click', function () {
    $(".dynamic-div").remove();
});
