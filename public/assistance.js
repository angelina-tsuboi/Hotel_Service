
$('.option').click(function (e) {
    e.preventDefault()
    alert("Service has been called")
    let nameOfService = $(this).text()
    console.log(nameOfService)
    var roomNum = sessionStorage.getItem('roomNumber');

    if(roomNum == null){
        var promptInput = prompt("What is your room number?")
        sessionStorage.setItem('roomNumber', promptInput)
    }

    $.ajax({url: "/serviceCall", type: "POST", data: {
        serviceName: nameOfService,
        roomNumber: sessionStorage.getItem('roomNumber')
    }, success: function(result){
        console.log(`Service result: ${JSON.stringify(result.response, undefined, 2)}`);
    }});
});