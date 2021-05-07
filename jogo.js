console.log('Flappy bird');

let frames = 0;
const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const somDeHit = new Audio();
somDeHit.src = './efeitos/hit.wav'

// Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spritey: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenho() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
      
    
      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spritey, // Aqui são o SpritesX e o Sprites y 
        planoDeFundo.largura, planoDeFundo.altura, // Aqui o tamanho do  recorte da sprite
        planoDeFundo.x, planoDeFundo.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        planoDeFundo.largura, planoDeFundo.altura, // tamanho da imagem
      ),
      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spritey, // Aqui são o SpritesX e o Sprites y 
        planoDeFundo.largura, planoDeFundo.altura, // Aqui o tamanho do  recorte da sprite
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        planoDeFundo.largura, planoDeFundo.altura, // tamanho da imagem
      )
    }
}

// Chão
function criarChao(){
    const chao = {
        spriteX: 0,
        spritey: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoChao = 1;
            const movimentacao = chao.x - movimentoChao;
            const repeteEm = chao.largura / 2;
            // console.log('[repete]', repeteEm)
            // console.log('[movimentacao]', movimentacao % repeteEm)

            chao.x = movimentacao % repeteEm
    
        },
        desenho() {
          contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spritey, // Aqui são o SpritesX e o Sprites y 
            chao.largura, chao.altura, // Aqui o tamanho do  recorte da sprite
            chao.x, chao.y,  // a distancia vertical que é o x e a distancia horizontal que o y
            chao.largura, chao.altura, // tamanho da imagem
          ),
    
          contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spritey, // Aqui são o SpritesX e o Sprites y 
            chao.largura, chao.altura, // Aqui o tamanho do  recorte da sprite
            (chao.x + chao.largura), chao.y,  // a distancia vertical que é o x e a distancia horizontal que o y
            chao.largura, chao.altura, // tamanho da imagem
          )
        }
    }
    return chao;    
}

// Tela de Inicio
const telaDeInicio = {
    spriteX: 134,
    spritey: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,  
    desenho() {
      contexto.drawImage(
        sprites, 
        telaDeInicio.spriteX, telaDeInicio.spritey, // Aqui são o SpritesX e o Sprites y 
        telaDeInicio.largura, telaDeInicio.altura, // Aqui o tamanho do  recorte da sprite
        telaDeInicio.x, telaDeInicio.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        telaDeInicio.largura, telaDeInicio.altura, // tamanho da imagem
      )
    }
}

// Tela de Game Over

const telaDeGameOver = {
    spriteX: 134,
    spritey: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,  
    desenho() {
      contexto.drawImage(
        sprites, 
        telaDeGameOver.spriteX, telaDeGameOver.spritey, // Aqui são o SpritesX e o Sprites y 
        telaDeGameOver.largura, telaDeGameOver.altura, // Aqui o tamanho do  recorte da sprite
        telaDeGameOver.x, telaDeGameOver.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        telaDeGameOver.largura, telaDeGameOver.altura, // tamanho da imagem
      )
    }
}

function colisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y
    if(flappyBirdY >= chaoY){
        return true
    }

    return false
}

function criarFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spritey: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula(){
            flappyBird.velocidade = -flappyBird.pulo;
        },
        atualiza() {
            if(colisao(flappyBird, globais.chao)) {
                somDeHit.play()

                mudarTela(telas.game_over)
                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        movimento: [
            {spriteX: 0, spritey: 0},
            {spriteX: 0, spritey: 26},
            {spriteX: 0, spritey: 52}
        ],
        frameAtual: 0,
        atualizaFrameAtual(){
            const intervaloFrame = 10;
            const passouIntervalo = frames % intervaloFrame === 0

            if(passouIntervalo){
                const baseIncremento = 1;
                const incremento = baseIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimento.length;
                flappyBird.frameAtual = incremento % baseRepeticao
            }

        },
        desenho() {
         flappyBird.atualizaFrameAtual()
          const {spriteX, spritey} = flappyBird.movimento[flappyBird.frameAtual]
          contexto.drawImage(
            sprites, 
            spriteX, spritey, // Aqui são o SpritesX e o Sprites y 
            flappyBird.largura, flappyBird.altura, // Aqui o tamanho do  recorte da sprite
            flappyBird.x, flappyBird.y,  // a distancia vertical que é o x e a distancia horizontal que o y
            flappyBird.largura, flappyBird.altura, // tamanho da imagem
          )
        }
    }
 return flappyBird;
}

