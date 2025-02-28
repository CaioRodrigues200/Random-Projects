// Módulo de Depuração
const DEBUG = {
    enabled: true,
    
    // Adicionar informações de depuração ao canvas
    drawInfo() {
        if (!this.enabled) return;
        
        const info = [
            `FPS: ${Math.round(1000 / (Date.now() - this.lastFrame))}`,
            `Jogador: (${Math.round(PLAYER.x)}, ${Math.round(PLAYER.y)})`,
            `Inimigos: ${ENEMY.enemies.length}`,
            `Projéteis: ${BULLET.bullets.length}`,
            `Boss: ${BOSS.active ? 'Ativo' : 'Inativo'}`
        ];
        
        GAME.ctx.font = '14px Arial';
        GAME.ctx.fillStyle = '#fff';
        GAME.ctx.textAlign = 'left';
        
        info.forEach((text, index) => {
            GAME.ctx.fillText(text, GAME.width - 200, 20 + (index * 20));
        });
        
        this.lastFrame = Date.now();
    },
    
    lastFrame: Date.now(),
    
    // Destacar hitboxes dos objetos
    drawHitboxes() {
        if (!this.enabled) return;
        
        // Hitbox do jogador
        GAME.ctx.beginPath();
        GAME.ctx.arc(PLAYER.x, PLAYER.y, PLAYER.size/2, 0, Math.PI * 2);
        GAME.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        GAME.ctx.lineWidth = 2;
        GAME.ctx.stroke();
        GAME.ctx.closePath();
        
        // Hitboxes dos inimigos
        ENEMY.enemies.forEach(enemy => {
            GAME.ctx.beginPath();
            GAME.ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
            GAME.ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            GAME.ctx.lineWidth = 2;
            GAME.ctx.stroke();
            GAME.ctx.closePath();
        });
        
        // Hitbox do boss
        if (BOSS.instance) {
            GAME.ctx.beginPath();
            GAME.ctx.arc(BOSS.instance.x, BOSS.instance.y, BOSS.instance.size, 0, Math.PI * 2);
            GAME.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
            GAME.ctx.lineWidth = 2;
            GAME.ctx.stroke();
            GAME.ctx.closePath();
        }
    }
};
