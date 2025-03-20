// funcionalidad de desplazar hacia arriba
const desplazarArriba = document.querySelector("#desplazarse-hacia-arriba");

desplazarArriba.addEventListener("click", () => {
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
    });
});

// Selecciones para Barra de navegacion hamburguesa

const hamburguesa = document.querySelector("#menu-hamburguesa");
const ul = document.querySelector("nav ul");

hamburguesa.addEventListener("click", () => {
    ul.classList.toggle("show");
});


// Cerrar el menu de hamburguesa al hacer click en un enlace

// Seleccionar enlaces de navegacion
// Selecciona todos los enlaces del menú
const navLinks = document.querySelectorAll('.nav-link');
// Selecciona el contenedor del menú (en este caso, el <ul>)
const menu = document.querySelector('nav ul');

// Agrega un evento a cada enlace para ocultar el menú al hacer clic
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
    menu.classList.remove('show');
    });
});


// navigation.js
document.addEventListener("DOMContentLoaded", () => {
    // ===================== Configuración EmailJS =====================
    emailjs.init('O0xzhGL5TpV43ZbL-'); // Public Key
    
    // ===================== Configuración del Formulario =====================
    const formulario = document.querySelector('.formulario');
    const mensajeDiv = document.getElementById('mensaje');
    
    if (!formulario || !mensajeDiv) {
        console.error('Elementos del formulario no encontrados');
        return;
    }
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Datos del formulario
        const datos = {
            nombre: formulario.querySelector('#name').value.trim(),
            apellido: formulario.querySelector('#lastname').value.trim(),
            email: formulario.querySelector('#email').value.trim(),
            mensaje: formulario.querySelector('#message').value.trim()
        };
        
        // Limpiar mensajes previos
        resetMensaje();
        
        // Validación
        if (!validarCampos(datos)) return;
        if (!validarEmail(datos.email)) return;
        
        // Enviar email
        try {
            await emailjs.sendForm(
                'service_lelo3qc', 
                'template_jma4y4n', 
                formulario
            );
            mostrarFeedback('✅ Mensaje enviado con éxito. ¡Gracias!', 'exito');
            formulario.reset();
        } catch (error) {
            mostrarFeedback(`❌ Error: ${error.message || 'Intenta nuevamente'}`, 'error');
            console.error('Error EmailJS:', error);
        }
    });
    
    // ===================== Funciones de Validación =====================
    const validarCampos = (datos) => {
        if (!datos.nombre || !datos.apellido || !datos.email || !datos.mensaje) {
            mostrarFeedback('⚠️ Todos los campos son obligatorios', 'error');
            return false;
        }
        return true;
    };
    
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            mostrarFeedback('✉️ Por favor ingresa un email válido', 'error');
            return false;
        }
        return true;
    };
    
    // ===================== Manejo de Feedback =====================
    const resetMensaje = () => {
        mensajeDiv.className = 'mensaje';
        mensajeDiv.textContent = '';
    };
    
    const mostrarFeedback = (texto, tipo) => {
        mensajeDiv.classList.add(tipo);
        mensajeDiv.style.display = 'block';
        mensajeDiv.textContent = texto;
        
        // Ocultar mensaje después de 4 segundos
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
            mensajeDiv.classList.remove('exito', 'error');
        }, 4000);
    };
});