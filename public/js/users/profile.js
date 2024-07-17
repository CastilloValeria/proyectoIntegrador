console.log("script esta vinculando");

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direction = document.getElementById('direction').value;
    const phone = document.getElementById('phone').value;
    
    // Verifica que los campos obligatorios no estén vacíos
    if (nombre === '' || email === '' || direction === '' || phone === '') {
        mostrarError('Por favor completares todos los campos', 'nombre');
        return false;
    } 
        // El campo está lleno, cambiar el borde a verde
    
    


	const expresionUser=/^[a-zA-Z0-9\_\-]{4,16}$/
	if(!nombre.match(expresionUser)){
        nombre.style.borderColor = "red";
	    mostrarError('Por favor ingresa un nombreválido.', 'nombre');
	    return false;
	}

    const expresionEmail =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(expresionEmail)) {
        email.style.borderColor = "red"
        mostrarError('Por favor ingresa un correo electrónico válido.', 'email');
        return false;
    }

    const expresionPhone =  /^\d{7,14}$/;
    if (!phone.match(expresionPhone)) {
        phone.style.borderColor = "red"
        mostrarError('Por favor ingresa un número de teléfono válido (10 dígitos).', 'phone');
        return false;
    }

    // Si todo está bien, se envía el formulario
    return true;
}

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direction = document.getElementById('direction').value;
    const phone = document.getElementById('phone').value;
    
    // Verifica que los campos obligatorios no estén vacíos
    if (nombre === '' || email === '' || direction === '' || phone === '') {
        mostrarError('Por favor completares todos los campos', 'nombre');
        return false;
    }

	const expresionUser=/^[a-zA-Z0-9\_\-]{4,16}$/
	if(!nombre.match(expresionUser)){
	    mostrarError('Por favor ingresa un nombreválido.', 'nombre');
	    return false;
	}

    const expresionEmail =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email.match(expresionEmail)) {
        mostrarError('Por favor ingresa un correo electrónico válido.', 'email');
        return false;
    }

    const expresionPhone =  /^\d{7,14}$/;
    if (!phone.match(expresionPhone)) {
        mostrarError('Por favor ingresa un número de teléfono válido (10 dígitos).', 'phone');
        return false;
    }

    // Si todo está bien, se envía el formulario
    return true;
}

function mostrarError(mensaje, inputId) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = mensaje;
    errorDiv.style.color = 'red';

    const input = document.getElementById(inputId);
    
    // Verificar si ya hay un div de error asociado al input y eliminarlo si es necesario
    const existingErrorDiv = input.parentNode.querySelector('.error-message');
    if (existingErrorDiv) {
        input.parentNode.removeChild(existingErrorDiv);
    }

    errorDiv.classList.add('error-message');
    input.parentNode.appendChild(errorDiv);
}


document.querySelector('.formulario').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); 
    }
});
function validarImagen(imagen) {
	const formatosValidos = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
	return formatosValidos.includes(imagen.type);
  }
  document.getElementById("image").addEventListener("change", function() {
	const imagen = this.files[0];
	if (!validarImagen(imagen)) {
		Swal.fire({
			icon: "error",
			title: "imagen no valida !",
			confirmButtonColor: "#21043d"
		  });
		  document.getElementById("image").value = ""
	 
	}
  });


document.querySelector('.formulario').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); 
        
    }
});


// const expresiones = {
// 	username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
// 	name: /^[a-zA-ZÀ-ÿ\s]{4,20}$/, // Letras y espacios, pueden llevar acentos.
// 	password: /^.{4,18}$/, // 4 a 12 digitos.
// 	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// 	phone: /^\d{7,14}$/ // 7 a 14 numeros.
// }

// parentNode:https://developer.mozilla.org/es/docs/Web/API/Node/parentNode
// parentNode es el padre del nodo actual. El padre de un elemento es un nodo del tipo Element, un nodo Document, o un nodo DocumentFragment.