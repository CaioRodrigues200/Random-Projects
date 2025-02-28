// Módulo de inimigos
const ENEMY = {
    enemies: [],
    enemySize: 25,
    enemySpeed: 2,
    enemyColor: '#e74c3c',
    lastEnemySpawn: 0,
    enemySpawnRate: 1000, // ms entre spawns de inimigos
    
    // Criar um novo inimigo
    spawn() {
        let x, y;
        
        // Spawnar inimigos fora da tela
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? -this.enemySize : GAME.width + this.enemySize;
            y = Math.random() * GAME.height;
        } else {
            x = Math.random() * GAME.width;
            y = Math.random() < 0.5 ? -this.enemySize : GAME.height + this.enemySize;
        }
        
        this.enemies.push({
            x: x,
            y: y,
            size: this.enemySize,
            speed: this.enemySpeed,
            color: this.enemyColor,
            health: 20
        });
    },
    
    // Criar um projétil do boss
    spawnBossProjectile(x, y, angle, speed, color, lifeTime) {
        this.enemies.push({
            x: x,
            y: y,
            size: this.enemySize * 0.8,
            speed: speed,
            color: color,
            health: 10,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            isBossProjectile: true,
            lifeTime: lifeTime || 3000 // 3 segundos de vida para os projéteis do boss
        });
    },
    
    // Atualizar e desenhar inimigos
    update() {
        // Spawnar inimigos se não tiver boss
        if (!BOSS.active && Date.now() - this.lastEnemySpawn > this.enemySpawnRate) {
            this.spawn();
            this.lastEnemySpawn = Date.now();
        }
        
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            
            // Se for um projétil do boss, verificar tempo de vida
            if (enemy.isBossProjectile) {
                // Decrementar tempo de vida
                enemy.lifeTime -= 16; // Aproximadamente 16ms por frame
                
                // Remover projétil se o tempo acabou
                if (enemy.lifeTime <= 0) {
                    this.enemies.splice(i, 1);
                    continue;
                }
                
                // Mover em linha reta ao invés de seguir o jogador
                enemy.x += enemy.dx;
                enemy.y += enemy.dy;
            } else {
                // Mover inimigo normal em direção ao jogador
                const angle = Math.atan2(PLAYER.y - enemy.y, PLAYER.x - enemy.x);
                enemy.x += Math.cos(angle) * enemy.speed;
                enemy.y += Math.sin(angle) * enemy.speed;
            }
            
            // Desenhar inimigo
            GAME.ctx.beginPath();
            GAME.ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
            GAME.ctx.fillStyle = enemy.color;
            GAME.ctx.fill();
            GAME.ctx.closePath();
        }
    }
};
