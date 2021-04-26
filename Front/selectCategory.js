$(function () {

    $(".dropdown-menu li a").click(function () {

        $(".mainText:first-child").text($(this).text());
        $(".mainText:first-child").val($(this).text());
    

        // change images after category selection
        var index;
        var list = document.getElementsByClassName("book-item");
        x = document.getElementsByClassName("mainText")[0];
        if (x.textContent == "Drama") {
            for (index = 0; index < list.length; ++index) {
                list[index].style.backgroundImage = 'url(images/book1.jpg)';
            }
        }else if (x.textContent == "Fantasy") {
            for (index = 0; index < list.length; ++index) {
                list[index].style.backgroundImage = 'url(images/book2.jpg)';
            }
        }else if (x.textContent == "Thriller") {
            for (index = 0; index < list.length; ++index) {
                list[index].style.backgroundImage = 'url(images/book3.jpg)';
            }
        }else{
            for (index = 0; index < list.length; ++index) {
                list[index].style.backgroundImage = 'url(images/book4.jpg)';
            }
        }
    });

});

$(function () {

    $(".category-title h2").click(function () {

        $(".mainText:first-child").text($(this).text());
        $(".mainText:first-child").val($(this).text());
    
    });
});