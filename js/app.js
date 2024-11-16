

$('#add-new-task-button').on('click', function () { $('#task-list').append('<div class=\"container d-flex justify-content-center bg-primary py-3 mb-3 fw-bold text-light fs-5 rounded \">New Task</div>') });
$('#action-button').on('click', function () {
    $('#timer').timer({
        countdown: true,
        duration: '25m',    	// This will start the countdown from 3 mins 40 seconds
        callback: function() {	// This will execute after the duration has elapsed
            console.log('Time up!');
        }
    });
})