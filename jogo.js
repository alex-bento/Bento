console.log('Flappy bird');

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// Plano de Fundo
const planoDeFundo = {
    spriteX: 390,
    spritey: 0,
    largura: 275,
    altutura: 204,
    x: 0,
    y: canvas.height - 204,
    desenho() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)
      
    
      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spritey, // Aqui são o SpritesX e o Sprites y 
        planoDeFundo.largura, planoDeFundo.altutura, // Aqui o tamanho do  recorte da sprite
        planoDeFundo.x, planoDeFundo.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        planoDeFundo.largura, planoDeFundo.altutura, // tamanho da imagem
      ),
      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spritey, // Aqui são o SpritesX e o Sprites y 
        planoDeFundo.largura, planoDeFundo.altutura, // Aqui o tamanho do  recorte da sprite
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        planoDeFundo.largura, planoDeFundo.altutura, // tamanho da imagem
      )
    }
}

// Chão
const chao = {
    spriteX: 0,
    spritey: 610,
    largura: 224,
    altutura: 112,
    x: 0,
    y: canvas.height - 112,
    desenho() {
      contexto.drawImage(
        sprites, 
        chao.spriteX, chao.spritey, // Aqui são o SpritesX e o Sprites y 
        chao.largura, chao.altutura, // Aqui o tamanho do  recorte da sprite
        chao.x, chao.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        chao.largura, chao.altutura, // tamanho da imagem
      ),

      contexto.drawImage(
        sprites, 
        chao.spriteX, chao.spritey, // Aqui são o SpritesX e o Sprites y 
        chao.largura, chao.altutura, // Aqui o tamanho do  recorte da sprite
        (chao.x + chao.largura), chao.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        chao.largura, chao.altutura, // tamanho da imagem
      )
    }
}

const flappyBird = {
    spriteX: 0,
    spritey: 0,
    largura: 33,
    altutura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },  
    desenho() {
      contexto.drawImage(
        sprites, 
        flappyBird.spriteX, flappyBird.spritey, // Aqui são o SpritesX e o Sprites y 
        flappyBird.largura, flappyBird.altutura, // Aqui o tamanho do  recorte da sprite
        flappyBird.x, flappyBird.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        flappyBird.largura, flappyBird.altutura, // tamanho da imagem
      )
    }
}

function loop(){
    flappyBird.atualiza()
    planoDeFundo.desenho()
    chao.desenho();
    flappyBird.desenho();
    requestAnimationFrame(loop); // Aqui onde é feita a otimilização para desenhar
}

loop()