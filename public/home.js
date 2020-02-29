let userRoomNumber = sessionStorage.getItem('roomNumber');

$('#orderButton').click(function(e) {

    e.preventDefault();
    if(userRoomNumber == null){
        var promptInput = prompt("What is your room number?")
        sessionStorage.setItem('roomNumber', promptInput)
    }

    window.location.href = `/order?roomNumber=${sessionStorage.getItem('roomNumber')}`;

    // $.ajax({url: "/order", type: "POST", data: {
    //     userRoomNumber: )
    // }, success: function(result){
    //     console.log(`I am a result ${JSON.stringify(result.response, undefined, 2)}`);
    // }});
})