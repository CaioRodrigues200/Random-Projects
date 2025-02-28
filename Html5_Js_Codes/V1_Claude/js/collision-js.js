// Módulo de colisões
const COLLISION = {
    // Verificar todas as colisões
    checkAll() {
        this.checkBulletEnemyCollisions();
        this.checkBulletBossCollisions();
        this.checkPlayerEnemyCollisions();
        this.checkPlayerBossCollisions();
    },
    
    // Colisões entre projéteis e inimigos
    checkBulletEnemyCollisions() {
        for (let i = BULLET.bullets.length - 1; i >= 0; i--) {
            const bullet = BULLET.bullets[i];
            
            for (let j = ENEMY.enemies.length - 1; j >= 0; j--) {
                const enemy = ENEMY.enemies[j];
                
                // Ignorar projéteis do boss para esta verificação
                if (enemy.isBossProjectile) continue;
                
                const dist = distance(bullet.x, bullet.y, enemy.x, enemy.y);
                
                if (dist < bullet.size + enemy.size) {
                    enemy.health -= 10;
                    
                    if (enemy.health <= 0) {
                        ENEMY.enemies.splice(j, 1);
                        GAME.score += 10;
                        UI.updateStats();
                    }
                    
                    BULLET.bullets.splice(i, 1);
                    break;
                }
            }
        }
    },
    
    // Colisões entre projéteis e o boss
    checkBulletBossCollisions() {
        if (!BOSS.instance) return;
        
        for (let i = BULLET.bullets.length - 1; i >= 0; i--) {
            const bullet = BULLET.bullets[i];
            
            const dist = distance(bullet.x, bullet.y, BOSS.instance.x, BOSS.instance.y);
            
            if (dist < bullet.size + BOSS.instance.size) {
                BOSS.takeDamage(5);
                BULLET.bullets.splice(i, 1);
            }
        }
    },
    
    // Colisões entre jogador e inimigos/projéteis
    checkPlayerEnemyCollisions() {
        for (let i = ENEMY.enemies.length - 1; i >= 0; i--) {
            const enemy = ENEMY.enemies[i];
            
            const dist = distance(PLAYER.x, PLAYER.y, enemy.x, enemy.y);
            
            if (dist < PLAYER.size / 2 + enemy.size) {
                if (enemy.isBossProjectile) {
                    // Dano maior para projéteis do boss
                    PLAYER.takeDamage(15);
                } else {
                    PLAYER.takeDamage(10);
                }
                
                ENEMY.enemies.splice(i, 1);
            }
        }
    },
    
    // Colisão entre jogador e boss
    checkPlayerBossCollisions() {
        if (!BOSS.instance) return;
        
        const dist = distance(PLAYER.x, PLAYER.y, BOSS.instance.x, BOSS.instance.y);
        
        if (dist < PLAYER.size / 2 + BOSS.instance.size) {
            PLAYER.takeDamage(1); // Dano contínuo enquanto estiver em colisão
        }
    }
};
