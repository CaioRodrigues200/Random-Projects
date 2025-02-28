// Módulo do sistema de boss
const BOSS = {
    instance: null,
    active: false,
    timer: 15,
    lastTimerUpdate: 0,
    baseSize: 70,
    baseSpeed: 1.5,
    baseHealth: 100,
    
    // Naipes e valores do baralho para os bosses
    naipes: ['Paus', 'Copas', 'Diamantes', 'Espadas'],
    valores: ['10', '9', '8', '7', '6', '5', '4', '3', '2', 'J', 'Q', 'K', 'A'],
    currentNaipeIndex: 0,
    currentValorIndex: 0,
    
    // Inicializar o sistema de boss
    init() {
        this.timer = 15;
        this.lastTimerUpdate = Date.now();
        this.active = false;
        this.instance = null;
        this.currentNaipeIndex = 0;
        this.currentValorIndex = 0;
    },
    
    // Atualizar o timer do boss
    updateTimer() {
        if (!this.active) {
            const now = Date.now();
            if (now - this.lastTimerUpdate >= 1000) {
                this.timer--;
                UI.updateBossTimer();
                this.lastTimerUpdate = now;
                
                if (this.timer <= 0) {
                    this.spawn();
                }
            }
        }
    },
    
    // Função para obter cor baseada no naipe
    getNaipeColor(naipe) {
        if (naipe === 'Copas' || naipe === 'Diamantes') {
            return '#e74c3c'; // Vermelho
        } else {
            return '#2c3e50'; // Preto
        }
    },
    
    // Função para obter características do boss baseadas na carta
    getStats(valor, naipe) {
        // Modificadores baseados no valor da carta
        let healthMod = 1.0;
        let speedMod = 1.0;
        let sizeMod = 1.0;
        let attackRateMod = 1.0;
        
        // Valores numéricos têm stats básicos
        if (['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor)) {
            const num = parseInt(valor);
            healthMod = 0.7 + (num / 10);
            speedMod = 0.8 + (num / 20);
            sizeMod = 0.8 + (num / 20);
        }
        
        // Cartas de figura têm stats especiais
        if (valor === 'J') {
            speedMod = 1.3;
            healthMod = 1.2;
        } else if (valor === 'Q') {
            sizeMod = 1.3;
            attackRateMod = 0.8; // Ataque mais rápido
        } else if (valor === 'K') {
            healthMod = 1.5;
            sizeMod = 1.2;
        } else if (valor === 'A') {
            healthMod = 1.7;
            speedMod = 1.2;
            sizeMod = 1.4;
            attackRateMod = 0.7; // Ataque mais rápido
        }
        
        // Modificadores baseados no naipe
        if (naipe === 'Paus') {
            healthMod *= 1.1;
        } else if (naipe === 'Copas') {
            speedMod *= 1.1;
        } else if (naipe === 'Diamantes') {
            attackRateMod *= 0.9; // Ataque mais rápido
        } else if (naipe === 'Espadas') {
            sizeMod *= 1.1;
            healthMod *= 1.05;
        }
        
        return {
            health: Math.round(this.baseHealth * healthMod),
            speed: this.baseSpeed * speedMod,
            size: this.baseSize * sizeMod,
            attackCooldown: 2000 * attackRateMod,
            color: this.getNaipeColor(naipe)
        };
    },
    
    // Função para criar um boss
    spawn() {
        const spawnSide = Math.floor(Math.random() * 4);
        let x, y;
        
        // Selecionar carta atual
        const currentValor = this.valores[this.currentValorIndex];
        const currentNaipe = this.naipes[this.currentNaipeIndex];
        const bossStats = this.getStats(currentValor, currentNaipe);
        
        // Avançar para a próxima carta
        this.currentValorIndex++;
        if (this.currentValorIndex >= this.valores.length) {
            this.currentValorIndex = 0;
            this.currentNaipeIndex++;
            if (this.currentNaipeIndex >= this.naipes.length) {
                this.currentNaipeIndex = 0; // Voltar para o início se passar por todo o baralho
            }
        }
        
        switch(spawnSide) {
            case 0: // topo
                x = GAME.width / 2;
                y = -bossStats.size;
                break;
            case 1: // direita
                x = GAME.width + bossStats.size;
                y = GAME.height / 2;
                break;
            case 2: // baixo
                x = GAME.width / 2;
                y = GAME.height + bossStats.size;
                break;
            case 3: // esquerda
                x = -bossStats.size;
                y = GAME.height / 2;
                break;
        }
        
        this.instance = {
            x: x,
            y: y,
            size: bossStats.size,
            speed: bossStats.speed,
            color: bossStats.color,
            health: bossStats.health,
            maxHealth: bossStats.health,
            lastAttack: 0,
            attackCooldown: bossStats.attackCooldown,
            valor: currentValor,
            naipe: currentNaipe
        };
        
        this.active = true;
        UI.updateBossTimer();
    },
    
    // Atualizar e desenhar o boss
    update() {
        if (!this.instance) return;
        
        // Mover boss em direção ao jogador
        const angle = Math.atan2(PLAYER.y - this.instance.y, PLAYER.x - this.instance.x);
        this.instance.x += Math.cos(angle) * this.instance.speed;
        this.instance.y += Math.sin(angle) * this.instance.speed;
        
        // Desenhar boss
        GAME.ctx.beginPath();
        GAME.ctx.arc(this.instance.x, this.instance.y, this.instance.size, 0, Math.PI * 2);
        GAME.ctx.fillStyle = this.instance.color;
        GAME.ctx.fill();
        
        // Desenhar símbolo da carta no boss
        GAME.ctx.fillStyle = this.instance.naipe === 'Copas' || this.instance.naipe === 'Diamantes' ? 'white' : '#e74c3c';
        GAME.ctx.font = `bold ${this.instance.size/2}px Arial`;
        GAME.ctx.textAlign = 'center';
        GAME.ctx.textBaseline = 'middle';
        GAME.ctx.fillText(this.instance.valor, this.instance.x, this.instance.y - this.instance.size/6);
        
        // Símbolos simplificados dos naipes
        let naipeSimbolo = '♣'; // Paus
        if (this.instance.naipe === 'Copas') naipeSimbolo = '♥';
        else if (this.instance.naipe === 'Diamantes') naipeSimbolo = '♦';
        else if (this.instance.naipe === 'Espadas') naipeSimbolo = '♠';
        
        GAME.ctx.font = `${this.instance.size/1.5}px Arial`;
        GAME.ctx.fillText(naipeSimbolo, this.instance.x, this.instance.y + this.instance.size/4);
        GAME.ctx.closePath();
        
        // Desenhar barra de vida do boss
        const barWidth = this.instance.size * 2;
        const barHeight = 10;
        const barX = this.instance.x - barWidth / 2;
        const barY = this.instance.y - this.instance.size - 20;
        
        // Fundo da barra
        GAME.ctx.fillStyle = '#333';
        GAME.ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Barra de vida atual
        const healthWidth = (this.instance.health / this.instance.maxHealth) * barWidth;
        GAME.ctx.fillStyle = '#2ecc71';
        GAME.ctx.fillRect(barX, barY, healthWidth, barHeight);
        
        // Ataque do boss
        this.handleBossAttack();
    },
    
    // Gerenciar os ataques do boss
    handleBossAttack() {
        if (!this.instance) return;
        
        if (Date.now() - this.instance.lastAttack > this.instance.attackCooldown) {
            // Padrões de ataque baseados na carta
            let angles = [];
            
            if (['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(this.instance.valor)) {
                // Número de projéteis igual ao valor da carta (mas no mínimo 2)
                const numProjectiles = Math.max(2, parseInt(this.instance.valor));
                for (let i = 0; i < numProjectiles; i++) {
                    angles.push((Math.PI * 2 * i) / numProjectiles);
                }
            } else if (this.instance.valor === 'J') {
                // J atira 4 projéteis em cruz
                angles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
            } else if (this.instance.valor === 'Q') {
                // Q atira 8 projéteis
                for (let i = 0; i < 8; i++) {
                    angles.push((Math.PI * 2 * i) / 8);
                }
            } else if (this.instance.valor === 'K') {
                // K atira 12 projéteis
                for (let i = 0; i < 12; i++) {
                    angles.push((Math.PI * 2 * i) / 12);
                }
            } else if (this.instance.valor === 'A') {
                // A atira 16 projéteis
                for (let i = 0; i < 16; i++) {
                    angles.push((Math.PI * 2 * i) / 16);
                }
            }
            
            // Cores dos projéteis baseadas no naipe
            let projectileColor = '#c0392b'; // Vermelho padrão
            if (this.instance.naipe === 'Paus') projectileColor = '#2c3e50'; // Preto
            else if (this.instance.naipe === 'Copas') projectileColor = '#e74c3c'; // Vermelho
            else if (this.instance.naipe === 'Diamantes') projectileColor = '#e67e22'; // Laranja
            else if (this.instance.naipe === 'Espadas') projectileColor = '#34495e'; // Azul escuro
            
            for (let angle of angles) {
                ENEMY.spawnBossProjectile(
                    this.instance.x,
                    this.instance.y,
                    angle,
                    ENEMY.enemySpeed * 1.5,
                    projectileColor
                );
            }
            
            this.instance.lastAttack = Date.now();
        }
    },
    
    // Causar dano no boss
    takeDamage(amount) {
        if (!this.instance) return;
        
        this.instance.health -= amount;
        
        if (this.instance.health <= 0) {
            this.defeatedBoss();
        }
    },
    
    // Gerenciar quando um boss é derrotado
    defeatedBoss() {
        this.instance = null;
        this.active = false;
        this.timer = 15;
        GAME.score += 100;
        this.lastTimerUpdate = Date.now();
        UI.updateBossTimer();
        UI.updateStats();
    }
};
