import logo from "../../assets/logo-cocobod.png";
import { ReactComponent as HeroImage } from "../../assets/Asset 2svghero.svg";
import { ReactComponent as CocoaLeave } from "../../assets/Asset 1leaveSvg.svg";
import { ReactComponent as CocoaFlower } from "../../assets/Asset 1svghero 1cocoaflower.svg";
import Login from "../../components/login/login.component";
import "./home.styles.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-container-left-column">
          <div className="brown-nav-column"></div>
          <div className="hero-img-container">
            <HeroImage className="hero-image" />
          </div>
        </div>
        <div className="home-container-right-column">
          <div className="logo-header-container">
            <div className="logo-container">
              <img src={logo} alt="coocbod logo" />
            </div>
            <h2 className="brand-name">GHANA COCOA BOARD</h2>
            <span className="payslip-text">Payslip</span>
          </div>
          <Login />
        </div>
      </div>
      <CocoaLeave className="cocoa-leave" />
      <CocoaFlower className="cocoa-flower" />
    </>
  );
};

export default Home;
