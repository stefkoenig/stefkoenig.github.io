console.log(jQuery);

var size = 3; //size of board by dots
var counter = 0;
var score = 0;
var game = { currentPlayer: 0
, switchPlayer: function(){
        if (this.currentPlayer === 0){
            this.currentPlayer = 1;
        } else {
            this.currentPlayer = 0;
        }
    }

    , players: [{score: 0, name: "player1"}, {score: 0, name: "player2"}]
};

//SELECT CERTAIN DIV CLASSES AND RUN FUNCTIONS ON CLICK
$('.v-line').on('click',selectVertical);
$('.h-line').on('click', selectHorizontal);
$('.line').on('click', checkFinished);
$('#button').on('click', clearBoard);

function selectLine(el){
    $(el).off('click');

    //find rowNumber
    var rowNumber =$(el).parent().parent().attr('id').substring(3);
    // console.log('rowNumber', rowNumber);

    var edge = $(el).data('edge');

    var boxCompleted = getId($(el).attr('id'), parseInt(rowNumber), edge);
    if (boxCompleted === 0){
        //no box is complete, switch player
        game.switchPlayer();
    } else {
        //player2 gets point
        game.players[game.currentPlayer].score += boxCompleted;
    }

    console.log('player1: ', game.players[0].score, 'player2: ', game.players[1].score);
    $('#p1score').text('Player 1: ' + game.players[0].score);
    $('#p2score').text('Player 2: ' + game.players[1].score);
}
//Select Vertical
function selectVertical(){
       var el = this;
        $(this).addClass(game.players[game.currentPlayer].name + 'selected-v-line selected').removeClass('v-line');
        selectLine(el);

}

//IF NOT ALREADY SELECTED, ADD A CLASS TO A HORIZONTAL LINE CHANGING IT TO THE
//CURRENT PLAYER COLOR
function selectHorizontal(){
    //findId = $(this).attr('id');
        //console.log(findId);
        var el = this;
        $(this).addClass(game.players[game.currentPlayer].name + 'selected-h-line selected').removeClass('h-line');
        selectLine(el);
}

// CHECK IF GAME HAS FINISHED
function checkFinished(){
    if (
    $('.line').length === ($('.player1selected-h-line').length +
    $('.player2selected-h-line').length +
    $('.player1selected-v-line').length +
    $('.player2selected-v-line').length)
    ){
        if (player1score > player2score){
            alert('Game over! Player 1 Wins!');
        }
        else if (player2score > player1score){
            alert('Game over! Player 2 Wins!')
        }
        else {
            alert('Game ends in a tie. Play again!')
        }
    }
}

function getId (id, rowNumber, edge){
    var splitId = id.split("_"); //split ID into 2 strings so can grab orientation & number from it
    console.log(splitId);
    var orientation = splitId[0];
    number = splitId[1];
    number = parseInt(number); //change number from type string to number

    console.log("orientation is: ", orientation);
    console.log("number is", number);
    return checkSquares(orientation, number, rowNumber, edge);
}

