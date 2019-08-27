$(document).ready(() => {
  let character;
  let obj ={
    Charlie : { "alive": "Alive.png", "dead": "Dead.png"},
    HelloKitty : { "alive": "HelloKittyAlive.png", "dead": "HelloKittyDead.png"},
    Pikachu : {"alive": "AlivePikachu.png", "dead": "DeadPikachu.png"}
  };
  // clicker function for characters
  $( '.container-character' ).on( "click", function(event) {
    //if the thing i click on has class character buttons
    if ($(event.target).hasClass("input-button character")) {
      character = $(event.target).attr('id');//Hello Kitty

        $(".alive").attr("src",obj[character].alive);

        // chart generator
        let data = [
          ['happiness', 10],
          ['unhappiness', 0]
        ];

        function render() {
          chart.load({
            columns: JSON.parse(localStorage.getItem(character))
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

        // bring it back to 10 happiness
        let resuscitate = function(key, value) {
          data = [
            ['happiness', 10],
            ['unhappiness', 0]
          ];
          localStorage.setItem(character, JSON.stringify(data));
          data = JSON.parse(localStorage.getItem(character))
          render();
        }
        $('.resuscitate').click(resuscitate);
        //countdown for chart
        let timeIsTicking = setInterval(function() {
          // data[1][1]  = unhappiness
          let parseData = JSON.parse(localStorage.getItem(character))
          if (parseData[0][1] > 0) {
            // console.log(obj[character].alive)
            parseData[0][1]--
            parseData[1][1]++
            localStorage.setItem(character, JSON.stringify(parseData))
            chart.load({
              columns: JSON.parse(localStorage.getItem(character)),
            });
          }else if (parseData[1][1] ===10){
            clearInterval(timeIsTicking);
            $(".alive").attr("src", obj[character].dead);
          }

        }, 2000);
        // clearInterval(timeIsTicking)

        let encourage = function(key, value) {
          let parseData = JSON.parse(localStorage.getItem(character));
          //turn into workable object
          if (parseData[0][1]> 0 && parseData[0][1]< 10){
            parseData[0][1]++
            parseData[1][1]--
          }
          localStorage.setItem(character, JSON.stringify(parseData));
          render();

        }
        $('.encourage').click(encourage);


        let discourage= function(key, value) {
          let parseData = JSON.parse(localStorage.getItem(character));
          //turn into workable object
          if (parseData[0][1]> 0 && parseData[0][1]< 10){
            parseData[0][1]--
            parseData[1][1]++
          }
          localStorage.setItem(character, JSON.stringify(parseData));
          render();
        }
        $('.discourage').click(discourage);


        let resurrect = function() {
          data = [
            ['happiness', 10],
            ['unhappiness', 0]
          ];
          localStorage.setItem(character, JSON.stringify(data));
          data = JSON.parse(localStorage.getItem(character))
          render();
          var timeIsTicking = setInterval(function() {
            var parseData = JSON.parse(localStorage.getItem(character))
            if (parseData[0][1] <= 10 && parseData[0][1] >= 1) {
              $(".alive").attr("src",obj[character].alive);
              parseData[0][1]--
              parseData[1][1]++
              localStorage.setItem(character, JSON.stringify(parseData))
              chart.load({
                columns: JSON.parse(localStorage.getItem(character)),
              });
            } else if (parseData[1][1] === 10) {
              clearInterval(timeIsTicking);
              $(".alive").attr("src", obj[character].dead);
            }
          }, 2000);
        }
        $('.resurrect').click(resurrect);

    }

  });


});


 // $( '.container-character' ).on( "click", function(event) {
  //   //if the thing i click on has class character buttons
  //   if ($(event.target).hasClass("input-button character")) {
  //     // console.log()
  //     // localStorage.clear();
  //     character = $(event.target).attr('id');//Hello Kitty
  //     console.log(character)
  //     let obj ={
  //       Charlie : { "alive": "Alive.png", "dead": "Dead.png"},
  //       HelloKitty : { "alive": "HelloKittyAlive.png", "dead": "HelloKittyDead.png"},
  //       Pikachu : {"alive": "AlivePikachu.png", "dead": "DeadPikachu.png"}
  //     };
  //       $(".alive").attr("src",obj[character].dead);

  //       let data = [
  //         ['happiness', 10],
  //         ['unhappiness', 0]
  //       ];
  //       localStorage.setItem(character, JSON.stringify(data));
  //       function render() {
  //         chart.load({
  //           columns: JSON.parse(localStorage.getItem(character))
  //         });
  //       }
  //       let chart = c3.generate({
  //         bindto: '#chart',
  //         data: {
  //             columns: data,
  //             type : 'pie',
  //             colors: {
  //               happiness:'#FBB13C',
  //               unhappiness: '#287E9D'
  //           },
  //         },
  //         pie: {
  //           label: {
  //             format: function (value, ratio, id) {
  //                 return value;
  //             }
  //         }
  //         }
  //       });
  //       let resuscitate = function(key, value) {
  //         // localStorage.clear();
  //         data = [
  //           ['happiness', 10],
  //           ['unhappiness', 0]
  //         ];
  //         if (JSON.parse(localStorage.getItem(character)) && JSON.parse(localStorage.getItem(character))[0][1] === 0) {
  //           return;
  //         }
  //         localStorage.setItem(character, JSON.stringify(data));
  //         // console.log(character)
  //         data = JSON.parse(localStorage.getItem(character))
  //         // console.log(data)
  //         render();
  //       }
  //       $('.resuscitate').click(resuscitate);
  //       let timeIsTicking = setInterval(function() {
  //         // console.log(character)
  //         // data[1][1]  = unhappiness
  //         let parseData = JSON.parse(localStorage.getItem(character))
  //         // console.log(character)
  //         // console.log(parseData)
  //         if (parseData && parseData[0][1] > 0) {
  //           $(".alive").attr("src",obj[character].alive);
  //           parseData[0][1]--;
  //           parseData[1][1]++;
  //           localStorage.setItem(character, JSON.stringify(parseData))
  //           render();
  //         }else if (parseData[1][1] ===10){
  //           clearInterval(timeIsTicking);
  //           $(".alive").attr("src", obj[character].dead);
  //         }
  //       }, 2000);
  //       let encourage = function(key, value) {
  //         let parseData = JSON.parse(localStorage.getItem(character));
  //         //turn into workable object
  //         if (parseData[0][1]> 0 && parseData[0][1]< 10){
  //           parseData[0][1]++;
  //           parseData[1][1]--;
  //         }
  //         localStorage.setItem(character, JSON.stringify(parseData));
  //         // data = JSON.parse(localStorage.getItem(character))
  //         render();
  //       };
  //       $('.encourage').click(encourage);
        // let discourage= function(key, value) {
        //   // console.log(character)
        //   let parseData = JSON.parse(localStorage.getItem(character));
        //   //turn into workable object
        //   if (parseData[0][1]> 0 && parseData[0][1]< 10){
        //     parseData[0][1]--;
        //     parseData[1][1]++;
        //   }
        //   localStorage.setItem(character, JSON.stringify(parseData));
        //   render();
        // }
        // $('.discourage').click(discourage);
  //   }
  // });
// let reset= function(key, value) {
//   localStorage.clear();

// }
// $('.reset').click(reset);

// let resurrect = function() {
//   // localStorage.clear();
//   data = [
//     ['happiness', 10],
//     ['unhappiness', 0]
//   ];
//   localStorage.setItem(character, JSON.stringify(data));
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