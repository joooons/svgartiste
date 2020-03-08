// JavaScript for svgartiste.
// Using JavaScript and jQuery.
// I would LIKE to use RegEx, but so far I didn't need it...





// ------------------------------------------------------ //
// -------------------- DECLARATIONS -------------------- //
// ------------------------------------------------------ //


    var pointer = {
        r   : 0,
        c   : 0  };


    var svgStr = {
        main    : "",
        gridX   : "",
        gridY   : "",
        empty   : ""
    };


    var grid = {
        xInc    : 50,
        yInc    : 50,
        xMax    : 500,
        yMax    : 500,
        width   : 0.3,
        color   : '#000f',
        dash    : '2, 2'
    }


    var init = {
        line    : { x1:0,   y1:0,   x2:200,     y2:200,               lw:2,   lc:'#000', ca:'round'  },
        rect    : { x:0,    y:0,    w:100,      h:100,  co:'#fd4',    lw:2,   lc:'#000', ra:5        },
        circle  : { x:0,    y:0,    r:50,               co:'#7fd',    lw:2,   lc:'#000'              }  }
            // co = color / lw = line width / lc = line color / ca = linecap / ra = radius


    var color = {
        shade : '#ADF',
        blank : '#DEF'  }


    var code =  $('#codeSpace');
    var logic = $('#logicSpace');
    var art =   $('#artSpace');














// ------------------------------------------------------ //
// ------------------- MINI-FUNCTIONS ------------------- //
// ------------------------------------------------------ //


function sel(row, col) { return $(`#logicSpace div:nth-child(${row}) input:nth-child(${col})`).val(); }
    // QUICK way to reference the element through row and col.
    // Do I use this anywhere else beside in updateSVG()?


function reNumber() { 
    for ( let i=1 ; i<=$('#logicSpace > div').length ; i++ ) { 
        $(`#logicSpace > div:nth-child(${i}) .id-num`).val(i);
        $(`#logicSpace > div:nth-child(${i})`).attr("id", `ln${i}`);  }  }
















// ------------------------------------------------------ //
// --------------------- FUNCTIONS ---------------------- //
// ------------------------------------------------------ //




function updateGridX() {
    svgStr.gridX = '';
    for ( let i=grid.xInc ; i<grid.xMax ; i+=grid.xInc ) {
        svgStr.gridX += `<line x1='${i}' y1='0' x2='${i}' y2='${grid.yMax}' stroke='${grid.color}' stroke-width='${grid.width}px' stroke-linecap='butt' stroke-dasharray='${grid.dash}' />`;
    }
}   // END of updateGridX()



function updateGridY() {
    svgStr.gridY = '';
    for ( let i=grid.yInc ; i<grid.yMax ; i+=grid.yInc ) {
        svgStr.gridY += `<line x1='0' y1='${i}' x2='${grid.xMax}' y2='${i}' stroke='${grid.color}' stroke-width='${grid.width}px' stroke-linecap='butt' stroke-dasharray='${grid.dash}' />`;
    }
}   //END of updateGridY()



