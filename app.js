$(document).ready(() => {
  var data = [
    ['happiness', 10],
    ['unhappiness', 0]
  ];
  //charlie = data
  //Parse get item Charlie = data
  function render() {
    chart.load({
      columns: JSON.parse(localStorage.getItem("Charlie"))
    });
  }

  var chart = c3.generate({
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
    if (JSON.parse(localStorage.getItem("Charlie"))[0][1] === 0) {
      console.log(JSON.parse(localStorage.getItem("Charlie"))[0][1])
      alert("Charlie is dead already.")
      return;
    }
    localStorage.setItem("Charlie", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("Charlie"))
    render();

  }
  $('.resuscitate').click(resuscitate);

  //happiness <=10
  var timeIsTicking = setInterval(function() {
    // data[1][1]  = unhappiness
    var parseData = JSON.parse(localStorage.getItem("Charlie"))
    if (parseData[0][1] > 0) {
      parseData[0][1]--
      parseData[1][1]++
      localStorage.setItem("Charlie", JSON.stringify(parseData))
      chart.load({
        columns: JSON.parse(localStorage.getItem("Charlie")),
      });
    }else if (parseData[1][1] ===10){
      clearInterval(timeIsTicking);
      $(".alive").attr("src","Dead.png");
    }

  }, 2000);

  var encourage = function(key, value) {
    var parseData = JSON.parse(localStorage.getItem("Charlie"));
    //turn into workable object
    if (parseData[0][1]> 0 && parseData[0][1]< 10){
      parseData[0][1]++
      parseData[1][1]--
    }
    localStorage.setItem("Charlie", JSON.stringify(parseData));
    render();

  }
  $('.encourage').click(encourage);


  var discourage= function(key, value) {
    var parseData = JSON.parse(localStorage.getItem("Charlie"));
    //turn into workable object
    if (parseData[0][1]> 0 && parseData[0][1]< 10){
      parseData[0][1]--
      parseData[1][1]++
    }
    localStorage.setItem("Charlie", JSON.stringify(parseData));
    render();
  }
  $('.discourage').click(discourage);


  var resurrect = function() {
    data = [
      ['happiness', 10],
      ['unhappiness', 0]
    ];
    localStorage.setItem("Charlie", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("Charlie"))
    $(".alive").attr("src", "Alive.png");
    render();
    var timeIsTicking = setInterval(function() {
      var parseData = JSON.parse(localStorage.getItem("Charlie"))
      if (parseData[0][1] <= 10 && parseData[0][1] >= 1) {
        parseData[0][1]--
        parseData[1][1]++
        localStorage.setItem("Charlie", JSON.stringify(parseData))
        chart.load({
          columns: JSON.parse(localStorage.getItem("Charlie")),
        });
      } else if (parseData[1][1] === 10) {
        clearInterval(timeIsTicking);
        $(".alive").attr("src", "Dead.png");
      }

    }, 2000);
  }


  $('.resurrect').click(resurrect);

});

