// Módulo de Entrada (Input)
const Input = (() => {
    // Estado dos controles
    const mouse = {
        x: 0,
        y: 0,
        shooting: false
    };
    
    const keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    
    // Inicializar eventos de entrada
    function initialize(canvas) {
        // Eventos de teclado para movimento
        window.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': keys.up = true; break;
                case 's': keys.down = true; break;
                case 'a': keys.left = true; break;
                case 'd': keys.right = true; break;
            }
        });
        
        window.addEventListener('keyup', (e) => {
            switch(e.key.toLowerCase()) {
                case 'w': keys.up = false; break;
                case 's': keys.down = false; break;
                case 'a': keys.left = false; break;
                case 'd': keys.right = false; break;
            }
        });
        
        // Eventos do mouse
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                mouse.shooting = true;
            }
        });
        
        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                mouse.shooting = false;
            }
        });
        
        // Redimensionar canvas quando a janela mudar de tamanho
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // API pública
    return {
        initialize,
        mouse,
        keys
    };
})();
