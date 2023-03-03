// const show = document.querySelector(".show"),
//     show2 = document.querySelector(".show-2"),
// bang1 = document.querySelector(".bang-1"),
// bang2 = document.querySelector(".bang-2");




// show.addEventListener('click',()=> {
//     console.log(bang1.classList[4]);
//     if (bang1.classList[4] == "hidden"){
//     bang1.classList.remove("hidden");
//     } else {
//     bang1.classList.add("hidden");
//     }
// })



// show2.addEventListener('click', () => {
//     console.log(bang2.classList[4]);
//     if (bang2.classList[4] == "hidden") {
//         bang2.classList.remove("hidden");
//     } else {
//         bang2.classList.add("hidden");
//     }
// })
document.querySelector("#button-1").addEventListener("click",()=>{
    console.log(document.querySelector("#table-3").classList[3]);
   if(document.querySelector("#table-3").classList.contains("hidden")){
       document.querySelector("#table-3").classList.remove("hidden");
       document.querySelector("#table-2").classList.replace("col-lg-12","col-lg-6");
       document.querySelector("#button-1").innerHTML = "مخفی کردن خدمات انجام شده"
   } else {
       document.querySelector("#table-3").classList.add("hidden");
       document.querySelector("#table-2").classList.replace("col-lg-6", "col-lg-12");
       document.querySelector("#button-1").innerHTML = "مشاهده خدمات انجام شده"
   }
})




    (function ($) {
        // USE STRICT
        "use strict";

       

        $('#time').parent().append('<ul class="list-item" id="newtime" name="time"></ul>');
        $('#time option').each(function () {
            $('#newtime').append('<li value="' + $(this).val() + '">' + $(this).text() + '</li>');
        });
        $('#time').remove();
        $('#newtime').attr('id', 'time');
        $('#time li').first().addClass('init');
        $("#time").on("click", ".init", function () {
            $(this).closest("#time").children('li:not(.init)').toggle();
        });

        $('#food').parent().append('<ul class="list-item" id="newfood" name="food"></ul>');
        $('#food option').each(function () {
            $('#newfood').append('<li value="' + $(this).val() + '">' + $(this).text() + '</li>');
        });
        $('#food').remove();
        $('#newfood').attr('id', 'food');
        $('#food li').first().addClass('init');
        $("#food").on("click", ".init", function () {
            $(this).closest("#food").children('li:not(.init)').toggle();
        });

        var allOptions = $("#time").children('li:not(.init)');
        $("#time").on("click", "li:not(.init)", function () {
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $("#time").children('.init').html($(this).html());
            allOptions.toggle();
        });

        var FoodOptions = $("#food").children('li:not(.init)');
        $("#food").on("click", "li:not(.init)", function () {
            FoodOptions.removeClass('selected');
            $(this).addClass('selected');
            $("#food").children('.init').html($(this).html());
            FoodOptions.toggle();
        });
    })(jQuery);
