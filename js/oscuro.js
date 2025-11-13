// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECCIONAR LOS ELEMENTOS
    const botonModoOscuro = document.getElementById('modo-oscuro-btn');
    const body = document.body;

    // 2. FUNCIÓN PARA CAMBIAR EL MODO
    function toggleModoOscuro() {
        // Alterna (pone o saca) la clase '.dark-mode' en el <body>
        body.classList.toggle('dark-mode');

        // 3. GUARDAR LA PREFERENCIA Y CAMBIAR EL ÍCONO
        if (body.classList.contains('dark-mode')) {
            // Si AHORA está en modo oscuro:
            localStorage.setItem('modo-oscuro', 'true'); // Guarda la preferencia
            botonModoOscuro.textContent = '☀️'; // Cambia el ícono a sol
            botonModoOscuro.setAttribute('title', 'Activar modo claro');
        } else {
            // Si AHORA está en modo claro:
            localStorage.setItem('modo-oscuro', 'false'); // Guarda la preferencia
            botonModoOscuro.textContent = '🌙'; // Cambia el ícono a luna
            botonModoOscuro.setAttribute('title', 'Activar modo oscuro');
        }
    }

    // 4. REVISAR AL CARGAR LA PÁGINA
    // (Para que recuerde el modo si el usuario recarga)
    if (localStorage.getItem('modo-oscuro') === 'true') {
        // Si estaba en modo oscuro, lo activa
        body.classList.add('dark-mode');
        botonModoOscuro.textContent = '☀️';
        botonModoOscuro.setAttribute('title', 'Activar modo claro');
    }

    // 5. ASIGNAR EL EVENTO AL BOTÓN
    // Cuando el usuario haga clic en el botón, llama a la función
    botonModoOscuro.addEventListener('click', toggleModoOscuro);

});