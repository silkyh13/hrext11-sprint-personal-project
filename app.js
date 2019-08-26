$(document).ready(() => {

  $( '.container-character' ).on( "click", function(event) {
    //if the thing i click on has class character buttons
    if ($(event.target).hasClass("input-button character")) {
      let character = $(event.target).attr('id');//Hello Kitty
      let obj ={
        Charlie : { "alive": "Alive.png", "dead": "Dead.png"},
        HelloKitty : { "alive": "HelloKittyAlive.png", "dead": "HelloKittyDead.png"},
        Pikachu : {"alive": "AlivePikachu.png", "dead": "DeadPikachu.png"}
      };
        if (JSON.parse(localStorage.getItem(`${character}`)) !==null){
          // alert("has key already")
          // localStorage.clear();
          return;
        }
        localStorage.clear();
        localStorage.setItem(`${character}`, true);
        $(".alive").attr("src",obj[character].dead);

        let data = [
          ['happiness', 10],
          ['unhappiness', 0]
        ];
        //charlie = data
        //Parse get item Charlie = data
        let hold = `${character} awaits`
        function render() {
          chart.load({
            columns: JSON.parse(localStorage.getItem(hold))
          });
        }

        let chart = c3.generate({
          bindto: '#chart',
          data: {
              columns: data,
              type : 'pie',
              colors: {
                happiness:'#FBB13C',
                unhappiness: '#287E9D'
            },
          },
          pie: {
            label: {
              format: function (value, ratio, id) {
                  return value;
              }
          }
          }
        });

        let resuscitate = function(key, value) {
          // localStorage.clear();
          data = [
            ['happiness', 10],
            ['unhappiness', 0]
          ];
          // console.log(JSON.parse(localStorage.getItem(hold))[0][1] )
          if (JSON.parse(localStorage.getItem(hold)) && JSON.parse(localStorage.getItem(hold))[0][1] === 0) {

            return;
          }
          localStorage.setItem(hold, JSON.stringify(data));
          data = JSON.parse(localStorage.getItem(hold))
          render();
        }
        $('.resuscitate').click(resuscitate);

        let timeIsTicking = setInterval(function() {
          // data[1][1]  = unhappiness
          let parseData = JSON.parse(localStorage.getItem(hold))
          if (parseData[0][1] > 0) {
            $(".alive").attr("src",obj[character].alive);
            parseData[0][1]--
            parseData[1][1]++
            localStorage.setItem(hold, JSON.stringify(parseData))
            chart.load({
              columns: JSON.parse(localStorage.getItem(hold)),
            });
          }else if (parseData[1][1] ===10){
            clearInterval(timeIsTicking);
            $(".alive").attr("src", obj[character].dead);
          }

        }, 2000);

        let encourage = function(key, value) {
          let parseData = JSON.parse(localStorage.getItem(hold));
          //turn into workable object
          if (parseData[0][1]> 0 && parseData[0][1]< 10){
            parseData[0][1]++
            parseData[1][1]--
          }
          localStorage.setItem(hold, JSON.stringify(parseData));
          render();

        }
        $('.encourage').click(encourage);


        let discourage= function(key, value) {
          let parseData = JSON.parse(localStorage.getItem(hold));
          //turn into workable object
          if (parseData[0][1]> 0 && parseData[0][1]< 10){
            parseData[0][1]--
            parseData[1][1]++
          }
          localStorage.setItem(hold, JSON.stringify(parseData));
          render();
        }
        $('.discourage').click(discourage);



        let reset= function(key, value) {
          localStorage.clear();

        }
        $('.reset').click(reset);

    }

  });


});


// let resurrect = function() {
//   // localStorage.clear();
//   data = [
//     ['happiness', 10],
//     ['unhappiness', 0]
//   ];
//   localStorage.setItem(hold, JSON.stringify(data));
//   // data = JSON.parse(localStorage.getItem(hold))
//   render();
//   var timeIsTicking = setInterval(function() {
//     var parseData = JSON.parse(localStorage.getItem(hold))
//     if (parseData[0][1] <= 10 && parseData[0][1] >= 1) {
//       $(".alive").attr("src",obj[character].alive);
//       parseData[0][1]--
//       parseData[1][1]++
//       localStorage.setItem(hold, JSON.stringify(parseData))
//       chart.load({
//         columns: JSON.parse(localStorage.getItem(hold)),
//       });
//     } else if (parseData[1][1] === 10) {
//       clearInterval(timeIsTicking);
//       $(".alive").attr("src", obj[character].dead);
//     }
//   }, 2000);
// }
// $('.resurrect').click(resurrect);