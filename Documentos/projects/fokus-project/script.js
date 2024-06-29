const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tituloNegrito = document.querySelector('.app__title-strong');
const listaCard = document.querySelector('.app__card-list');
const botoes = document.querySelectorAll('.app__card-button');
const timer = document.querySelector('.app__card-timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startBt = document.querySelector('#start-pause');
const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');
const playPauseImg = document.querySelector('.app__card-primary-butto-icon');


let tempoDecorridoEmSegundos = 25 * 60;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});


focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
    tempoDecorridoEmSegundos =  25 * 60;
    contagemRegressiva()
    zerar()
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    tempoDecorridoEmSegundos = 5 * 60
    contagemRegressiva()
    zerar()
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    tempoDecorridoEmSegundos = 15 * 60
    contagemRegressiva()
    zerar()
});

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `

            break;
        case 'descanso-curto':
            titulo.innerHTML = `
        Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
        Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
            break;
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        alert('Acabou o tempo!')
        return;
    }
    var minutes = Math.floor(tempoDecorridoEmSegundos/60);
    var seconds = tempoDecorridoEmSegundos % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    tempoDecorridoEmSegundos -= 1;
    if (tempoDecorridoEmSegundos == 0) {
        beep.play();
    }
    timer.innerHTML = `<div id="timer" class="app__card-timer">${minutes + ':' + seconds}</div>`;
}

startBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    play.play();
    startBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
                        <span>Pausar</span>`
}

function zerar() {
    if (intervaloId) {
        clearInterval(intervaloId);
    intervaloId = null;
    pause.play();
    startBt.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
                        <span>Começar</span>`
    }
    
}
