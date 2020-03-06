// JavaScript for svgartiste.
// Using JavaScript and jQuery.
// I would LIKE to use RegEx, but so far I didn't need it...





// ------------------------------------------------------ //
// -------------------- DECLARATIONS -------------------- //
// ------------------------------------------------------ //


    var pointer = {
        r   : 0,            // ROW
        c   : 0             // COLUMN
        // ,l   : 0
        };


    var init = {
        line    : { x1:0,   y1:0,   x2:100,     y2:100,               lw:2,   lc:'#fad', ca:'round'  },
        rect    : { x:0,    y:0,    w:100,      h:100,  co:'#daf',    lw:2,   lc:'#fda', ra:5        },
        circle  : { x:0,    y:0,    r:50,               co:'#adf',    lw:4,   lc:'#afd'              }
        }
            // co = color / lw = line width / lc = line color / ca = linecap / ra = radius


    var color = {
        shade : '#DAF',
        blank : '#DEF'
    }



    var code =  $('#codeSpace');
    var logic = $('#logicSpace');
    var art =   $('#artSpace');









// ------------------------------------------------------ //
// --------------------- FUNCTIONS ---------------------- //
// ------------------------------------------------------ //







function sel(row, col) { return $(`#logicSpace div:nth-child(${row}) input:nth-child(${col})`).val(); }
    // QUICK way to reference the element through row and col.
    // Do I use this anywhere else beside in updateSVG()?


function reNumber() { 
    for ( let i=1 ; i<=$('#logicSpace > div').length ; i++ ) { 
        $(`#logicSpace > div:nth-child(${i}) .id-num`).val(i);
        $(`#logicSpace > div:nth-child(${i})`).attr("id", `ln${i}`);
    }  
}


function Initiate() {
    // This function loads a new line, but the SVG type has not been identified yet.
    // The user will have to specify whether this element is a line, rect, or circle.

    logic.append(`<div class='row' ></div>`);

    function fl(str) { return `<div class='filler'>${str}</div>`; };
    function op(str) { return `<option value='${str}'>${str}</option>`; };
    let max = $('#logicSpace > div').length;
    let elem = $(`#logicSpace > div:last-child`);
    
    elem.attr("draggable", true);
    elem.attr("id", `ln${max}`);

    elem.append(`${fl('ID')}<input value='${max}' type='number' class="id-num" disabled/>`);
    elem.append(`${fl('type')}<select value='none' class='tp' ></select>`);
    $(`#logicSpace > div:last-child > select`).append(`${op('none')}${op('line')}${op('rect')}${op('circle')}`);

    var targetID = '';
    $(`.row`).on("dragstart", function(ev) {
        // ev.stopPropagation();
        if ( $(this).index() < $(".row").length -1 ) {
            targetID = ev.target;
            code.text(`dragging ${targetID.id}`);
        } else {
            ev.preventDefault();
            console.log('unmovable');
        }
    });

    $(`.row`).on("dragover", function(ev) {
        ev.preventDefault();
        // code.text(`${targetID.id} is about to land on... ${ev.target.id}`);
    });

    $(`.row`).on("drop", function(ev) {
        // ev.stopPropagation();
        $(`#${targetID.id}`).insertBefore(ev.target);
        // code.text(`dropped ${targetID.id} before ${ev.target.id}`);
        reNumber();
        updateSVG();
    });

    $(`.row >`).on("dragover", function(ev) { ev.stopPropagation(); } );



    $('.tp').on("focus",    function() { $(this).css("background-color", color.shade); });
    $('.tp').on("focusout", function() { $(this).css("background-color", color.blank); });
    $('.tp').on("change",   function() { $(this).attr("disabled", true); Populate( $(this).val() ); });


}   // END of Initiate()







