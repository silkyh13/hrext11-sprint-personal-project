$(document).ready(() => {

  $( '.container-character' ).on( "click", function(event) {
    //if the thing i click on has class character buttons
    if ($(event.target).hasClass("input-button character")) {
      let character = $(event.target).attr('id');//Hello Kitty
        if (JSON.parse(localStorage.getItem(`${character}`)) !==null){
          alert("has key already")
          return
        }
        localStorage.setItem(`${character}`, true);

        let data = [
          ['happiness', 10],
          ['unhappiness', 0]
        ];
        //charlie = data
        //Parse get item Charlie = data
        function render() {
          chart.load({
            columns: JSON.parse(localStorage.getItem(`${character} awaits`))
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

        var resuscitate = function(key, value) {
          data = [
            ['happiness', 10],
            ['unhappiness', 0]
          ];

          localStorage.setItem(`${character} awaits`, JSON.stringify(data));
          data = JSON.parse(localStorage.getItem(`${character} awaits`))
          render();
        }
        $('.resuscitate').click(resuscitate);

        var timeIsTicking = setInterval(function() {
          // data[1][1]  = unhappiness
          var parseData = JSON.parse(localStorage.getItem(`${character} awaits`))
          if (parseData[0][1] > 0) {
            parseData[0][1]--
            parseData[1][1]++
            localStorage.setItem(`${character} awaits`, JSON.stringify(parseData))
            chart.load({
              columns: JSON.parse(localStorage.getItem(`${character} awaits`)),
            });
          }else if (parseData[1][1] ===10){
            clearInterval(timeIsTicking);
            $(".alive").attr("src","Dead.png");
          }

        }, 2000);

    }

  });


});


// var encourage = function(key, value) {
//   var parseData = JSON.parse(localStorage.getItem(`${character} char`));
//   //turn into workable object
//   if (parseData[0][1]> 0 && parseData[0][1]< 10){
//     parseData[0][1]++
//     parseData[1][1]--
//   }
//   localStorage.setItem(`${character} char`, JSON.stringify(parseData));
//   render();

// }
// $('.encourage').click(encourage);


// var discourage= function(key, value) {
//   var parseData = JSON.parse(localStorage.getItem(`${character} char`));
//   //turn into workable object
//   if (parseData[0][1]> 0 && parseData[0][1]< 10){
//     parseData[0][1]--
//     parseData[1][1]++
//   }
//   localStorage.setItem(`${character} char`, JSON.stringify(parseData));
//   render();
// }
// $('.discourage').click(discourage);


// var resurrect = function() {
//   data = [
//     ['happiness', 10],
//     ['unhappiness', 0]
//   ];
//   localStorage.setItem(`${character} char`, JSON.stringify(data));
//   data = JSON.parse(localStorage.getItem(`${character} char`))
//   $(".alive").attr("src", "Alive.png");
//   render();
//   var timeIsTicking = setInterval(function() {
//     var parseData = JSON.parse(localStorage.getItem(`${character} char`))
//     if (parseData[0][1] <= 10 && parseData[0][1] >= 1) {
//       parseData[0][1]--
//       parseData[1][1]++
//       localStorage.setItem(`${character} char`, JSON.stringify(parseData))
//       chart.load({
//         columns: JSON.parse(localStorage.getItem(`${character} char`)),
//       });
//     } else if (parseData[1][1] === 10) {
//       clearInterval(timeIsTicking);
//       $(".alive").attr("src", "Dead.png");
//     }

//   }, 2000);
// }


// $('.resurrect').click(resurrect);