import "./clip-loader-spinner.styles.css";
import ClipLoader from "react-spinners/ClipLoader";

const ClipLoaderSpinner = () => {
  return (
    <div className="clip-loader-container">
      <ClipLoader size={25} />
    </div>
  );
};

export default ClipLoaderSpinner;
