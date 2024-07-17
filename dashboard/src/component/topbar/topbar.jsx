// import '../css/component/topbar.css'
import "./topbar.css";
import { NavLink } from "react-router-dom"
function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src="../../../public/logo electroGroup s texto.png" alt="" style={{    width: "100px"}} />
          <NavLink to='http://localhost:3000/' className="logo"  >ElectroGroup</NavLink>
          <h2 className="topadmin">Admin</h2>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer">       
          </div>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
  );
}
export default Topbar;