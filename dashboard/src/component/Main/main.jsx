import Topbar from '../topbar/topbar';
import Sidebar from '../sidebar/Sidebar';
import CardInfo from "../info/cardInfo"
import UserList from '../User/UserList';
import ProductList from '../products/productList';
import { Routes,Route } from 'react-router-dom';
import './main.css'

function Main() {
  return (
    <div className="Main">
        <Topbar />
      <div className="MainWidgets">
        <Sidebar />
        
      <Routes>
          <Route path="/" element={<CardInfo />} />
          <Route path="/users" element={<UserList />} />
          {/* <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} /> */}
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/product/:productId" element={<Product />} /> */}
        {/* <Route path="/newproduct" element={<NewProduct />} /> */}
        </Routes>
      </div>
      
    </div>
    
  );
}
export default Main;