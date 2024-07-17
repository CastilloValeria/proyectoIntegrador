const formu = document.getElementById("formulariodelete");
formu.addEventListener('submit', (e) => {
	

	
    Swal.fire({
      title: "El producto fue actualizado correctamente!",
      icon: "success" ,
  confirmButtonColor: "#21043d",
      timer: 5000,
      willClose: () => {
        window.location.href = "http://localhost:3000/products/dashboard"; // URL de destino
      }
    });
    
 
})