import { useState, useEffect } from 'react';
import './cardInfo.css';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [Product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedUser, setEditedUser] = useState({
    
  });

  useEffect(() => {
    const fetchDatauser = async () => {
      try {
        const response = await fetch("http://localhost:3000/apiUser");
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        } else {
          console.error('Data from API is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchDataproduct = async () => {
      try {
          const response = await fetch(
              "http://localhost:3000/apiRoutes/"
          );
          const data = await response.json();
          setProduct(data);
          setFilteredProduct(data);
          updateTotalPages(data);
      } catch (error) {
          console.error('Error fetching Product data:', error);
      }
  };

  fetchDatauser();
  fetchDataproduct();
  }, []);

  const handleEditClick = (user) => {
    // Set the edited user when the edit button is clicked
    setEditedUser(user);
  };

  const handleSaveEdit = () => {
    // Implement edit logic (assuming you don't need to update the user list here)
  };

  const handleDeleteClick = (userId) => {
    // Implement delete logic (assuming you don't need to update the user list here)
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  // Get the last user only
  const lastUser = users.length > 0 ? users[users.length - 1] : null;
  const Producto = Product.length > 0 ? Product[Product.length - 1] : null;

  const totalUsers = users.length;
  const totalProduc = Product.length;
    lastUser, totalUsers, totalProduc
     
  return (
    
    <div className='contenedor'>
    <div className='dashboard'>
    <div className='destacado'>
    <div className="card">
          <p> PRODUCTO DESTACADO</p> 
          <img src='/razer-blade-15-ch9-hero-desktop.webp' className='avatarhome2' />
<p>

MARCA: Razer

RAM: 16 GB x2 (32gb) DDR4 4600MHZ

SSD: 1 TB MVME 5200MB/S

VIDEO: RTX 3080 10GB

PANTALLA: 16 IPS 165 HZ

TECLADO : MECANICO RGB

PROCESADOR: RYZEN 7 5800X
</p>
        </div>

    </div>
<div className="card-Itemusuario tamaño">

<h1>Total de usuario  <PeopleAltIcon></PeopleAltIcon> {totalUsers}</h1>
</div>
<div className="card-Itemproducto tamaño2">

<h1>Total de Producto <ShoppingBagIcon></ShoppingBagIcon>{totalProduc}</h1>
</div>
     
    {/* <img src='/razer-blade-15-ch9-hero-desktop.webp'></img> */}
      <div className="card ">
       <div className="card-Item"> 
      {lastUser && ( 
        <table className="card">
        <thead className='table-product'> Ultimo Usuario Agregado</thead>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>ID</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Assuming you have an 'imagen' property for avatar */}
              <td><img src={`http://localhost:3000/img/users/${lastUser.imagen}`} className='avatarhome' /></td>
              <td>{lastUser.name}</td>
              <td>{lastUser.email}</td>
              <td>{lastUser.id}</td>
              
            </tr>
          </tbody>
        </table>
    
      )}
      </div>
        </div>
        <div className="card ">
       <div className="card-Itemproduct"> 
      {Producto && ( 
        <table className="card">
        <thead> Ultimo Producto Agregado</thead>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Marca</th>
              <th>Precio</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Assuming you have an 'imagen' property for avatar */}
              <td><img src={ `http://localhost:3000/img/products/${Producto.Images[0].name}`} className='avatarhome' /></td>
              <td>{Producto.titulo}</td>
              <td>{Producto.brands.name}</td>
              <td>{Producto.price}</td>
              
            </tr>
          </tbody>
        </table>
    
      )}
      </div>
        </div>
        

      
        </div>
        
    </div>
    
  );
};

export default UserList;
//   return (
//     <>
//       <div className="card">
//         <div className="card-Item">
//           <span className="card-Title">Latest User</span>
//           {latestUser && (
//             <div className="card-Container">
//               <span>{latestUser.username}</span>
//               <img src={latestUser.avatar} alt="user profile" />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="card2">
//         <div className="card-Item">
//           <span className="card-Title">Latest Product</span>
//           {latestProduct && (
//             <div className="card-Container">
//               <span>{latestProduct.titulo}</span>
//               <img src={ `http://localhost:3000/img/products/${latestProduct.Images[0].name}`} className='imagenpro' />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="card3">
//         <div className="card-Item">
//           <span className="card-Title">Total Users</span>
//           <div className="card-Container">
//             <span>{totalUsers.count}</span>
//           </div>
//         </div>
//       </div>

//       <div className="card4">
//         <div className="card-Item">
//           <span className="card-Title">Total Products</span>
//           <div className="card-Container">
//             <span>{totalProducts.count}</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardInfo;