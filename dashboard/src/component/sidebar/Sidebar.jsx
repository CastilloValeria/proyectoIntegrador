import './sidebar.css'
// import {
//   LineStyle,
//   Timeline,
//   TrendingUp,
//   PermIdentity,
//   Storefront,
//   AttachMoney, 
//   BarChart,
//   MailOutline,
//   DynamicFeed,
//   ChatBubbleOutline,
//   WorkOutline,
//   Report,
// } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> 
           Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem ">
            <HomeIcon></HomeIcon> 
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <AccountCircleIcon></AccountCircleIcon>
                 Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <ShoppingBasketIcon></ShoppingBasketIcon>
                Products
              </li>
            </Link>
          </ul>
        </div>
        
        <div className="sidebarMenu">
        </div>
      </div>
    </div>
  );
}
export default Sidebar;