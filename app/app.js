$(document).ready(() => {
  let character;
  let chart;
  let characterData;
  let obj ={
    Charlie : { "alive": "pictures/Alive.png", "dead": "pictures/Dead.png"},
    HelloKitty : { "alive": "pictures/HelloKittyAlive.png", "dead": "pictures/HelloKittyDead.png"},
    Pikachu : {"alive": "pictures/AlivePikachu.png", "dead": "pictures/DeadPikachu.png"},
    Dexter : { "alive": "pictures/AliveDexter.png", "dead": "pictures/DeadDexter.png"}
  };
  // clicker function for characters
  $( '.container-character' ).on( "click", function(event) {
    //if the thing I click on has clas input-button character
    if ($(event.target).hasClass("input-button character")) {
      character = $(event.target).attr('id');//Hello Kitty
      characterData = JSON.parse(localStorage.getItem(character));//happiness/ unhappiness data of the character
      //if the character's data is defined and its happiness is 0
      if (characterData && characterData[0][1] === 0 ){
        // show picture of dead character
        $(".alive").attr("src",obj[character].dead);
      }else {
        //show picture of alive character
        $(".alive").attr("src",obj[character].alive);
      }
        // data for chart generator
        let data = [
          ['happiness', 10],
          ['unhappiness', 0]
        ];
        //chart for each character
        chart = c3.generate({
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
    }
    //setting the chart to change
    let timeIsTicking = setInterval(function() {
      // data[1][1]  = unhappiness
      let parseData = JSON.parse(localStorage.getItem(character))
      if (parseData[0][1] > 0) {
        // console.log("Timeis", character)
        parseData[0][1]--
        parseData[1][1]++
        localStorage.setItem(character, JSON.stringify(parseData))
        chart.load({
          columns: JSON.parse(localStorage.getItem(character)),
        });
      }else if (parseData[1][1] ===10){
        $(".alive").attr("src", obj[character].dead);
        clearInterval(timeIsTicking);
      }

    }, 2000);
    //clicker function ends next line
  });

  //render function reloads the chart each time there is a change in data
  function render() {
    chart.load({
      columns: JSON.parse(localStorage.getItem(character))
    });
  };
//resuscitate brings the character's happiness to full happiness if it is alive
  let resuscitate = function(key, value) {
    data = JSON.parse(localStorage.getItem(character));
    if (data && data[0][1] === 0) {
      return;
    }
    data = [
      ['happiness', 10],
      ['unhappiness', 0]
    ];
    localStorage.setItem(character, JSON.stringify(data));
    data = JSON.parse(localStorage.getItem(character));
    $(".BTS").fadeIn(200).fadeOut(1000);
    render();
  }
  $('.resuscitate').click(resuscitate);

  //encourage function increases happiness by 1 but it never goes beyond 10 and if its dead, then... welp
  let encourage = function(key, value) {
    let parseData = JSON.parse(localStorage.getItem(character));
    //turn into workable object
    if (parseData[0][1]> 0 && parseData[0][1]< 10){
      parseData[0][1]++;
      parseData[1][1]--;
    }
    localStorage.setItem(character, JSON.stringify(parseData));
    render();
  }
  $('.encourage').click(encourage);

//discourage function decreases happiness by 1 but it never goes beyond 0
  let discourage= function(key, value) {
    let parseData = JSON.parse(localStorage.getItem(character));
    //turn into workable object
    if (parseData[0][1]> 0 && parseData[0][1]< 10){
      parseData[0][1]--;
      parseData[1][1]++;
    }
    localStorage.setItem(character, JSON.stringify(parseData));
    render();
  }
  $('.discourage').click(discourage);

//when the character is dead, resurrect function brings it to life
  let resurrect = function() {
    if (JSON.parse(localStorage.getItem(character)) && JSON.parse(localStorage.getItem(character))[0][1] > 0) {
      return;
    }
    data = [
      ['happiness', 10],
      ['unhappiness', 0]
    ];
    localStorage.setItem(character, JSON.stringify(data));
    data = JSON.parse(localStorage.getItem(character));
    render();
    $(".reaper").fadeIn(400).fadeOut(1000);
    var timeIsTicking = setInterval(function() {
      var parseData = JSON.parse(localStorage.getItem(character))
      if (parseData[0][1] <= 10 && parseData[0][1] >= 1) {
        $(".alive").attr("src",obj[character].alive);
        parseData[0][1]--;
        parseData[1][1]++;
        localStorage.setItem(character, JSON.stringify(parseData))
        chart.load({
          columns: JSON.parse(localStorage.getItem(character)),
        });
      } else if (parseData[1][1] === 10) {
        $(".alive").attr("src", obj[character].dead);
        clearInterval(timeIsTicking);
      }
    }, 2000);
  }
  $('.resurrect').click(resurrect);

});

