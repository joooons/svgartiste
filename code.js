// JavaScript and jQuery for svgartiste



// -------------------- DECLARATIONS -------------------- //

    var PH = [];
        // What I call "place holder"
        // I need to have more of these in order to create new lines

    var num = 0;
        // The index number of the row I'm working on right now.






// -------------------- FUNCTIONS -------------------- //

function Populate() {
    // This can only ADD, never subtract.

    PH.push(`gibberishgoobly${PH.length}`);
        // The "gibberishgoobly" is totally arbitrary.

    $("#logicSpace").append(`<div id="${PH[num]}"></div>`);
    $(`#${PH[num]}`).append(`   ID`);
    $(`#${PH[num]}`).append(`<div>1</div>`);
    $(`#${PH[num]}`).append(`type`);
    $(`#${PH[num]}`).append(`<div>line</div>`);
    $(`#${PH[num]}`).append(`x1`);
    $(`#${PH[num]}`).append(`<input value='250' />`);
    $(`#${PH[num]}`).append(`y1`);
    $(`#${PH[num]}`).append(`<input value='250' />`);
    $(`#${PH[num]}`).append(`x2`);
    $(`#${PH[num]}`).append(`<input value='250' />`);
    $(`#${PH[num]}`).append(`y2`);
    $(`#${PH[num]}`).append(`<input value='250' />`);
    $(`#${PH[num]}`).append("<button>+</button>");
        // The elements are added to the logicSpace

    $(`#${PH[num]} input:nth-child(3)`).on("change", function() { if (numberCheck()) updateSVG(); });
    $(`#${PH[num]} input:nth-child(4)`).on("change", function() { if (numberCheck()) updateSVG(); });
    $(`#${PH[num]} input:nth-child(5)`).on("change", function() { if (numberCheck()) updateSVG(); });
    $(`#${PH[num]} input:nth-child(6)`).on("change", function() { if (numberCheck()) updateSVG(); });
        // EVENT: on click

    $(`#${PH[num]} button`).on("click", function() {
        // alert("okay then");
        $(`#${PH[num]} button`).hide();
        num++;
        Populate();
    });
        // What happens when you click on the button?

}   // End of Populate()



function numberCheck() {
    let a = true;
    if ( /\D/.test( $(`#${PH[num]} input:nth-child(3)`).val() ) ) a = false;
    if ( /\D/.test( $(`#${PH[num]} input:nth-child(4)`).val() ) ) a = false;
    if ( /\D/.test( $(`#${PH[num]} input:nth-child(5)`).val() ) ) a = false;
    if ( /\D/.test( $(`#${PH[num]} input:nth-child(6)`).val() ) ) a = false;
    // alert(a);
    return a;
    
}   // End of numberCheck()



function updateSVG() {

    let tempStr = ' ';
    $("#codeSpace").text('');

    for ( i=0 ; i<=num ; i++) {
        let a = $(`#${PH[i]} input:nth-child(3)`).val();
        let b = $(`#${PH[i]} input:nth-child(4)`).val();
        let c = $(`#${PH[i]} input:nth-child(5)`).val();
        let d = $(`#${PH[i]} input:nth-child(6)`).val();

        // alert(`line ${i} is ${a} ${b} ${c} ${d} wow`);

        tempStr += `<line x1='${a}' y1='${b}' x2='${c}' y2='${d}' style="stroke:#000; stroke-width: 2px;" />`;
        // alert(tempStr);
    }

    // $("#codeSpace").text(`<line x1='${ $("#logicSpace input:nth-child(3)").val() }' y1='${ $("#logicSpace input:nth-child(4)").val() }' x2='${ $("#logicSpace input:nth-child(5)").val() }' y2='${ $("#logicSpace input:nth-child(6)").val() }' style="stroke:#000; stroke-width: 2px;" />`);
    $("#codeSpace").text(tempStr);
    $("#artSpace").html(tempStr);

};  // End of updateSVG()








// -------------------- RUNNING THE CODE -------------------- //

Populate();



// -------------------- THE END -------------------- //