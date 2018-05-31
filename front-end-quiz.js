//scroll
$('.container').on('click', '.back-to-top', (e) => {
    $('html, body').animate({scrollTop: 0}, 800);
});

// jquery foreach. Easier substitute for loops. Iterates through objects or arrays.
$.each(array_or_object, (index,value) => console.log(index,value))


// document ready shorthand
$( () => { });

// hide child's parent on click
$("#hideFree").on("click", () => $(".coursebox").find(".free").parent().toggle());


// data attribute
$().attr('data-category','Lorem');


// #run a loop backwards
numberArray.forEach(function(value, index, array){
    console.log(array[array.length - index - 1])  
});


// ajax
$.ajax(url).done();
    

// check if jquerty is loaded
typeof jQuery

// smart way to collect form data
$.post('sign_up.php', {
    password:  $('input[name=password]').val(),
});

//   check if visible
if($(element).is(":visible"));

// set timer
setTimeout(()=>{}, 500);


// sort list alphabetically
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);

// disable right click
$(document).bind('contextmenu', function (e) {
    return false;
})

// Changing CSS properties
("div").css("background-color","#008800");
document.querySelector("div").setAttribute("style","background:red")