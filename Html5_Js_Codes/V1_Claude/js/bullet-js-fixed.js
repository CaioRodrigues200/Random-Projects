// Módulo de projéteis
const BULLET = {
    bullets: [],
    bulletSpeed: 10,
    bulletSize: 5,
    bulletColor: '#f1c40f',
    lastShot: 0,
    shootingCooldown: 150, // tempo em ms entre tiros
    
    // Atirar um novo projétil
    shoot() {
        if (Date.now() - this.lastShot > this.shootingCooldown) {
            const angle = Math.atan2(INPUT.mouseY - PLAYER.y, INPUT.mouseX - PLAYER.x);
            
            this.bullets.push({
                x: PLAYER.x,
                y: PLAYER.y,
                speed: this.bulletSpeed,
                size: this.bulletSize,
                color: this.bulletColor,
                dx: Math.cos(angle) * this.bulletSpeed,
                dy: Math.sin(angle) * this.bulletSpeed
            });
            
            this.lastShot = Date.now();
        }
    },
    
    // Atualizar e desenhar projéteis
    update() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            
            bullet.x += bullet.dx;
            bullet.y += bullet.dy;
            
            // Remover projéteis fora da tela
            if (
                bullet.x < 0 ||
                bullet.x > GAME.width ||
                bullet.y < 0 ||
                bullet.y > GAME.height
            ) {
                this.bullets.splice(i, 1);
                continue;
            }
            
            // Desenhar projétil
            GAME.ctx.beginPath();
            GAME.ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
            GAME.ctx.fillStyle = bullet.color;
            GAME.ctx.fill();
            GAME.ctx.closePath();
        }
    }
};