function checkSquares(orientation, number, rowNumber, edge){

    var completeBox = 0;
    var box1, box2;


    //TO DO: Loop through box1 and box2, look up the element by id, see if element has .selected
    //TO DO: If all elements in the boxArray has class .selected, completeBox++

    if (edge ==='left') {
        var counterleft = 0;
        box2 = ['v_'+(number+1), 'h_'+(number-rowNumber+1), 'h_'+(number+size-rowNumber+1)];
            for(var i = 0; i<3; i++){
                if($('#'+box2[i]).hasClass('selected')){
                    console.log('yay left', box2[i]);
                    counterleft++;
            }
        }
        if(counterleft == 3){
            console.log('you have a left box');
            if (!game.currentPlayer){
               $('#cell' + (number-rowNumber+1)).css({'background-color':'#E757E7'});
            }
            else{
                $('#cell' + (number-rowNumber+1)).css({'background-color':'#54ECF4'});
            }
            completeBox++;
        }
    } else if (edge === 'right'){
        var counterright = 0;
        box1 = ['v_'+(number-1), 'h_'+(number-rowNumber), 'h_'+(number+size-rowNumber)];
            for(var i = 0; i<3; i++){
                if($('#'+box1[i]).hasClass('selected')){
                    console.log('yay right', box1[i]);
                    counterright++;
            }
        }
        if(counterright == 3){
            console.log('you have a top box');
            if (!game.currentPlayer){
               $('#cell' + (number-rowNumber)).css({'background-color':'#E757E7'});
            }
            else{
                $('#cell' + (number-rowNumber)).css({'background-color':'#54ECF4'});
            }
            completeBox++;
        }
    } else if (edge === 'top'){
        var countertop = 0;
        box2 = ['h_'+(number+size), 'v_'+(number+rowNumber), 'v_'+(number+rowNumber+1)];
            for(var i = 0; i<3; i++){
                if ($('#'+box2[i]).hasClass('selected')){
                    console.log('yay top', box2[i]);
                    countertop++;
            }
        }
        if(countertop == 3){
            console.log('you have a top box');
            if (!game.currentPlayer){
               $('#cell' + number).css({'background-color':'#E757E7'});
            }
            else{
                $('#cell' + number).css({'background-color':'#54ECF4'});
            }
            completeBox++;
        }
    } else if (edge === 'bottom'){
        var counterbottom = 0;
        box1 = ['h_'+(number-size), 'v_'+(number-size+rowNumber-1), 'v_'+(number-size+rowNumber)];
           for (var i = 0; i<3; i++){
               if ($('#'+box1[i]).hasClass('selected')){
                   console.log('yay bottom',box1[i]);
                   counterbottom++;
               }
           }
           if(counterbottom == 3){
               console.log('you have a bottom box');
               if (!game.currentPlayer){
                  $('#cell' + (number-size)).css({'background-color':'#E757E7'});
               }
               else{
                   $('#cell' + (number-size)).css({'background-color':'#54ECF4'});
               }
               completeBox++;
           }
       } else if (orientation === 'v'){
           var counterVbox1 = 0;
           var counterVbox2 = 0;
               //line is vertical, box1 = left, box2 = right
           box1 = ['v_'+(number-1), 'h_'+(number-rowNumber), 'h_'+(number+size-rowNumber)];
           box2 = ['v_'+(number+1), 'h_'+(number-rowNumber+1), 'h_'+(number+size-rowNumber+1)];
               for (var i = 0; i<3; i++){
                   if ($('#'+box1[i]).hasClass('selected')){
                       console.log('yay', box1[i]);
                       counterVbox1++;
                   }
                   if ($('#'+box2[i]).hasClass('selected')){
                       console.log('yay', box2[i]);
                       counterVbox2++;
               }
           }

           if (counterVbox1==3){
             //  console.log('you have a vertical inner box1');
               console.log("box1", box1)
               if (!game.currentPlayer){
                  $('#cell' + (number-rowNumber)).css({'background-color':'#E757E7'});
               }
               else{
                   $('#cell' + (number-rowNumber)).css({'background-color':'#54ECF4'});
               }
               completeBox++;
           }
           if (counterVbox2==3){
             //  console.log('you have a vertical inner box2');
               console.log("box2", box2)
               if (!game.currentPlayer){
                  $('#cell' + (number-rowNumber+1)).css({'background-color':'#E757E7'});
               }
               else{
                   $('#cell' + (number-rowNumber+1)).css({'background-color':'#54ECF4'});
               }
               completeBox++;
           }

       } else if (orientation = 'h'){
           var counterHbox1 = 0;
           var counterHbox2 = 0;
           //line is horizontal, box1 = upper, box2 = lower
           box1 = ['h_'+(number-size), 'v_'+(number-size+rowNumber-1), 'v_'+(number-size+rowNumber)];
           box2 = ['h_'+(number+size), 'v_'+(number+rowNumber), 'v_'+(number+rowNumber+1)];
               for (var i = 0; i<3; i++){
                   if ($('#'+box1[i]).hasClass('selected')){
                       console.log('yay', box1[i]);
                       counterHbox1++;
                   }
                   if ($('#'+box2[i]).hasClass('selected')){
                       console.log('yay', box2[i]);
                       counterHbox2++;
               }
           }
           if (counterHbox1==3){
               console.log('you have a vertical inner box1');
               //if the !game.currentPlayer is true then set the text to 'player1'
               //otherwise set it to 'player2'
               if (!game.currentPlayer){
                 $('#cell' + (number-size)).css({'background-color':'#E757E7'});
             }
                else{
                    $('#cell' + (number-size)).css({'background-color':'#54ECF4'});
                }
               completeBox++;

           }
           if (counterHbox2==3){
               console.log('you have a vertical inner box2');
               if (!game.currentPlayer){
                  $('#cell' + number).css({'background-color':'#E757E7'});
               }
               else{
                   $('#cell' + number).css({'background-color':'#54ECF4'});
               }
               completeBox++
           }
       }

       console.log(box1, box2);

       return completeBox; // 0, 1, or 2
   }


function clearBoard(){
    location.reload();
}
