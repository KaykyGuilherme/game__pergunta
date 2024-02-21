const telaDeLogin = {
    telaALL: document.querySelector('.logar'),
    formLogin: document.querySelector('.logar form'),
    btnEnviarName: document.querySelector('.logar form button'),
    playerName: document.querySelector('#PlayerName'),
    avisos: document.querySelector('.logar__avisos')
}

const gameHeader = {
    welcome: document.querySelector('.nome__do__jogador'),
    exit: document.querySelector('header button')
}

const game = {
    avisos: document.querySelector('.container__game__tela h2'),
    play: document.querySelector('.game__play'),
    gameActive: document.querySelector('.game__active'),
    userRespota: document.querySelector('#tentaTiva'),
    btnRespota: document.querySelector('.game__active button'),
    acertoErrou: document.querySelector('.avisos__2')
}

let perguntas = [
    'Qual é o evento de clicar com o mouse em um elemento?',
    'Qual é o evento de passar o mouse por cima de um elemento?',
    'Qual é o evento de mandar um arquivo/informação? (form)'
]

perguntas = perguntas.sort((a,b) => Math.random() - 0.5)

// =============================================================================

const salvarNome = (playerName) =>{
    localStorage.setItem('namePlayer', playerName)
    nomeDoJogaodor = localStorage.getItem('namePlayer')
    telaDeLogin.telaALL.style.bottom = '100%'
    escreverNome()
}

const escreverNome = () =>{
    gameHeader.welcome.textContent = nomeDoJogaodor
}

let contPergunta = perguntas.length
let contInicioPerguntas = 0
const iniciarGame = () =>{
    game.play.style.display = 'none'
    game.gameActive.style.display = 'flex'
    trocarPergunta()
}

const trocarPergunta = () =>{
    if(contInicioPerguntas == contPergunta){
        contInicioPerguntas = 0
        finalizarJogo()
    }else{
        game.avisos.textContent = perguntas[contInicioPerguntas]
        contInicioPerguntas++
    }
}

let resposta;
const respostaCerta = () =>{
    if(game.avisos.textContent == 'Qual é o evento de clicar com o mouse em um elemento?'){
        resposta = 'click'
    }else if(game.avisos.textContent == 'Qual é o evento de passar o mouse por cima de um elemento?'){
        resposta = 'mousemouve'
    }else if(game.avisos.textContent == 'Qual é o evento de mandar um arquivo/informação? (form)'){
        resposta = 'submit'
    }
}

const finalizarJogo = () =>{
    game.gameActive.style.display = 'none'
    game.play.style.display = 'block'

    game.avisos.textContent = 'Jogar novamente?'
}

// =============================================================================


telaDeLogin.formLogin.addEventListener('submit', (e) =>{
    e.preventDefault()
})

telaDeLogin.btnEnviarName.addEventListener('click', () =>{

    if(!telaDeLogin.playerName.value){
        telaDeLogin.avisos.textContent = 'digite um nome'
        telaDeLogin.avisos.style.color = 'yellow'
    }else{
        salvarNome(telaDeLogin.playerName.value)
        telaDeLogin.playerName.value = ''
    }
})

gameHeader.exit.addEventListener('click', () =>{
    localStorage.removeItem('namePlayer')
    telaDeLogin.telaALL.style.bottom = '0%'
})

game.play.addEventListener('click', () =>{
    iniciarGame()
    respostaCerta()
})

game.gameActive.addEventListener('submit', (e) =>{
    e.preventDefault()
    if(game.userRespota.value){
        let tentaivaDoUser = game.userRespota.value
        game.userRespota.value = ''
        game.userRespota.focus()
    
        if(tentaivaDoUser == resposta){
            trocarPergunta()
            respostaCerta()
            game.acertoErrou.style.display = 'block'
            game.acertoErrou.style.color = 'green'
            game.acertoErrou.textContent = 'acertou'
        }else{
            game.acertoErrou.style.display = 'block'
            game.acertoErrou.style.color = 'red'
            game.acertoErrou.style.textContent = 'errou'
        }

    }

})


// =============================================================================

let nomeDoJogaodor = localStorage.getItem('namePlayer')
if(nomeDoJogaodor){
    telaDeLogin.telaALL.style.bottom = '100%'
    escreverNome()
}