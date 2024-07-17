window.addEventListener("load", function () {
    const formulario = document.querySelector('.login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorEmail = document.getElementById('error-email');
    const errorpassword = document.getElementById('error-password');
    
    function validarEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }
    
    
    emailInput.addEventListener("blur",function(){
        if (emailInput.value === '') {
          errorEmail.textContent = 'El campo email es obligatorio';
        } else if (!validarEmail(emailInput.value)) {
          errorEmail.textContent = 'El formato del email no es válido';
        } else {
          errorEmail.textContent = '';
        }
      }) 
      passwordInput.addEventListener("blur",function(){
        if (passwordInput.value === '') {
          errorpassword.textContent = 'El campo password es obligatorio';
        } else {
          errorpassword.textContent = '';
        }
      })
    formulario.addEventListener('submit', (e) => {
      
    
    
    e.preventDefault();
     
      if (errorEmail.textContent === '' && errorpassword.textContent === '') {
        
        formulario.submit();
        return true;
      }
    });
})
