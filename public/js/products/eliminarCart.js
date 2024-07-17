async function eliminar (id) {

    try {
    
    const response = await fetch(`http://${location.hostname}:${location.port}/apiRoutes/deleteCart/${id}`, {
    
    method: 'DELETE',
    
    headers: {
    
    "Accept": 'application/json',
    
    "Content-Type": 'application/json'
    }
});
    
    console.log("RESPONSE:",JSON.stringify(response));
    
    if (response.ok){
    
    const result = await Swal.fire({
    
    title: "Estas seguro",
    
    icon: "warning",
    
    showCancelButton: true,
    
    confirmButtonColor: "#388506",
    
    cancelButtonColor: "#d33",
    
    confirmButtonText: "Si, eliminar"
    })
    
    if (result.isConfirmed) {
    
    // Recargar la página después de que el usuario confirme
    
    window.location.reload();
    
    window.scrollTo(0, 0);
    
    };
    
}else{
    
    alert("Dcurrió un error al horrar el producte");
}
} catch (error) {
    
    console.error ('Error', error);
    
    alert("Scurrió un errer al realizar la operación")
}
}