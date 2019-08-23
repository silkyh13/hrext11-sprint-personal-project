$(document).ready(() => {

  $('.alive').on('mouseenter',function(){
    // e.preventDefault();
    $('.alive').attr('src',"Dead.png")
  }).on('mouseleave', function() {
    $('.alive').attr('src',"Alive.png");
  });

  // var data = [
  //   ['happiness', 8],
  //   ['unhappiness', 3]
  // ];

  // var chart = c3.generate({
  //   data: {
  //       columns: data,
  //       type : 'pie',
  //       onclick: function (d, i) { console.log("onclick", d, i); },
  //       onmouseover: function (d, i) { console.log("onmouseover", d, i); },
  //       onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  //   },
  //   pie: {
  //     label: {
  //       format: function (value, ratio, id) {
  //           return value + ' hours';
  //       }
  //   }
  //   }
  // });

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
