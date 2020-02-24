// var socket = io('/');


$('.btn').click(function (e) {
    e.preventDefault()
    alert("Order has been made")
    let foodName = $(this).siblings(".card-title").text()
    console.log("Clicked Order");
    console.log(foodName)
    var roomNum = sessionStorage.getItem('roomNumber');

    if(roomNum == null){
        var promptInput = prompt("What is your room number?")
        sessionStorage.setItem('roomNumber', promptInput)
    }

    $.ajax({url: "/postWhatever", type: "POST", data: {
        name: foodName,
        roomNumber: sessionStorage.getItem('roomNumber')
    }, success: function(result){
        console.log(`I am a result ${JSON.stringify(result.response, undefined, 2)}`);
    }});
  })

