var matrix = [[0,0,0], [0,0,0], [0,0,0]];
var player = 0;
var winOne = 0;
var winTwo = 0;
var tie = 0;
var endGame = true;

function buildTable(){ // construye la tabla
    document.getElementById("table").innerHTML = " ";
    for(let i=0;i<3;i++){
        document.getElementById("table").innerHTML += "<tr id='row"+i+"'></tr>";
        for(let j=0;j<3;j++){
           document.getElementById("row"+i).innerHTML += "<td id="+(i+1)+(j+1)+" onclick='game("+(i+1)+(j+1)+","+[i]+","+[j]+")'></td>";
        }
    }
}

function changePlayer(){ // cambia de jugador
    if(player == 0){
        player = 1;
    } else if(player == 1){
        player = 0;
    }
}

function game(id,pos1,pos2){ // se pasa como parametro el id para saber donde colocar la ficha y la posición de la matriz para saber donde hacer click y cambiar el valor según el jugador. 
    if(endGame==true){
        if(matrix[pos1][pos2] == 0){
            if(player == 0){
                matrix[pos1][pos2] = 1;
                document.getElementById("turn").innerHTML = "Turno del jugador 2";
                document.getElementById(id).innerHTML = "X";
                changePlayer();
            } 
            else if(player == 1){
                matrix[pos1][pos2] = -1;
                document.getElementById("turn").innerHTML = "Turno del jugador 1";
                document.getElementById(id).innerHTML = "O";
                changePlayer();
            }
        check();
        saveChanges();
        }
    }
}

function check(){ // valida la combinación ganadora
    
    if(matrix[0][0] + matrix[0][1] + matrix[0][2] == 3 || matrix[1][0] + matrix[1][1] + matrix[1][2] == 3 || matrix[2][0] + matrix[2][1] + matrix[2][2] == 3 || matrix[0][0] + matrix[1][0] + matrix[2][0] == 3 || matrix[0][1] + matrix[1][1] + matrix[2][1] == 3 || matrix[0][2] + matrix[1][2] + matrix[2][2] == 3 || matrix[0][0] + matrix[1][1] + matrix[2][2] == 3 || matrix[0][2] + matrix[1][1] + matrix[2][0] == 3){
        document.getElementById("state").innerHTML = "El jugador 1 ha ganado.";
        document.getElementById("state").style.display = "flex";
        winOne = winOne + 1;
        document.getElementById("playerOne").innerHTML = "Jugador Uno:" + winOne;
        endGame = false;
    } else if(matrix[0][0] + matrix[0][1] + matrix[0][2] == -3 || matrix[1][0] + matrix[1][1] + matrix[1][2] == -3 || matrix[2][0] + matrix[2][1] + matrix[2][2] == -3 || matrix[0][0] + matrix[1][0] + matrix[2][0] == -3 || matrix[0][1] + matrix[1][1] + matrix[2][1] == -3 || matrix[0][2] + matrix[1][2] + matrix[2][2] == -3 || matrix[0][0] + matrix[1][1] + matrix[2][2] == -3 || matrix[0][2] + matrix[1][1] + matrix[2][0] == -3){
        document.getElementById("state").innerHTML = "El jugador 2 ha ganado.";
        document.getElementById("state").style.display = "flex";
        winTwo = winTwo + 1;
        document.getElementById("playerTwo").innerHTML = "Jugador Dos:" + winTwo;
        endGame = false;
    } else if(matrix[0][0] && matrix[0][1] && matrix[0][2] && matrix[1][0] && matrix[1][1] && matrix[1][2] && matrix[2][0] && matrix[2][1] && matrix[2][2] !== 0){
        document.getElementById("state").innerHTML = "Empate.";
        document.getElementById("state").style.display = "flex";
        tie = tie + 1;
        document.getElementById("tie").innerHTML = "Empates:" + tie;
        endGame = false;
    }
}

function reset(){ // reinicia el juego
    matrix = [[0,0,0],[0,0,0],[0,0,0]]; 
    player = 0;
    endGame = true;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
           document.getElementById((i+1)+""+(j+1)).innerHTML = " ";
           document.getElementById("state").style.display = "none";
        }
    }
}

function saveChanges(){
    localStorage.setItem("matrix", JSON.stringify(matrix));
    localStorage.setItem("player", JSON.stringify(player));
    localStorage.setItem("winOne", JSON.stringify(winOne));
    localStorage.setItem("winTwo", JSON.stringify(winTwo));
    localStorage.setItem("tie", JSON.stringify(tie));
    localStorage.setItem("turn", endGame);
}

function loadChanges(){
    var gameMatrix = localStorage.getItem("matrix");
    JSON.parse(gameMatrix);
    var changePlayer = localStorage.getItem("player");
    JSON.parse(changePlayer);
    var winOneState = localStorage.getItem("winOne");
    JSON.parse(winOneState);
    var winTwoState = localStorage.getItem("winTwo");
    JSON.parse(winTwoState);
    var tieState = localStorage.getItem("tie");
    JSON.parse(tieState);
    localStorage.getItem("turn");
}