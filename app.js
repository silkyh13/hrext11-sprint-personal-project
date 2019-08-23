$(document).ready(() => {
  var data = [
    ['happiness', 10],
    ['unhappiness', 0]
  ];

  function render() {
    chart.load({
      columns: JSON.parse(localStorage.getItem("Charlie"))
    });
  }

  $('.alive').on('mouseenter',function(){
    // e.preventDefault();
    $('.alive').attr('src',"Dead.png")
  }).on('mouseleave', function() {
    $('.alive').attr('src',"Alive.png");
  });


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

  var create = function(key, value) {
    data = [
      ['happiness', 10],
      ['unhappiness', 0]
    ];

    localStorage.setItem("Charlie", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("Charlie"))
    render();
  }
  $('.create').click(create);



  var timeIsTicking = setInterval(function() {
    // data[1][1]  = unhappiness
    var parseData = JSON.parse(localStorage.getItem("Charlie"))
    if (parseData[1][1] !== 10) {
      parseData[0][1]--
      parseData[1][1]++
      localStorage.setItem("Charlie", JSON.stringify(parseData))
      chart.load({
        columns: JSON.parse(localStorage.getItem("Charlie")),
      });
    }else
    clearInterval(timeIsTicking);
  }, 2000);

  var encourage = function(key, value) {
    var parseData = JSON.parse(localStorage.getItem("Charlie"));
    //turn into workable object
    parseData[0][1]++
    parseData[1][1]--
    localStorage.setItem("Charlie", JSON.stringify(parseData));

    render();
  }
  $('.encourage').click(encourage);

  // var get = function(key) {
  //   return window.localStorage.getItem(key);
  // }





  // var remove = function(key) {
  //   return window.localStorage.removeItem(key);
  // }

  // var clear = function() {
  //   return window.localStorage.clear();
  // }

  // var getItemCount = function() {
  //   return window.localStorage.length;
  // }

  // var getKey = function(index) {
  //   return window.localStorage.key(index);
  // }

  // var displayData = function() {
  //   //add up all the happiness and unhappiness and add it to data
  //   //reloads the graph

  // }
  // $(function() {
  //   displayData();

  //   $('.get').click(function() {
  //     var key = $('#key').val();
  //     console.log(get(key));
  //     displayData();
  //   })

  //   $('.create').click(function() {
  //     var key = $('#key').val();
  //     var value = $('#value').val();

  //     if (get(key) !== null) {
  //       alert('key already exists');
  //     } else {
  //       console.log(create(key, value));
  //       displayData();
  //     }
  //   })

  //   $('.update').click(function() {
  //     var key = $('#key').val();
  //     var value = $('#value').val();

  //     if (get(key) === null) {
  //       alert('key does not exist');
  //     } else {
  //       console.log(update(key, value));
  //       displayData();
  //     }
  //   })

  //   $('.delete').click(function() {
  //     var key = $('#key').val();

  //     if (get(key) === null) {
  //       alert('key does not exist');
  //     } else {
  //       console.log(remove(key));
  //       displayData();
  //     }
  //   })

  //   $('.clear').click(function() {
  //     if (getItemCount() === 0) {
  //       alert('nothing to clear');
  //     } else {
  //       console.log(clear());
  //       displayData();
  //     }
  //   })

});
// $(‘.input’).val() 
// JSON.stringify([{},{},{},{},]) 
// JSON.parse(storedValue) 

// .css({"background-color": generateRandomColorValue()})
// works______________
// $('.image-container').on('mouseenter',function(){
//   $("div").animate({height: 'toggle'});
// }).on('mouseleave', function() {
//   $("div").animate({height: 'toggle'});
// });

// $('.alive').on('mouseenter',function(){
//   $("div").animate({height: 'hide'},1000);
// }).on('mouseleave', function() {
//   $("div").animate({height: 'show'},1000);
// });
