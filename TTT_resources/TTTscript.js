document.addEventListener("DOMContentLoaded", function () {
    tablero = document.getElementById('tablero');
    celdas = tablero.getElementsByTagName('td');
    const ResetButton = document.getElementById("Reset");

    //Cosas para la puntuacion


    //Cosas de Estado de jugador
    playerval = "X";
    estadoJ = false; //False = X; True = O;
    celdaVal = 1;

    //=Clickear para marcar
    RestaurarListener();

    //*Cargado de puntos
    LoadPuntuacion();

    //=RESET de Todas las celdas.=
    ResetButton.addEventListener("click", function () {
        for (var i = 0; i < celdas.length; i++) {
            //Quita Letra y valor a cada celda del tablero.
            celdas[i].value = undefined;
            celdas[i].innerText = "";
        }

        //Se Establece los estados iniciales del juego.
        playerval = "X";
        estadoJ = false; //False = X; True = O;
        celdaVal = 1;
        document.getElementById("turnoletra").innerHTML = "X";

        //Se restablece los addEventListener de Celdas
        RestaurarListener();

        console.clear();
        console.log("Reset del juego");
    })

})

//*Funcion de Cambio de turno*
function CambioJugador() {
    if (estadoJ == false) {
        //Si es false "X", ahora le toca el otro jugador
        estadoJ = true;
        playerval = "O";
        celdaVal = 2;

        //Pantalla QuienTurno
        document.getElementById("turnoletra").innerHTML = "O";
    } else {
        //Si es True "O", ahora le toca el otro jugador
        estadoJ = false;
        playerval = "X";
        celdaVal = 1;

        //Pantalla QuienTurno
        document.getElementById("turnoletra").innerHTML = "X";
    }
}

//=Seccion de puntos
marcadorAzul = 0;
marcadorRojo = 0;
function Puntos() {
    //WIN 3 o 6
    console.clear();

    const horizontal = [];
    const vertical = [];
    const diagonal = [];
    //Si preguntas si, me dio pereza hacerlo mejor. Full ".value" y ya
    //horizontal
    for (let i = 0; i < 3; i++) {
        horizontal[i] = celdas[i * 3].value + celdas[i * 3 + 1].value + celdas[i * 3 + 2].value;
        //victoria horizontal
        if ((horizontal[i] === 3) || (horizontal[i] === 6)) {
            // console.log("Vic Hor");
            SetVictoria(horizontal[i]);
        }
    }

    //vertical
    for (let i = 0; i < 3; i++) {
        vertical[i] = celdas[i].value + celdas[i + 3].value + celdas[i + 3 + 3].value;
        //victoria vertical
        if ((vertical[i] === 3) || (vertical[i] === 6)) {
            console.log("Victoria vertical");
            SetVictoria(vertical[i]);
        }
    }

    //diagonal
    diagonal[0] = celdas[0].value + celdas[4].value + celdas[8].value;
    diagonal[1] = celdas[2].value + celdas[4].value + celdas[6].value;
    for (let i = 0; i < 2; i++) {
        //victoria diagonal
        if ((diagonal[i] === 3) || (diagonal[i] === 6)) {
            console.log("Victoria Diagonal");
            SetVictoria(diagonal[i]);
        }
    }

    //!Visual en consola
    for (let i = 0; i < 3; i++) {
        console.log("horizontal n" + i + ": " + horizontal[i]);
    }
    for (let i = 0; i < 3; i++) {
        console.log("vertical n" + i + ": " + vertical[i]);
    }
    for (let i = 0; i < 2; i++) {
        console.log("diagonal n" + i + ": " + diagonal[i]);
    }
}

//=Funcion de Victoria
function SetVictoria(linea_ganadora) {

    if (linea_ganadora === 3) {
        marcadorAzul += 1;
        document.getElementById("pts-azul").innerText = marcadorAzul;
        //Block del juego
        RomperListener();

        //Save de puntos
        SavePuntuacion();
    } else if (linea_ganadora === 6) {
        marcadorRojo += 1;
        document.getElementById("pts-rojo").innerText = marcadorRojo;
        //Block del juego
        RomperListener();

        //Save de puntos
        SavePuntuacion();
    }
}

//!Funciones de Romper/Restaurar Listeners en Celdas
function RomperListener() {
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].removeEventListener("click", CeldaClock);
    }
}

function RestaurarListener() {
    for (var i = 0; i < celdas.length; i++) {
        //pone a la escucha cada celda para click.
        celdas[i].addEventListener("click", CeldaClock, false);
    }
}

function CeldaClock(e) {
    if (e.target.value == undefined) {
        //la celda a la cual clickeamos obtiene la letra y valor segun el jugador activo.
        e.target.innerText = playerval;
        e.target.value = celdaVal;

        //Llama a la funcion de puntos...
        Puntos();

        //Una vez colocados los elemetos. Se llama funcion de Cambio de Player
        CambioJugador(estadoJ);

        //!debug console.
        //console.log("La celda ["+i+"] Tiene el valor: "+celdas[i].value);
    }
}
//!Funciones de Romper/Restaurar Listeners en Celdas

//* Guardado y Cargado DE PUNTOS//
function SavePuntuacion(){
    sessionStorage.setItem("marcadorAzul", marcadorAzul);
    sessionStorage.setItem("marcadorRojo", marcadorRojo);
}

function LoadPuntuacion(){
    //Variables de transicion de datos.
    var passAzul = 0;
    var passRojo = 0;
    //Obtencion de datos guardados.
    passAzul = sessionStorage.getItem("marcadorAzul");
    passRojo = sessionStorage.getItem("marcadorRojo");
    
    //Si no hay puntuacion previa. (pass = null)
    if((passAzul===null)||(passAzul===null)){
        //Reset a default;
        passAzul = 0;
        passRojo = 0;
    }

    //Paso de datos obtenidos a variables originales.
    marcadorAzul = parseInt(passAzul);
    marcadorRojo = parseInt(passRojo);
    //Refrescar el tablero
    document.getElementById("pts-azul").innerText = marcadorAzul;
    document.getElementById("pts-rojo").innerText = marcadorRojo;

}