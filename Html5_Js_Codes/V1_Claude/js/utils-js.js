// Constantes globais e funções utilitárias
const GAME = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    score: 0,
    gameOver: false
};

// Inicializar canvas
function initCanvas() {
    GAME.canvas = document.getElementById('gameCanvas');
    GAME.ctx = GAME.canvas.getContext('2d');
    GAME.canvas.width = window.innerWidth;
    GAME.canvas.height = window.innerHeight;
    GAME.width = GAME.canvas.width;
    GAME.height = GAME.canvas.height;
}

// Função para calcular distância entre dois pontos
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Redimensionar canvas quando a janela mudar de tamanho
window.addEventListener('resize', () => {
    GAME.canvas.width = window.innerWidth;
    GAME.canvas.height = window.innerHeight;
    GAME.width = GAME.canvas.width;
    GAME.height = GAME.canvas.height;
});
