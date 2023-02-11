import "./top-navbar.styles.css";
import Logo from "../../assets/logo-cocobod.png";
import { BiMenuAltRight } from "react-icons/bi";

const TopNavbar = ({toggleSidebarNav}) => {
  return (
    <div className="top-navbar">
      <div className="logo-box">
        <img src={Logo} alt="cocobod-logo" />
      </div>
      <div className="welcome-div">
        <span className="welcome-text-main">
          Welcome<span className="welcome-text-sub"> Bright</span>
        </span>
      </div>
      <BiMenuAltRight className="menu-icon" onClick={toggleSidebarNav}/>
    </div>
  );
};

export default TopNavbar;
