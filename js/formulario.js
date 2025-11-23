document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form-pedido');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');
    const mensajeInput = document.getElementById('mensaje');
    const messagesDiv = document.querySelector('.messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 1. Detenemos el envío para validar

        // 2. Limpiamos errores previos
        let errors = [];
        messagesDiv.innerHTML = '';
        messagesDiv.classList.remove('show');
        
        // Quitamos bordes rojos anteriores
        [nombreInput, correoInput, telefonoInput, mensajeInput].forEach(input => {
            input.classList.remove('error');
        });

        // 3. Obtenemos valores limpios
        let nombre = nombreInput.value.trim();
        let correo = correoInput.value.trim();
        let telefono = telefonoInput.value.trim();
        let mensaje = mensajeInput.value.trim();

        // --- VALIDACIONES ---
        if (nombre.length < 3) {
            errors.push('El nombre debe tener al menos 3 caracteres.');
            nombreInput.classList.add('error');
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            errors.push('El correo electrónico no es válido.');
            correoInput.classList.add('error');
        }

        let phoneRegex = /^\d+$/;
        if (!phoneRegex.test(telefono) || telefono.length < 10) {
            errors.push('El teléfono debe tener al menos 10 números.');
            telefonoInput.classList.add('error');
        }

        if (mensaje.length === 0) {
            errors.push('El mensaje no puede estar vacío.');
            mensajeInput.classList.add('error');
        }

        // 4. DECISIÓN FINAL
        if (errors.length > 0) {
            // SI HAY ERRORES: Los mostramos
            messagesDiv.innerHTML = errors.join('<br>');
            messagesDiv.classList.add('show');
        } else {
            // SI TODO ESTÁ BIEN: Enviamos a WhatsApp con el carrito
            enviarAWhatsApp(nombre, correo, telefono, mensaje);
        }
    });

    // --- FUNCIÓN DE ENVÍO A WHATSAPP ---
    function enviarAWhatsApp(nombre, correo, telefono, mensaje) {
        const miNumero = "529514348365"; 

        // 1. Recuperamos el carrito
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito-compras')) || [];
        let resumenPedido = "";

        // ... (código anterior)

    // --- 2. Armamos la lista de productos ---
    if (carritoGuardado.length > 0) {
        resumenPedido = "\n\n🛍️ *RESUMEN DEL PEDIDO:*"; 
        carritoGuardado.forEach(prod => {
            resumenPedido += `\n✅ ${prod.titulo} (x${prod.cantidad})`;
        });
    } else {
        resumenPedido = "\n\n(El cliente no agregó productos al carrito)";
    }

    // --- 3. Armamos el mensaje final ---
    const textoMensaje = `Hola Perfums Alta, me interesa hacer un pedido:
    *Nombre:* ${nombre}
    *Correo:* ${correo}
    *Teléfono:* ${telefono}
    *Mensaje:* ${mensaje}${resumenPedido}`;

 

        // 4. Abrimos WhatsApp
        const urlWhatsApp = `https://wa.me/${miNumero}?text=${encodeURIComponent(textoMensaje)}`;
        window.open(urlWhatsApp, '_blank');
        
        
        localStorage.removeItem('carrito-compras');
        location.reload(); 
    }

});