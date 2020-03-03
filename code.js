// JavaScript for svgartiste.
// Using JavaScript and jQuery.
// I would LIKE to use RegEx, but so far I didn't need it...





// -------------------- DECLARATIONS -------------------- //


    var pointer = {
        max : 0,
        num : 0,
        id  : "does it matter what I set this as? Nope."
        };


    var init = {
        line    : { x1:0,   y1:0,   x2:100,     y2:100,                 lw:2,   lc:'black', ca:'round'  },
        rect    : { x:0,    y:0,    w:100,      h:100,  co:'yellow',    lw:2,   lc:'black', ra:5        },
        circle  : { x:0,    y:0,    r:50,               co:'red',       lw:4,   lc:'black'              }
        }
    


    var code = $('#codeSpace');
    var logic = $('#logicSpace');
    var art = $('#artSpace');






// -------------------- FUNCTIONS -------------------- //

function Initiate() {
    // This function loads a new line, but the SVG type has not been identified yet.
    // The user will have to specify whether this element is a line, rect, or circle.


    logic.append(`<div id="elem${pointer.max}"></div>`);


    $(`#elem${pointer.max}`).append(`<div class='filler'>ID</div><input value='${pointer.max}' type='number' id='id${pointer.max}' disabled/>`);
    $(`#elem${pointer.max}`).append(`<div class='filler'>type</div><input value='what' type='text' id='tp${pointer.max}' />`);


    $(`#tp${pointer.max}`).on("focus", function() { $(this).css("background-color", "#DEF"); });


    $(`#tp${pointer.max}`).on("change", function() {     
        if ( /^line$|^rect$|^circle$/.test( $(this).val() ) ) {
            $(this).attr("disabled", true);
            Populate( $(this).val() );
        }
    });


    $(`#tp${pointer.max}`).on("click", function() {
        // This is for the drop menu.
        // Use this later!!!
        let a = $(this).parent().attr("id");
        alert(a);
        $(`#${a}`).append(`<div position> why </div>  `);
    });


}







