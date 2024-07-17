

console.log("vinculado");

//Armo un evento para que cuando clickee, me traiga por consola todos los datos
const addCart =  async (e,product_id,user_id) => {
  e.preventDefault();
  console.log(e);
  console.log(product_id);
  console.log(user_id);
  const response = await fetch(`http://${location.hostname}:${location.port}/apiRoutes/addCart`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id,
      product_id
    })
  })

  if(response.ok){
    Swal.fire({
      icon:'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error al agregar al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }
}