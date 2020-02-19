// JavaScript for svgartiste.
// Using JavaScript and jQuery.
// I would LIKE to use RegEx, but so far I didn't need it...





// -------------------- DECLARATIONS -------------------- //


    var svgType = "what";
        // This determines what SVG element to load.


    // A list of "id" names
        // "elem#" for the whole line
        // "type-#" for type of element
        // "stroke-#" for stroke
        // "stroke-linecap-#"
        // "x1-#"
        // "y1-#"
        // "x2-#"
        // "y2-#"
        // "x-#"
        // "y-#"
        // "rx-#"
        // "ry-#"
        // "width-#"
        // "height-#"
        // "cx-#"
        // "cy-#"
        // "r-#"

    var pointer = {
        max : 0,
        num : 0,
        id  : ""
        };


    var startingCoord = [200, 200, 300, 300];
        // Starting coordinate of the line, at center of the SVG board.
        // The elements are x1, y1, x2, and y2.
        // This name can be long because I don't have to use it a lot.
        // DO I REALLY NEED THIS???

    var init = {
        line : { x1:0, y1:0, x2:400, y2:400, stroke:"black" },
        rect : { x:200, y:200, width:20, height:20 }
        }

    



    var code = $('#codeSpace');
    var logic = $('#logicSpace');
    var art = $('#artSpace');
        // Cuz I'm lazy.






// -------------------- FUNCTIONS -------------------- //

function Initiate() {
    // This function loads a new line, but the SVG type has not been identified yet.
    // The user will have to specify whether this element is a line, rect, or circle.


    logic.append(`<div id="elem${pointer.max}"></div>`);

    $(`#elem${pointer.max}`).append(` ID`);
    $(`#elem${pointer.max}`).append(`<div>${pointer.max}</div>`);
    $(`#elem${pointer.max}`).append(`type`);
    $(`#elem${pointer.max}`).append(`<input value='what' type='text' id='type-${pointer.max}' />`);
    
    $(`#type-${pointer.max}`).on("change", function() { 
        
        if ( /^line$|^rect$/.test( $(this).val() ) ) {
            $(this).attr("disabled", true);
            Populate( $(this).val() );
        }



    });



}







