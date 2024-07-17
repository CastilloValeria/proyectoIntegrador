const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")
const expresiones = {
	brand: /^[a-zA-Z0-9\_\-]{2,10}$/, // Letras, numeros, guion y guion_bajo
	titulo: /^[a-zA-ZÀ-ÿ0-9\s]{1,99}$/, // Letras y espacios, pueden llevar acentos.
	description: /^[a-zA-ZÀ-ÿ0-9\s]{1,400}$/,
	price: /^\d{4,20}$/ // 7 a 14 numeros.
  
}
const campos = {
	titulo: false,
	brand: false,
	description: false,
	price: false
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "titulo":
			validarCampo(expresiones.titulo, e.target, 'titulo');
		break;
		case "brand":
			validarCampo(expresiones.brand, e.target, 'brand');
		break;
		case "description":
			validarCampo(expresiones.description, e.target, 'description');
		break;
		case "price":
			validarCampo(expresiones.price, e.target, 'price');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	

	if( campos.price  ){
    Swal.fire({
      title: "El producto fue actualizado correctamente!",
      icon: "success" ,
  confirmButtonColor: "#21043d",
      timer: 5000,
      willClose: () => {
        window.location.href = "http://localhost:3000/products/dashboard"; // URL de destino
      }
    });
    
  } else {
    
      Swal.fire({
        icon: "error",
        title: "Formulario Incompleto",
        text: "Complete el formulario!",
        confirmButtonColor: "#21043d",
      });
      e.preventDefault();
	}
})