function Populate(svgType) {
    // Adds a new line to logicSpace.
    // For now, this can only handle "line" type elements.
    // I will add other types later, types like circles, rectangles, etc..
    // This can only ADD, never subtract.

    function fl(str) { return `<div class='filler'>${str}</div>`; };
    
    let elem = `#logicSpace div:last-child`;

    switch (svgType) {
        case "line":
            $(elem).append(`${fl('x1')}<input value='${init.line.x1}' type='number' class='x'               />`);
            $(elem).append(`${fl('y1')}<input value='${init.line.y1}' type='number' class='y'               />`);
            $(elem).append(`${fl('x2')}<input value='${init.line.x2}' type='number' class='x'               />`);
            $(elem).append(`${fl('y2')}<input value='${init.line.y2}' type='number' class='y'               />`);
            $(elem).append(`${fl('  ')}<input value=''                              class="dummy" disabled  />`);
            $(elem).append(`${fl('lw')}<input value='${init.line.lw}' type='number'                         />`);
            $(elem).append(`${fl('lc')}<input value='${init.line.lc}'               class='co'              />`);
            $(elem).append(`${fl('ca')}<input value='${init.line.ca}'                                       />`);
            $(elem).append("<button>+</button>");
            updateSVG();
            break;
        case "rect":
            $(elem).append(`${fl('x ')}<input value='${init.rect.x}' type='number'  class='x'   />`);
            $(elem).append(`${fl('y ')}<input value='${init.rect.y}' type='number'  class='y'   />`);
            $(elem).append(`${fl('w ')}<input value='${init.rect.w}' type='number'  class='w'   />`);
            $(elem).append(`${fl('h ')}<input value='${init.rect.h}' type='number'  class='h'   />`);
            $(elem).append(`${fl('co')}<input value='${init.rect.co}'               class='co'  />`);
            $(elem).append(`${fl('lw')}<input value='${init.rect.lw}' type='number'             />`);
            $(elem).append(`${fl('lc')}<input value='${init.rect.lc}'               class='co'  />`);
            $(elem).append(`${fl('ra')}<input value='${init.rect.ra}' type='number'             />`);
            $(elem).append("<button>+</button>");
            updateSVG();
            break;
        case "circle":
            $(elem).append(`${fl('x ')}<input value='${init.circle.x}' type='number'    class='x'               />`);
            $(elem).append(`${fl('y ')}<input value='${init.circle.y}' type='number'    class='y'               />`);
            $(elem).append(`${fl('r ')}<input value='${init.circle.r}' type='number'    class='r'               />`);
            $(elem).append(`${fl('  ')}<input value=''                                  class='dummy' disabled  />`);
            $(elem).append(`${fl('co')}<input value='${init.circle.co}'                 class='co'              />`);
            $(elem).append(`${fl('lw')}<input value='${init.circle.lw}' type='number'                           />`);
            $(elem).append(`${fl('lc')}<input value='${init.circle.lc}'                 class='co'              />`);
            $(elem).append(`${fl('  ')}<input value=''                                  class='dummy' disabled  />`);
            $(elem).append("<button>+</button>");
            updateSVG();
            break;
        default:
            break;
    }   // END of switch
    
    $(`${elem} input`).on("change", function() { updateSVG(); });

    $(`${elem} input`).on("focus", function() { 
        $(this).css("background-color", color.shade);
        pointer.c = $(this).index() + 1;
        pointer.r = $(this).parent().index() + 1;
    });

    $(`${elem} input`).on("focusout", function() { $(this).css("background-color", color.blank); });

    $(`.co`).on("change", function() {

        let a = $(this).val();
        if ( /[a-f|0-9|A-F]{3}/.test(a) ) {
            a = a.match(/([a-f|0-9|A-F]{3})/)[1];
            $(this).val(`#${a}`);
        }
        updateSVG();
    });     // CHANGE


    $(`${elem} button`).on("click", function() {
        // This BUTTON is for creating a new row AND deleting an existing row.
        if ( $(this).text() == '+' ) {
            $(this).text('x');
            Initiate();
        } else {
            $(this).parent().remove();
            reNumber();
            updateSVG();
        }   // END of if


    });     // CLICK

}   // End of Populate()











