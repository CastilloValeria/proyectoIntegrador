window.onload = async () => {
    const productCartItems = document.querySelector('.product-cart__items');
    const getProducts = JSON.parse(localStorage.getItem('addedToCart'));
  
    if (getProducts.length >= 1) {
      getProducts.forEach((product) => {
        const productElement = createProductElement(product);
        productCartItems.appendChild(productElement);
      });
  
      calculateTotals();
    } else {
      // Handle the empty cart scenario (optional: display a message)
    }
  };
  
  function createProductElement(product) {
    const element = document.createElement('div');
    element.classList.add('product-cart__item');
  
    // Image
    const image = document.createElement('img');
    image.src = `/img/${product.image}`; 
    image.alt = product.name;
    element.appendChild(image);
  
    // Product details
    const details = document.createElement('div');
    details.classList.add('product-cart__item-details');
  
    const name = document.createElement('h3');
    name.innerText = product.name;
    details.appendChild(name);
  
    const price = document.createElement('p');
    price.innerText = `Precio: $${product.price}`;
    details.appendChild(price);

    // Add details to the product element
    element.appendChild(details);
  
    return element;
  }
  
  function calculateTotals() {
   
  }
  