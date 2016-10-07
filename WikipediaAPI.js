$(document).ready(function () {
    var showDiv = $('.showDiv');
    var input = $('input');
    var button = $('button');
    var toSearch = '';
    var APIUrl = 'https://en.wikipedia.org/w/api.php';

    var wikipediaData = function () {
        showDiv.empty();
        $.ajax({                                    //First Call to the API

            url: APIUrl,                    
            dataType: 'jsonp',
            data: {                                 //Parameters being passed to get the required data

                action: 'query',
                format: 'json',
                generator: 'search',
                gsrsearch: toSearch,
                gsrnamespace: 0,
                gsrlimit: 10,
                prop: 'pageimages|pageterms',
                piprop: 'thumbnail',
                pilimit: 'max'
                
            },
            success: function (data) {
                
                var data1 = data.query.pages;       //Stores the json data in data1 which is then being appended to the div as shown below

                $.map(data1, function (page) {
                    
                    if (page.thumbnail)
                    
                    var divElement = "<table class='hoverTable'><tr><a href='http://en.wikipedia.org/wiki/ " + page.title + "'><td><img src="+ page.thumbnail.source +" width='50'/><span class='page-title'><a href='http://en.wikipedia.org/wiki/ " + page.title + "'>" + page.title + "<span></td></tr><tr><td><div class='page-terms'>"+ page.terms.description +"</div></td></tr></table>";
                    showDiv.append(divElement);

                });

            }
        });
    };

    input.keydown(function (event) {
        showDiv.empty();
        setTimeout(function () {
            toSearch = input.val();
            wikipediaData();                        //Runs the function when a key it hit when then makes a call to the API
        }, 30);

    });

    var wikipediaData2 = function () {
        
        $.ajax({                                    //Second call to the API
            
            url: APIUrl,
            dataType: 'jsonp',
            data: {                                 //Parameters being passed to get the required data
                
                action: 'query',
                format: 'json',
                generator: 'search',
                gsrsearch: toSearch,
                gsrnamespace: 0,
                gsrlimit: 15,
                prop: 'extracts|pageimages|pageterms',
                exchars: 400,
                exlimit: 'max',
                explaintext: true,
                exintro: true,
                piprop: 'thumbnail',
                pilimit: 'max',
                pithumbsize: 200

            },
            success: function (data) {
                
                var data2 = data.query.pages;       //Stores the json data in data2 which is then being appended to the div as shown below
                
                $.map(data2, function (page) {
                    
                    var divElement2 = $('<div>');

                    divElement2.append($('<h2>').append($('<a>').attr('href', 'http://en.wikipedia.org/wiki/' + page.title).text(page.title)));

                    if (page.thumbnail) divElement2.append($('<img>').attr('width', 150).attr('src', page.thumbnail.source));

                    divElement2.append($('<p>').text(page.extract));

                    divElement2.append($('<hr>'));

                    showDiv.append(divElement2);

                });
            }
        });
    };

    button.click(function () {
        showDiv.empty();
        toSearch = input.val();
        wikipediaData2();                           //Runs the function when the Search button is clicked which then makes a call to the API
    });

});