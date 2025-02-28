// Módulo de Interface de Usuário (UI)
const UI = (() => {
    // Elementos da UI
    const statsElement = document.getElementById('stats');
    const bossTimerElement = document.getElementById('boss-timer');
    
    // Atualizar informações de estatísticas (pontos e vida)
    function updateStats(score, playerHealth) {
        statsElement.textContent = `Pontos: ${score} | Vida: ${playerHealth}`;
    }
    
    // Atualizar informações do temporizador do boss
    function updateBossTimer(secondsLeft) {
        bossTimerElement.textContent = `Boss em: ${secondsLeft}s`;
    }
    
    // Exibir informações do boss atual e próximo
    function showBossInfo(currentBoss, nextValor, nextNaipe) {
        if (currentBoss) {
            bossTimerElement.textContent = `BOSS: ${currentBoss.valor} de ${currentBoss.naipe} | Próximo: ${nextValor} de ${nextNaipe}`;
        } else {
            bossTimerElement.textContent = `Boss em: ${secondsLeft}s | Próximo: ${nextValor} de ${nextNaipe}`;
        }
    }
    
    // Desenhar tela de game over
    function drawGameOver(ctx, canvas, score) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '48px Arial';
        ctx.fillStyle = '#e74c3c';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = '32px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(`Pontuação Final: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        
        ctx.font = '24px Arial';
        ctx.fillText('Pressione F5 para recomeçar', canvas.width / 2, canvas.height / 2 + 80);
    }
    
    // API pública
    return {
        updateStats,
        updateBossTimer,
        showBossInfo,
        drawGameOver
    };
})();