// canos

function criarCano() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spritey: 169,
        },
        ceu: {
            spriteX: 52,
            spritey: 169,
        },
        espaco: 80,
        desenho() {
          canos.pares.forEach(function(par) {
            const RandomY = par.y
            const espacamentoCanos = 90
            
            // Cano no ceu
            const canoCeuX = par.x
            const canoCeuy = RandomY
            contexto.drawImage(
              sprites, 
              canos.ceu.spriteX, canos.ceu.spritey,
              canos.largura, canos.altura, 
              canoCeuX, canoCeuy,  
              canos.largura, canos.altura,
            )

            

            // Cano no chao
            const canoChaoX = par.x
            const canoChaoy = canos.altura + espacamentoCanos + RandomY
            contexto.drawImage(
              sprites, 
              canos.chao.spriteX, canos.chao.spritey,
              canos.largura, canos.altura, 
              canoChaoX, canoChaoy,  
              canos.largura, canos.altura,
            )

            par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuy
            }

            par.canoChao = {
                x: canoChaoX,
                y: canoChaoy
            }
        })  
        },
        temColisao(par) {

            const cabecaDoFlappy = globais.flappyBird.y
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

            if( (globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                console.log("Invadindo a area dos canos")
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true
                }
            }


            return false
        },
        pares: [],
        atualiza() {
            passou100frames = frames % 100 === 0;

            if(passou100frames){
                canos.pares.push({
                  x: canvas.width,
                  y: -150 * (Math.random() + 1)
                })
            }

            canos.pares.forEach(function(par) {
                par.x = par.x - 2

                if(canos.temColisao(par)){
                    console.log("Voce perdeu")
                    somDeHit.play()
                    mudarTela(telas.game_over)
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }


            })
        }
    }

    return canos;
}

function criarPlacar(){
    const placar = {

        pontuacao: 0,
        desenho() {
          contexto.font = '35px "VT323"';
          contexto.textAlign = 'right'
          contexto.fillStyle = 'white'
          contexto.fillText(`${placar.pontuacao}`, canvas.width - 5, 35)
        },
        atualiza() {
            const intervaloFrame = 20;
            const passouIntervalo = frames % intervaloFrame === 0

            if(passouIntervalo){
                placar.pontuacao = placar.pontuacao + 1
            }
        }
    }

    return placar
}

//
// telas
//
const globais = {}
let telaAtiva = {}

function mudarTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa()
    }
}

const telas = {
    inicio: {
        inicializa () {
            globais.canos = criarCano();
            globais.flappyBird = criarFlappyBird();
            globais.chao = criarChao();
        },
        desenho () {
            planoDeFundo.desenho()
            globais.flappyBird.desenho();
            globais.canos.desenho();
            globais.chao.desenho();
            telaDeInicio.desenho();
        },
        click(){
            mudarTela(telas.jogo)
        },
        atualiza(){
            globais.chao.atualiza();
            
        }
    }
};

telas.jogo = {
    inicializa () {
        globais.placar = criarPlacar()
    },
    desenho(){
      planoDeFundo.desenho()
      globais.canos.desenho();
      globais.chao.desenho();
      globais.flappyBird.desenho();
      globais.placar.desenho();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza()
        globais.placar.atualiza();
    }
}

telas.game_over = {
    desenho(){
        telaDeGameOver.desenho()
    },
    atualiza(){

    },
    click(){
        mudarTela(telas.inicio)
    }
}

function loop(){
   telaAtiva.desenho();
   telaAtiva.atualiza();

   frames = frames + 1;
    
    requestAnimationFrame(loop); // Aqui onde é feita a otimilização para desenhar
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click()
    }
})
mudarTela(telas.inicio)
loop()