function unPopulate() {


}




function PopUp() {
    // For use later, when I make pop-up drop menu


}








function updateSVG() {
    // Update codeSpace.
    // Update artSpace.

    let str = '';
    code.text(str);         // Clear the codeSpace to make room for new string.

    for ( let i=1 ; i<=$(`#logicSpace > div`).length ; i++ ) {
        
        switch ( $(`#logicSpace div:nth-child(${i}) select:first`).val() ) {

            case "line":
                str += `<line x1='${sel(i,6)}' y1='${sel(i,8)}' x2='${sel(i,10)}' y2='${sel(i,12)}' style="stroke:${sel(i,18)}; stroke-width: ${sel(i,16)}px; stroke-linecap: ${sel(i,20)}; " />`;    
                break;
            case "rect":
                str += `<rect x='${sel(i,6)}' y='${sel(i,8)}' width='${sel(i,10)}' height='${sel(i,12)}' style="fill:${sel(i,14)}; stroke-width:${sel(i,16)} ;stroke:${sel(i,18)}" rx='${sel(i,20)}' />`;
                break;
            case "circle":
                str += `<circle cx='${sel(i,6)}' cy='${sel(i,8)}' r='${sel(i,10)}' fill='${sel(i,14)}' stroke-width='${sel(i,16)}' stroke='${sel(i,18)}' />`;
                break;
            default:
                break;
        }   // END of switch
        
    }   // END of for

    code.text(str);
    art.html(str);

};  // End of updateSVG()







function loadEvents() {
    // The function to contain eventlisteners for whatever wasn't covered already.

    art.on("click", function(ev) {

        let elem = $(`#logicSpace div:nth-child(${pointer.r}) input:nth-child(${pointer.c})`);
        elem.focus();

        if ( elem.hasClass('x') ) { elem.val(ev.pageX - art.offset().left); }
        if ( elem.hasClass('y') ) { elem.val(ev.pageY - art.offset().top); }
        if ( elem.hasClass('w') ) { elem.val(ev.pageX - art.offset().left - $(`#logicSpace div:nth-child(${pointer.r}) .x`).val() ); }
        if ( elem.hasClass('h') ) { elem.val(ev.pageY - art.offset().top - $(`#logicSpace div:nth-child(${pointer.r}) .y`).val() ); }
        if ( elem.hasClass('r') ) {
            let a = Math.abs( ev.pageX - art.offset().left - $(`#logicSpace div:nth-child(${pointer.r}) .x`).val() );
            let b = Math.abs( ev.pageY - art.offset().top - $(`#logicSpace div:nth-child(${pointer.r}) .y`).val() );
            elem.val( Math.max(a,b) );
        }

        updateSVG();

    });

}






function fillOtherSpace() {
    
    var targetID = '';
    var other = $('#otherSpace');

    other.append("<div id='a01' class='unselectable' >1 </div>");
    other.append("<div id='a02' class='unselectable' >22 </div>");
    other.append("<div id='a03' class='unselectable' >333 </div>");
    other.children().css({ "background-color":"gray", "margin":"5px 5px 5px 5px", "width":"100px", "font-size":"20pt", "color":"yellow", "text-align":"center"   });
    other.children().attr( "draggable", true );

    let otherKids = $(`#otherSpace > `);

    otherKids.on("dragstart", function(ev) { targetID = ev.target.id;  });
    otherKids.on("dragover", function(ev) { ev.preventDefault();  });
    otherKids.on("drop", function(ev) { $(`#${targetID}`).insertBefore(ev.target);  });

}   //END of fillOtherSpace




// ------------------------------------------------------ //
// ------------------ RUNNING THE CODE ------------------ //
// ------------------------------------------------------ //

Initiate();
loadEvents();

// fillOtherSpace();
    // This function is just a test.





// -------------------- THE END -------------------- //