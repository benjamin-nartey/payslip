import "./sidebar-nav.styles.css";
import { RiLogoutCircleLine } from "react-icons/ri";

const SidebarNav = () => {
  return (
    <div className="sidebar-nav">
      <RiLogoutCircleLine className="logout-icon" />
    </div>
  );
};

export default SidebarNav;
