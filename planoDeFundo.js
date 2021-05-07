// Plano de fundo 

const planoDeFundo = {
    spriteX: 390,
    spritey: 0,
    largura: 275,
    altutura: 204,
    x: 0,
    y: canvas.height - 204,
    desenho() {
      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spritey, // Aqui são o SpritesX e o Sprites y 
        planoDeFundo.largura, planoDeFundo.altutura, // Aqui o tamanho do  recorte da sprite
        planoDeFundo.x, planoDeFundo.y,  // a distancia vertical que é o x e a distancia horizontal que o y
        planoDeFundo.largura, planoDeFundo.altutura, // tamanho da imagem
      )
    }
}