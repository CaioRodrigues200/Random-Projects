// Objeto global de entrada
const INPUT = {
    mouseX: 0,
    mouseY: 0,
    isShooting: false,
    
    init() {
        // Configurar eventos do teclado
        window.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': PLAYER.moving.up = true; break;
                case 's': PLAYER.moving.down = true; break;
                case 'a': PLAYER.moving.left = true; break;
                case 'd': PLAYER.moving.right = true; break;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': PLAYER.moving.up = false; break;
                case 's': PLAYER.moving.down = false; break;
                case 'a': PLAYER.moving.left = false; break;
                case 'd': PLAYER.moving.right = false; break;
            }
        });
        
        // Configurar eventos do mouse
        GAME.canvas.addEventListener('mousemove', (e) => {
            const rect = GAME.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
        
        GAME.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.isShooting = true;
            }
        });
        
        GAME.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.isShooting = false;
            }
        });
        
        console.log("INPUT inicializado!");
    }
};

// Função principal que inicializa o jogo
function initGame() {
    console.log("Iniciando o jogo...");
    
    // Inicializar canvas
    initCanvas();
    console.log("Canvas inicializado: ", GAME.width, "x", GAME.height);
    
    // Inicializar jogador
    PLAYER.init();
    console.log("Jogador inicializado na posição:", PLAYER.x, PLAYER.y);
    
    // Inicializar sistema de boss
    BOSS.init();
    console.log("Sistema de Boss inicializado");
    
    // Inicializar sistema de input
    INPUT.init();
    
    // Atualizar estatísticas iniciais
    UI.updateStats(GAME.score, PLAYER.health);
    UI.updateBossTimer(BOSS.timer);
    
    // Iniciar o loop do jogo
    console.log("Iniciando loop do jogo");
    requestAnimationFrame(gameLoop);
}

// Loop principal do jogo
function gameLoop() {
    if (GAME.gameOver) {
        UI.drawGameOver(GAME.ctx, GAME.canvas, GAME.score);
        return;
    }
    
    // Limpar o canvas
    GAME.ctx.clearRect(0, 0, GAME.width, GAME.height);
    
    // Atualizar o boss timer
    BOSS.updateTimer();
    
    // Controle do jogador
    if (INPUT.isShooting) {
        BULLET.shoot();
    }
    
    // Atualizar posição do jogador
    PLAYER.move();
    
    // Desenhar o jogador
    PLAYER.draw();
    
    // Atualizar e desenhar projéteis
    BULLET.update();
    
    // Atualizar e desenhar inimigos
    ENEMY.update();
    
    // Atualizar e desenhar boss
    if (BOSS.active && BOSS.instance) {
        BOSS.update();
    }
    
    // Verificar colisões
    COLLISION.checkAll();
    
    // Continuar o loop
    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo quando a página carregar
window.addEventListener('load', function() {
    console.log("Página carregada, iniciando jogo");
    initGame();
});
