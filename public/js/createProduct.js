const addButton = document.querySelector('#add-property');
const containerProperty = document.querySelector('#container-add-inputs');
const inputName = document.querySelector('#titulo');
const inputPrecio = document.querySelector('#price');
const inputImage = document.querySelector('#imagen');
const selectBrand = document.querySelector('#brand');
const regex = new RegExp(/^[^\s]+\.(jpg|jpeg|png|gif|bmp)$/gm);
const types = ['image/jpeg','image/png']
const validateImage = (filename) => {
    return types.includes(filename);
}

const isEmpty = (value) => {
    return value == '';
}

const minLength = (value) => {
    return value.length >= 3;
}

const addError = (element,error) => {
    element.innerText = `${error}`;
    element.style.display = "inline";
}

inputName.addEventListener('blur', function (e) {
    let error = document.querySelector('#ErrorName');
    if (isEmpty(e.target.value)) {
        addError(error,'El campo no debe estar vacio')
        return;
    }else if (!minLength(e.target.value)) {
        addError(error,'Debe tener un minimo de 3 caracteres')
        return;    
    }
    error.style.display = 'none';


})

inputPrecio.addEventListener('blur',function (e) {
    
    let error = document.querySelector('#ErrorPrice');
    if (isEmpty(e.target.value)) {
        addError(error,'El campo no debe estar vacio')
        return;
    }

    if (e.target.value <= 0){
        addError(error,'El precio no puede ser igual o menor a 0')
        return;    
    }

    error.style.display = 'none';
})

window.onload = function () {
    
}
addButton.addEventListener('click', function (e) {
    const inputKey = document.createElement("input")
    const labelKey = document.createElement("label")
    const inputValue = document.createElement("input")
    const labelValue = document.createElement("label")
    const container = document.createElement("div")
    const containerKey = document.createElement("div")
    const containerValue = document.createElement("div")
    const removeButton = document.createElement('a');
    const messageErrorKey = document.createElement('p')
    const messageErrorValue = document.createElement('p')
    
    containerValue.classList.add('container-inputs');
    containerKey.classList.add('container-inputs');
    container.classList.add('container_inputs_especificaciones');
    container.id = `container${containerProperty.childElementCount}`
    removeButton.classList.add('buttonRemoveInput')
    removeButton.innerText = 'Eliminar'
    removeButton.addEventListener('click', function() {
        containerProperty.removeChild(container);
    })

    inputKey.addEventListener('blur',function(e){
        if(isEmpty(e.target.value)) { 
            addError(messageErrorKey,'El campo no puede estar vacio');
            return;
        }

        if(!minLength(e.target.value)) {
            addError(messageErrorKey,'El valor debe tener un minimo de 3 caracteres');
            return;
        }

        messageErrorKey.style.display = 'none';
    })
    
    inputValue.addEventListener('blur',function(e){
        if(isEmpty(e.target.value)){
            addError(messageErrorValue,'El campo no puede estar vacio'); 
            return 
        }

        if(!minLength(e.target.value)) { 
            addError(messageErrorValue,'El valor debe tener un minimo de 3 caracteres');
            return;
        }

        messageErrorValue.style.display = 'none';
    })

    labelKey.innerText = "Especficacion";
    inputKey.placeholder = "Ingrese una especficacion";
    labelValue.innerText = "Detalle";
    inputValue.placeholder = "Ingrese el detalle";
    inputKey.id = `key${containerProperty.childElementCount}`;
    inputValue.id = `value${containerProperty.childElementCount}`
    inputKey.classList.add("custom-input");
    inputValue.classList.add("custom-input");
    containerKey.appendChild(labelKey);
    containerKey.appendChild(inputKey);
    containerKey.appendChild(messageErrorKey);
    containerValue.appendChild(labelValue);
    containerValue.appendChild(inputValue);
    containerValue.appendChild(messageErrorValue);
    container.appendChild(containerKey);
    container.appendChild(containerValue);
    container.appendChild(removeButton);
    containerProperty.appendChild(container)

})

document.addEventListener('submit', function (e) {
    e.preventDefault();
    const variables = document.querySelectorAll('.column');
    const errores = []

    variables.forEach(element => {
        if(element.value == '') {
            errores.push(`${element.name} no debe estar vacio`) 
            return; 
        }

        if (element.id == 'price' && element.value <= 0) {
            errores.push(`${element.name} no puede ser menor o igual a 0 `) 
            return;
        }

        if (element.value.length < 3 && element.id != 'price') {
            errores.push(`${element.name} debe tener un minimo de 3 caracteres `) 
            return;
        }

        if (element.id == 'imagen') {
            if(element.files.length > 1){
                for(const file in element.files){
                    if(element.files[file].type && !validateImage(element.files[file].type)){
                        errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                        return
                    }
                }
            }else{
                
                if (!validateImage(element.files[0].type)){
                    errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                    return;
                }
            }
        }
    })

    const allproperty = document.querySelectorAll('.custom-input');

    //valido que exista una especificacion
    if (allproperty.length > 1) {
        //itero sobre los custom inputs
        try {
            allproperty.forEach( input => {
                //valido por las distintas reglas y agrego el error si corresponde
                if (isEmpty(input.value)){
                    throw new Error("Una de las especificaciones se encuentra vacia"); 
                }
        
                if (!minLength(input.value)){
                    throw new Error("Una de las especificaciones no cumple con el minimo de caracteres")
                }
            });
        } catch (error) {
            errores.push(error.message)
        }
    
    }else{
        errores.push("Debe agregar al menos una especificación");
    }

    //Verifico si existen errores despues de realizar las validaciones
    if (errores.length >= 1) {
        let mensaje = '<ul>';
        errores.forEach(err => {
            mensaje += `<li>⦿ ${err}</li>`
        })
        mensaje += '</ul>'
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: mensaje,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }else{
        const array = [];
        const description = {};
        allproperty.forEach(input => {
            array.push(input.value)
        })

        array.forEach((value,i) =>{
            if (i % 2== 0) {
                description[value] = array[i+1]
            }
        })

        const data = {
            titulo: inputName.value,
            description:JSON.stringify(description),
            price: inputPrecio.value,
            brand: selectBrand.value,
        }
        
        const formData  = new FormData();
        
        for(const name in data) {
            formData.append(name, data[name]);
        }

        let files = inputImage.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            formData.append('images', file);
        }

        fetch(`http://localhost:3000/apiRoutes/create`,{
            method:'POST',
            body: formData
        }).then(response => {
            if(response.ok){
                response.json().then( product => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Se creo el producto ${product.titulo}`,
                        showConfirmButton: false,
                        timer: 5000
                    }).then(res => {
                        window.location.href = `http://localhost:${window.location.port}/products/`;
                    })
                })
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio Mal!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
        }).catch(err => {
            console.log(err);
        })
    }
})