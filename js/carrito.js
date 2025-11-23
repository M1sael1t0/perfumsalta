document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIONAMOS LOS ELEMENTOS
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
    const contador = document.querySelector('.contador-carrito');

    // 2. INICIALIZAMOS EL CARRITO
    // Intentamos leer si ya hay algo guardado en el navegador, si no, empezamos vacíos.
    let carrito = JSON.parse(localStorage.getItem('carrito-compras')) || [];

    // Actualizamos el numerito apenas carga la página
    actualizarContador();

    // 3. ASIGNAMOS EL CLICK A CADA BOTÓN
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            agregarProducto(e.target);
        });
    });

    // --- FUNCIONES ---

    function agregarProducto(boton) {
        // Obtenemos la info del producto basándonos en el HTML de la tarjeta
        const tarjeta = boton.closest('.producto');
        const titulo = tarjeta.querySelector('h3').innerText;
        const precio = tarjeta.querySelector('.precio').innerText;
        const id = boton.dataset.id;

        // Revisamos si el producto ya está en el carrito
        const productoExistente = carrito.find(producto => producto.id === id);

        if (productoExistente) {
            // Si ya existe, solo aumentamos la cantidad
            productoExistente.cantidad++;
        } else {
            // Si es nuevo, lo agregamos al array
            const nuevoProducto = {
                id: id,
                titulo: titulo,
                precio: precio,
                cantidad: 1
            };
            carrito.push(nuevoProducto);
        }

        // Guardamos y actualizamos
        guardarCarrito();
        actualizarContador();

        // FEEDBACK VISUAL (Efecto en el botón)
        animarBoton(boton);
    }

    function actualizarContador() {
        // Sumamos todas las cantidades de los productos
        const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        contador.innerText = totalItems;
    }

    function guardarCarrito() {
        // Guardamos el array en el navegador (LocalStorage)
        localStorage.setItem('carrito-compras', JSON.stringify(carrito));
    }

    function animarBoton(boton) {
        // Cambiamos el texto temporalmente para que el usuario sepa que funcionó
        const textoOriginal = boton.innerText;
        boton.innerText = "¡Agregado! ✔";
        boton.style.backgroundColor = "#2a9d8f"; // Verde éxito
        boton.disabled = true; // Evita doble clic accidental

        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.style.backgroundColor = ""; // Vuelve al color original
            boton.disabled = false;
        }, 1000); // Espera 1 segundo
    }
});