function Populate(svgType) {
    // Adds a new line to logicSpace.
    // For now, this can only handle "line" type elements.
    // I will add other types later, types like circles, rectangles, etc..
    // This can only ADD, never subtract.

    function fl(str) { return `<div class='filler'>${str}</div>`; };

    switch (svgType) {
        case "line":
            $(`#elem${pointer.max}`).append(`${fl('x1')}<input value='${init.line.x1}' type='number' id="x1${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('y1')}<input value='${init.line.y1}' type='number' id="y1${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('x2')}<input value='${init.line.x2}' type='number' id="x2${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('y2')}<input value='${init.line.y2}' type='number' id="y2${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('  ')}<input value='' id="du${pointer.max}" class="dummy" disabled/>`);
            $(`#elem${pointer.max}`).append(`${fl('lw')}<input value='${init.line.lw}' type='number' id="lw${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('lc')}<input value='${init.line.lc}' id="lc${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('ca')}<input value='${init.line.ca}' id="ca${pointer.max}" />`);
            $(`#elem${pointer.max}`).append("<button>+</button>");
            updateSVG();
            break;
        case "rect":
            $(`#elem${pointer.max}`).append(`${fl('x ')}<input value='${init.rect.x}' type='number' id="x-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('y ')}<input value='${init.rect.y}' type='number' id="y-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('w ')}<input value='${init.rect.w}' type='number' id="w-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('h ')}<input value='${init.rect.h}' type='number' id="h-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('co')}<input value='${init.rect.co}' id="co${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('lw')}<input value='${init.rect.lw}' type='number' id="lw${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('lc')}<input value='${init.rect.lc}' id="lc${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('ra')}<input value='${init.rect.ra}' type='number' id="ra${pointer.max}" />`);
            $(`#elem${pointer.max}`).append("<button>+</button>");
            updateSVG();
            break;
        case "circle":
            $(`#elem${pointer.max}`).append(`${fl('x ')}<input value='${init.circle.x}' type='number' id="x-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('y ')}<input value='${init.circle.y}' type='number' id="y-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('r ')}<input value='${init.circle.r}' type='number' id="r-${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('  ')}<input value='' id="du${pointer.max}" class='dummy' disabled/>`);
            $(`#elem${pointer.max}`).append(`${fl('co')}<input value='${init.circle.co}' id="co${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('lw')}<input value='${init.circle.lw}' type='number' id="lw${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('lc')}<input value='${init.circle.lc}' id="lc${pointer.max}" />`);
            $(`#elem${pointer.max}`).append(`${fl('  ')}<input value='' id="du-${pointer.max}" class='dummy' disabled/>`);
            $(`#elem${pointer.max}`).append("<button>+</button>");
            updateSVG();
            break;
        default:
            break;
    }


    for ( let i = 6; i <= $(`#elem${pointer.max} > `).length ;  i+=2 ) {

        // alert(`${i} : ${$(`#elem${pointer.max} input:nth-child(${i})`).val()  }`);


        $(`#elem${pointer.max} input:nth-child(${i})`).on("change", function() { updateSVG(); });

        $(`#elem${pointer.max} input:nth-child(${i})`).on("focus", function() { 
            $(this).css("background-color", "#ADF");
            pointer.id = $(this).attr("id");  
            pointer.num = $(this).siblings().eq(1).val();
            // code.text(pointer.num);
        });

        $(`#elem${pointer.max} input:nth-child(${i})`).on("focusout", function() { $(this).css("background-color", "#DEF"); });


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




function PopUp() {
    // For use later, when I make pop-up drop menu

}




function updateSVG() {

    let tempStr = ' ';
    let a = [];

    code.text('');
        // Clear the codeSpace to make room for new string.

    for ( let i=0 ; i<=pointer.max ; i++ ) {
        // Iterating through the number of lines. 
        // The variable 'i' represents the line id.

        // let b = $(`#elem${i} > `).length;

        // for ( let j=3 ; j<b ; j++ ) {
        for ( let j=6 ; j<=$(`#elem${i} > `).length ; j+=2 ) {
            // Iterating through the number of parameters for line 'i'.
            // If the element is a line, then there are four parameters: x1, y1, x2, and y2.
            // So, there are four parameters, iterated through 'j' going from 3 to 6.

            a.push( $(`#elem${i} input:nth-child(${j})`).val() );
        }


        switch ( $(`#elem${i} input:nth-child(4)`).val() ) {
            case "line":
                tempStr += `<line x1='${a[0]}' y1='${a[1]}' x2='${a[2]}' y2='${a[3]}' style="stroke:${a[6]}; stroke-width: ${a[5]}px; stroke-linecap: ${a[7]}; " />`;    
                break;
            case "rect":
                tempStr += `<rect x='${a[0]}' y='${a[1]}' width='${a[2]}' height='${a[3]}' style="fill:${a[4]}; stroke-width:${a[5]} ;stroke:${a[6]}" rx='${a[7]}' />`;
                break;
            case "circle":
                tempStr += `<circle cx='${a[0]}' cy='${a[1]}' r='${a[2]}' fill='${a[4]}' stroke-width='${a[5]}' stroke='${a[6]}' />`;
                break;
            default:
                break;
        }


        a = [];
            // Reset the temporary array EVERYTIME this for loop runs.
        
    }

    
    code.text(tempStr);
    art.html(tempStr);
        // The total string is inserted into codeSpace and artSpace.

};  // End of updateSVG()



function loadEvents() {
    // The function to contain eventlisteners for whatever wasn't covered already.

    art.on("click", function(ev) { $(`#${pointer.id}`).focus(); });

    art.on("click", function(ev) {
        // When the mouse clicks on artSpace, enter the coordinate position into the focused <input>
        

        if ( /^x+/.test(pointer.id) ) { $(`#${pointer.id}`).val(ev.pageX - art.offset().left); }

        if ( /^y+/.test(pointer.id) ) { $(`#${pointer.id}`).val(ev.pageY - art.offset().top); }

        if ( /^w+/.test(pointer.id) ) { $(`#${pointer.id}`).val(ev.pageX - art.offset().left - $(`#x-${pointer.num}`).val() ); }

        if ( /^h+/.test(pointer.id) ) { $(`#${pointer.id}`).val(ev.pageY - art.offset().top - $(`#y-${pointer.num}`).val() ); }

        if ( /^r-/.test(pointer.id) ) {
            let a = Math.abs( ev.pageX - art.offset().left - $(`#x-${pointer.num}`).val() );
            let b = Math.abs( ev.pageY - art.offset().top - $(`#y-${pointer.num}`).val() );
            $(`#${pointer.id}`).val( Math.max(a,b) );
        }


        updateSVG();

    });



}






// -------------------- RUNNING THE CODE -------------------- //


Initiate();
loadEvents();



// -------------------- THE END -------------------- //