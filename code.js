// JavaScript for svgartiste.
// Using JavaScript and jQuery.
// I would LIKE to use RegEx, but so far I didn't need it...





// -------------------- DECLARATIONS -------------------- //

    var PH = [];
        // What I call "place holder"
        // This name is short in purpose, because I have to use it A LOT.

    var startingCoord = [250, 250, 250, 250];
        // Starting coordinate of the line, at center of the SVG board.
        // The elements are x1, y1, x2, and y2.
        // This name can be long because I don't have to use it a lot.

    var num = 0;
        // The index number of the row I'm working on right now.
    
    var focusedElement = {
        lineIndex: 0,
        inputIndex: 3 };

    var code = $('#codeSpace');
    var logic = $('#logicSpace');
    var art = $('#artSpace');
        // Cuz I'm lazy.






// -------------------- FUNCTIONS -------------------- //

function Populate() {
    // Adds a new line to logicSpace.
    // For now, this can only handle "line" type elements.
    // I will add other types later, types like circles, rectangles, etc..
    // This can only ADD, never subtract.


    PH.push(`gibberishgoobly${PH.length}`);
        // Every time a new line is generated, the PH gets a new array element. 
        // The first element is named "gibberishgoobly1", and the next "gibberishgoobly2", and so on.
        // The "gibberishgoobly" is totally arbitrary.


    logic.append(`<div id="${PH[num]}"></div>`);
    $(`#${PH[num]}`).append(`   ID`);
    $(`#${PH[num]}`).append(`<div>1</div>`);
    $(`#${PH[num]}`).append(`type`);
    $(`#${PH[num]}`).append(`<div>line</div>`);
    $(`#${PH[num]}`).append(`x1`);
    $(`#${PH[num]}`).append(`<input value='${startingCoord[0]}' type='number' id="well" />`);
    $(`#${PH[num]}`).append(`y1`);
    $(`#${PH[num]}`).append(`<input value='${startingCoord[1]}' type='number' id="helloo" />`);
    $(`#${PH[num]}`).append(`x2`);
    $(`#${PH[num]}`).append(`<input value='${startingCoord[2]}' type='number' id="theree" />`);
    $(`#${PH[num]}`).append(`y2`);
    $(`#${PH[num]}`).append(`<input value='${startingCoord[3]}' type='number' id="frendo" />`);
    $(`#${PH[num]}`).append("<button>+</button>");
        // First, add a new <div> to the logicSpace.
        // Then, populate the new <div> with <div>'s and <input>'s.


    for ( let i = 3; i <= 6 ;  i++ ) {
        // Iterating through the <input>'s only.
        // The first <input> is actually the third element in the <div>.
        // That's why the i starts with 3 and ends with 6.

        $(`#${PH[num]} input:nth-child(${i})`).on("change", function() { 
            // When <input> value changes, update the codeSpace and artSpace.

            updateSVG();
        });


        $(`#${PH[num]} input:nth-child(${i})`).on("focus", function() { 
            // When <input> gets focus...
            // (1) color the background.
            // (2) save the parent "id" and the <input> index number.
            // We need this information so that the mouse click can change the value of the correct <input> box.

            $(this).css("background-color", "#47F");

            focusedElement.lineIndex = $(this).parent().attr("id");
            focusedElement.inputIndex = i;

        });



        $(`#${PH[num]} input:nth-child(${i})`).on("focusout", function() { 
            // When the input box loses focus...
            // Change the background color back to normal (#DDD).

            $(this).css("background-color", "#DDD");
            
        });

    }   // End of for



    $(`#${PH[num]} button`).on("click", function() {
        // When the PLUS button is clicked...
        // (1) Hide the old button.
        // (2) Create a new <div> for the next line.

        $(`#${PH[num]} button`).hide();
        num++;
        Populate();
    });


}   // End of Populate()



function updateSVG() {

    let tempStr = ' ';
    let a = [];
        // Temporary array.

    code.text('');
        // Clear the codeSpace to make room for new string.

    for ( let i=0 ; i<=num ; i++ ) {
        // Iterating through the number of lines. 
        // The variable 'i' represents the line id.

        for ( let j=3 ; j<=6 ; j++ ) {
            // Iterating through the number of parameters for line 'i'.
            // If the element is a line, then there are four parameters: x1, y1, x2, and y2.
            // So, there are four parameters, iterated through 'j' going from 3 to 6.

            a.push( $(`#${PH[i]} input:nth-child(${j})`).val() );
        }

        tempStr += `<line x1='${a[0]}' y1='${a[1]}' x2='${a[2]}' y2='${a[3]}' style="stroke:#000; stroke-width: 2px;" />`;

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
        $('#codeSpace').html(`x:${a}   y:${b} `);

    });


    art.on("click", function(ev) {
        // When the mouse clicks on artSpace, enter the coordinate position into the focused <input>
        
        if ( focusedElement.inputIndex % 2 == 1 ) {
            // alert("odd");
            $(`#${focusedElement.lineIndex} input:nth-child(${focusedElement.inputIndex})`).val(ev.pageX - art.offset().left);
        }

        if ( focusedElement.inputIndex % 2 == 0 ) {
            // alert("even");
            $(`#${focusedElement.lineIndex} input:nth-child(${focusedElement.inputIndex})`).val(ev.pageY - art.offset().top  );
        }        

        
        updateSVG();

    });

    



}






// -------------------- RUNNING THE CODE -------------------- //

Populate();
loadEvents();



// -------------------- THE END -------------------- //