function Populate(svgType) {
    // Adds a new line to logicSpace.
    // For now, this can only handle "line" type elements.
    // I will add other types later, types like circles, rectangles, etc..
    // This can only ADD, never subtract.

    // var hello = svgType;

    switch (svgType) {
        case "line":
            $(`#elem${pointer.max}`).append(`x1`);
            $(`#elem${pointer.max}`).append(`<input value='${init.line.x1}' type='number' id="x1-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`y1`);
            $(`#elem${pointer.max}`).append(`<input value='${init.line.y1}' type='number' id="y1-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`x2`);
            $(`#elem${pointer.max}`).append(`<input value='${init.line.x2}' type='number' id="x2-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`y2`);
            $(`#elem${pointer.max}`).append(`<input value='${init.line.y2}' type='number' id="y2-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`st`);
            $(`#elem${pointer.max}`).append(`<input value='${init.line.stroke}' id="stroke-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append("<button>+</button>");
            updateSVG();
            break;
        case "rect":
            $(`#elem${pointer.max}`).append(`x `);
            $(`#elem${pointer.max}`).append(`<input value='${init.rect.x}' type='number' id="x-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`y `);
            $(`#elem${pointer.max}`).append(`<input value='${init.rect.y}' type='number' id="y-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`w `);
            $(`#elem${pointer.max}`).append(`<input value='${init.rect.width}' type='number' id="w-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`h `);
            $(`#elem${pointer.max}`).append(`<input value='${init.rect.height}' type='number' id="h-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append("<button>+</button>");
            updateSVG();
            break;
        default:
            break;
    }


    for ( let i = 3; i < $(`#elem${pointer.max} > `).length ;  i++ ) {

        $(`#elem${pointer.max} input:nth-child(${i})`).on("change", function() { 
            updateSVG(); });

        $(`#elem${pointer.max} input:nth-child(${i})`).on("focus", function() { 
            $(this).css("background-color", "#47F");
            pointer.id = $(this).attr("id");  

            // pointer.num = pointer.id.match(/-(\d+)/)[1];
                // THIS WORKS TOO!!!! I LIKE THIS BECAUSE IT USES REGEX.
            // code.text(pointer.num);

            pointer.num = $(this).siblings().eq(0).text();
            code.text(pointer.num);

            });

        $(`#elem${pointer.max} input:nth-child(${i})`).on("focusout", function() { 
            $(this).css("background-color", "#DDD");  });

    }   // End of for



    $(`#elem${pointer.max} button`).on("click", function() {
        // When the PLUS button is clicked...
        // (1) Hide the old button.
        // (2) Create a new <div> for the next line.

        // $(this).hide();
        if ( $(this).text() == '+' ) {
            $(this).text('-');
            pointer.max++;
            Initiate();
        }

    });


}   // End of Populate()






function updateSVG() {

    let tempStr = ' ';
    let a = [];

    code.text('');
        // Clear the codeSpace to make room for new string.

    for ( let i=0 ; i<=pointer.max ; i++ ) {
        // Iterating through the number of lines. 
        // The variable 'i' represents the line id.

        let b = $(`#elem${i} > `).length;

        // for ( let j=3 ; j<b ; j++ ) {
        for ( let j=3 ; j<$(`#elem${i} > `).length ; j++ ) {
            // Iterating through the number of parameters for line 'i'.
            // If the element is a line, then there are four parameters: x1, y1, x2, and y2.
            // So, there are four parameters, iterated through 'j' going from 3 to 6.
            a.push( $(`#elem${i} input:nth-child(${j})`).val() );
        }


        switch ( $(`#elem${i} input:nth-child(2)`).val() ) {
        // switch (b) {
            case "line":
                // tempStr += `<line x1='${a[0]}' y1='${a[1]}' x2='${a[2]}' y2='${a[3]}' style="stroke:#000; stroke-width: 2px;" />`;    
                tempStr += `<line x1='${a[0]}' y1='${a[1]}' x2='${a[2]}' y2='${a[3]}' style="stroke:${a[4]}; stroke-width: 2px;" />`;    
                break;
            case "rect":
                tempStr += `<rect x='${a[0]}' y='${a[1]}' width='${a[2]}' height='${a[3]}' style="stroke:#000; stroke-width: 2px;" />`;
                break;
            default:
                break;
        }






        a = [];
            // Reset the temporary array EVERYTIME this for loop runs.
        
    }

    
    code.text(tempStr);
        // The total string is inserted into the codeSpace.
    
    art.html(tempStr);
        // The total string is inserted into the artSpace.

};  // End of updateSVG()



function loadEvents() {
    // The function to contain eventlisteners for whatever wasn't covered already.


    art.on("mousemove", function(ev) {
        // When the mouse is over artSpace, display the coordinates in codeSpace

        let a = ev.pageX - art.offset().left;
        let b = ev.pageY - art.offset().top;
        code.html(`x:${a}   y:${b} `);

    });


    art.on("click", function(ev) {
        // When the mouse clicks on artSpace, enter the coordinate position into the focused <input>
        
        

        if ( /^x+/.test(pointer.id) ) {
            $(`#${pointer.id}`).val(ev.pageX - art.offset().left);
        }

        if ( /^y+/.test(pointer.id) ) {
            $(`#${pointer.id}`).val(ev.pageY - art.offset().top);
        }

        if ( /^w+/.test(pointer.id) ) {
            $(`#${pointer.id}`).val(ev.pageX - art.offset().left - $(`#x-${pointer.num}`).val() );
        }

        if ( /^h+/.test(pointer.id) ) {
            $(`#${pointer.id}`).val(ev.pageY - art.offset().top - $(`#y-${pointer.num}`).val() );
        }


        updateSVG();

    });

    



}






// -------------------- RUNNING THE CODE -------------------- //


// Populate();
Initiate();
loadEvents();



// -------------------- THE END -------------------- //