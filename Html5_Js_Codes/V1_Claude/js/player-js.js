// Módulo do jogador
const PLAYER = {
    x: 0,
    y: 0,
    size: 30,
    speed: 5,
    color: '#3498db',
    direction: 0,
    health: 100,
    moving: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    
    // Inicializar o jogador
    init() {
        this.x = GAME.width / 2;
        this.y = GAME.height / 2;
        this.health = 100;
    },
    
    // Mover o jogador
    move() {
        if (this.moving.up) this.y -= this.speed;
        if (this.moving.down) this.y += this.speed;
        if (this.moving.left) this.x -= this.speed;
        if (this.moving.right) this.x += this.speed;
        
        // Manter o jogador dentro do canvas
        this.x = Math.max(this.size / 2, Math.min(GAME.width - this.size / 2, this.x));
        this.y = Math.max(this.size / 2, Math.min(GAME.height - this.size / 2, this.y));
        
        // Atualizar direção do jogador (para onde está olhando)
        this.direction = Math.atan2(INPUT.mouseY - this.y, INPUT.mouseX - this.x);
    },
    
    // Desenhar o jogador
    draw() {
        // Corpo do jogador
        GAME.ctx.beginPath();
        GAME.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        GAME.ctx.fillStyle = this.color;
        GAME.ctx.fill();
        GAME.ctx.closePath();
        
        // Linha de direção/mira
        const dirX = this.x + Math.cos(this.direction) * this.size;
        const dirY = this.y + Math.sin(this.direction) * this.size;
        
        GAME.ctx.beginPath();
        GAME.ctx.moveTo(this.x, this.y);
        GAME.ctx.lineTo(dirX, dirY);
        GAME.ctx.strokeStyle = '#fff';
        GAME.ctx.lineWidth = 3;
        GAME.ctx.stroke();
        GAME.ctx.closePath();
    },
    
    // Receber dano
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            GAME.gameOver = true;
        }
        UI.updateStats();
    }
};