function initiateSVG() {
    
    $('#artSpace').attr( {"width": grid.xMax, "height": grid.yMax } );

    $('#artCtrl').append("<div class='filler' >grid?</div>");
    $('#artCtrl').append("<input type='checkbox' value='wow' />");
    $('#artCtrl').append("<div class='filler' >w </div>");
    $('#artCtrl').append(`<input type='number' value='${grid.xMax}' />`);
    $('#artCtrl').append("<div class='filler' >h </div>");
    $('#artCtrl').append(`<input type='number' value='${grid.yMax}' />`);
    $('#artCtrl').append("<div class='filler' >x </div>");
    $('#artCtrl').append(`<input type='number' value='${grid.xInc}' />`);
    $('#artCtrl').append("<div class='filler' >y </div>");
    $('#artCtrl').append(`<input type='number' value='${grid.yInc}' />`);


    $("#artCtrl input:eq(1)").on('change', function(ev) {
        grid.xMax = parseInt(ev.target.value);
        $('#artSpace').attr( {"width": grid.xMax } );
        if ( $('#artCtrl :checkbox').is(":checked") ) { updateGridX(); updateGridY(); updateTotal();  }
    });

    $("#artCtrl input:eq(2)").on('change', function(ev) { 
        grid.yMax = parseInt(ev.target.value);
        $('#artSpace').attr( {"height": grid.yMax } );
        if ( $('#artCtrl :checkbox').is(":checked") ) { updateGridX(); updateGridY(); updateTotal();  }
    });

    $("#artCtrl input:eq(3)").on('change', function(ev) {
        grid.xInc = parseInt(ev.target.value);
        if ( $('#artCtrl :checkbox').is(":checked") ) { updateGridX(); updateTotal();  }
    });

    $("#artCtrl input:eq(4)").on('change', function(ev) {
        grid.yInc = parseInt(ev.target.value);
        if ( $('#artCtrl :checkbox').is(":checked") ) { updateGridY(); updateTotal();  }
    });

    $('#artCtrl :checkbox').on('click', function() {
        if ( $('#artCtrl :checkbox').is(":checked") ) {
            grid.xInc = parseInt( $("#artCtrl input:eq(3)").val() );
            grid.yInc = parseInt( $("#artCtrl input:eq(4)").val() );
            updateGridX();
            updateGridY();
            updateTotal();
        } else { svgStr.gridX = ''; svgStr.gridY = ''; updateTotal();  }
    });

}   // END of initiateSVG()





function newRow() {
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
        if ( $(this).index() < $(".row").length -1 ) { targetID = ev.target;  code.text(`dragging ${targetID.id}`);
        } else { ev.preventDefault();  console.log('unmovable'); }  });
    $(`.row`).on("dragover", function(ev) { ev.preventDefault();  });
    $(`.row`).on("drop", function(ev) { $(`#${targetID.id}`).insertBefore(ev.target);  reNumber();  updateSVG();  });
    $(`.row >`).on("dragover", function(ev) { ev.stopPropagation(); } );

    $('.tp').on("focus",    function() { $(this).css("background-color", color.shade); });
    $('.tp').on("focusout", function() { $(this).css("background-color", color.blank); });
    $('.tp').on("change",   function() { $(this).attr("disabled", true); populateRow( $(this).val() ); });

}   // END of newRow()









function populateRow(svgType) {
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
            $(elem).append("<button type='button' >+</button>");
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
            $(elem).append("<button type='button' >+</button>");
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
            $(elem).append("<button type='button' >+</button>");
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
            newRow();
        } else {
            $(this).parent().remove();
            reNumber();
            updateSVG();
        }   // END of if


    });     // CLICK

}   // End of populateRow()


















function updateSVG() {
    // Update codeSpace.
    // Update artSpace.

    svgStr.main = '';
    code.text(svgStr.main);

    for ( let i=1 ; i<=$(`#logicSpace > div`).length ; i++ ) {
        
        switch ( $(`#logicSpace div:nth-child(${i}) select:first`).val() ) {

            case "line":
                svgStr.main += `<line x1='${sel(i,6)}' y1='${sel(i,8)}' x2='${sel(i,10)}' y2='${sel(i,12)}' stroke=${sel(i,18)} stroke-width='${sel(i,16)}px' stroke-linecap=${sel(i,20)} />`;    
                break;
            case "rect":
                svgStr.main += `<rect x='${sel(i,6)}' y='${sel(i,8)}' width='${sel(i,10)}' height='${sel(i,12)}' fill=${sel(i,14)} stroke-width=${sel(i,16)} stroke=${sel(i,18)} rx='${sel(i,20)}' />`;
                break;
            case "circle":
                svgStr.main += `<circle cx='${sel(i,6)}' cy='${sel(i,8)}' r='${sel(i,10)}' fill='${sel(i,14)}' stroke-width='${sel(i,16)}' stroke='${sel(i,18)}' />`;
                break;
            default:
                break;
        }   // END of switch
        
    }   // END of for

    updateTotal();

};  // End of updateSVG()



function updateTotal() {
    code.text(svgStr.main);
    art.html(svgStr.main + svgStr.gridX + svgStr.gridY);
}   // END of updateTotal()





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

}   // END of loadEvents()










// ------------------------------------------------------ //
// ------------------ RUNNING THE CODE ------------------ //
// ------------------------------------------------------ //


initiateSVG();
newRow();
loadEvents();



// -------------------- THE END -------------------- //