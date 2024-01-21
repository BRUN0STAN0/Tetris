var body = document.body;

var divIniziaPartita = document.createElement("div");
divIniziaPartita.style.display = "flex";
divIniziaPartita.style.justifyContent = "center";
divIniziaPartita.style.alignItems = "center";
divIniziaPartita.style.height = "100vh";
divIniziaPartita.style.width = "100vw";
divIniziaPartita.style.position = "absolute";
divIniziaPartita.style.top = 0;
divIniziaPartita.style.left = 0;
divIniziaPartita.style.background = "rgba(0,0,0,0.5)";
divIniziaPartita.style.zIndex = 100;
divIniziaPartita.setAttribute("id", "divIniziaPartita");
body.appendChild(divIniziaPartita);

var buttonIniziaPartita = document.createElement("button");
buttonIniziaPartita.setAttribute("id", "buttonIniziaPartita");
buttonIniziaPartita.style.width = "200px";
buttonIniziaPartita.style.height = "50px";
buttonIniziaPartita.style.borderRadius = "20px";
buttonIniziaPartita.style.background = "red";
buttonIniziaPartita.style.color = "white";
buttonIniziaPartita.style.fontSize = "20px";
buttonIniziaPartita.style.fontWeight = "bold";

buttonIniziaPartita.innerHTML = "Inizia Partita";
divIniziaPartita.appendChild(buttonIniziaPartita);
buttonIniziaPartita.addEventListener("click", function () {
  divIniziaPartita.style.display = "none";
  var audioTetris = new Audio("tetris.mp3");
  audioTetris.play();
  setTimeout(function () {
    createNewFormaQuadrato();
  }, 1000);
});

var boxTetris = document.createElement("div");
boxTetris.setAttribute("id", "boxTetris");
body.appendChild(boxTetris);

var height = 800;
var width = 500;

boxTetris.style.height = height + "px";
boxTetris.style.width = width + "px";

const dimensioniQuadrato = 50;

//crea una variabile di velocità random che parta da 1000 minimo e 10000 massimo
var velocitàRandom;

var numeroQuadrati = (width / dimensioniQuadrato) * (height / dimensioniQuadrato);

for (var i = 0; i < numeroQuadrati; i++) {
  var quadrato = document.createElement("div");
  // quadrato.innerHTML = i + 1;
  quadrato.classList.add("quadrato");
  quadrato.classList.add("quadrato_" + (i + 1));
  quadrato.style.display = "flex";
  quadrato.style.justifyContent = "center";
  quadrato.style.alignItems = "center";
  quadrato.style.width = dimensioniQuadrato + "px";
  quadrato.style.height = dimensioniQuadrato + "px";
  quadrato.style.borderRadius = "20px";

  boxTetris.appendChild(quadrato);
}

var arrayQuadratiGiaOccupati = [];

var point = 0;

var arrayQuadratiGiaOccupati = [];

var showPoint = document.createElement("div");
showPoint.setAttribute("id", "showPoint");
showPoint.innerHTML = point;
body.appendChild(showPoint);

// crea una variabile che contenga solamente la prima row di quadrati
var firstLine = [];
for (var i = 0; i < width / dimensioniQuadrato; i++) {
  firstLine.push(i + 1);
}

function createNewFormaQuadrato() {
  //* VELOCITA * //

  velocitàRandom = Math.floor(Math.random() * 70);

  //* VELOCITA * //
  var formaQuadrato = document.createElement("div");
  formaQuadrato.classList.add("quadratoInCaduta");
  formaQuadrato.style.background = "red";
  formaQuadrato.style.width = dimensioniQuadrato + "px";
  formaQuadrato.style.height = dimensioniQuadrato + "px";
  formaQuadrato.style.top = 0;
  formaQuadrato.style.borderRadius = "20px";
  formaQuadrato.style.position = "absolute";
  // genera un random ogni 50px
  var random = Math.floor(Math.random() * (width / dimensioniQuadrato)) * dimensioniQuadrato;
  formaQuadrato.style.left = random + "px";

  boxTetris.appendChild(formaQuadrato);
  var eventoPartito = false;
  var scende = setInterval(function () {
    if (formaQuadrato.classList.contains("quadratoInCaduta")) {
      formaQuadrato.style.top = formaQuadrato.offsetTop + dimensioniQuadrato + "px";
      var posizioneQuadrato = (formaQuadrato.offsetTop / dimensioniQuadrato) * (width / dimensioniQuadrato) + formaQuadrato.offsetLeft / dimensioniQuadrato + 1;
      var keyEvent;
      if (!eventoPartito) {
        keyEvent = document.addEventListener("keyup", function (event) {
          if (event.keyCode == 37) {
            if (formaQuadrato.offsetLeft - dimensioniQuadrato < 0) return;
            formaQuadrato.style.left = formaQuadrato.offsetLeft - dimensioniQuadrato + "px";
            posizioneQuadrato = (formaQuadrato.offsetTop / dimensioniQuadrato) * (width / dimensioniQuadrato) + formaQuadrato.offsetLeft / dimensioniQuadrato + 1;
          } else if (event.keyCode == 39) {
            if (formaQuadrato.offsetLeft + dimensioniQuadrato >= width) return;
            formaQuadrato.style.left = formaQuadrato.offsetLeft + dimensioniQuadrato + "px";
            posizioneQuadrato = (formaQuadrato.offsetTop / dimensioniQuadrato) * (width / dimensioniQuadrato) + formaQuadrato.offsetLeft / dimensioniQuadrato + 1;
          }
        });
        eventoPartito = true;
      }

      if (formaQuadrato.offsetTop + dimensioniQuadrato >= height || arrayQuadratiGiaOccupati.includes(posizioneQuadrato)) {
        // avvia l'audio switch.mp3
        var audio = new Audio("blip.mp3");
        audio.play();

        if (arrayQuadratiGiaOccupati.includes(posizioneQuadrato)) {
          var selezionaQuadratoSopraStante = document.querySelector(".quadrato_" + (posizioneQuadrato - width / dimensioniQuadrato));
          selezionaQuadratoSopraStante.style.background = "black";
          selezionaQuadratoSopraStante.classList.remove("quadrato");
          selezionaQuadratoSopraStante.innerHTML = "";
          arrayQuadratiGiaOccupati.push(posizioneQuadrato - width / dimensioniQuadrato);
        }

        point--;
        showPoint.innerHTML = point;
        formaQuadrato.classList.remove("quadratoInCaduta");
        formaQuadrato.style.opacity = 0;

        clearInterval(scende);
        createNewFormaQuadrato();
        var posizioneQuadratoFinale = (formaQuadrato.offsetTop / dimensioniQuadrato) * (width / dimensioniQuadrato) + formaQuadrato.offsetLeft / dimensioniQuadrato + 1;
        arrayQuadratiGiaOccupati.push(posizioneQuadratoFinale);

        // dovrei terminare di fare muovere il quadrato caduto
        var quadratoCaduto = document.querySelector(".quadrato_" + posizioneQuadratoFinale);
        quadratoCaduto.style.background = "black";
        quadratoCaduto.classList.remove("quadrato");
        quadratoCaduto.innerHTML = "";
      }

      var gameOver = arrayQuadratiGiaOccupati.filter(function (element) {
        return firstLine.includes(element);
      });

      if (gameOver.length > 0) {
        var confirmGameOver = confirm("Game Over! Vuoi ricominciare?" + "\n" + "Punteggio: " + point);
        if (!confirmGameOver) {
          location.reload();
        } else {
          location.reload();
        }
      }
    }
  }, velocitàRandom);
}
