import "./login.component.styles.css";
// import Select from "react-select";
import { options } from "../../utils/select-subsidiary.utils";
import { useState } from "react";

const defaultFormFields = {
  subsidiary: "",
  staffNo: "",
  token: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { subsidiary, staffNo, token } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  console.log(formFields);
  return (
    <div className="login-container">
      <form action="">
        <div className="form-input-container">
          <select
            onChange={handleChange}
            value={subsidiary}
            className="input-control"
            name="subsidiary"
          >
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            className="staff-no input-control"
            type="text"
            placeholder="Enter staff number"
            name="staffNo"
            value={staffNo}
            onChange={handleChange}
          />
          <input
            className="token input-control"
            type="text"
            placeholder="Enter token"
            name="token"
            value={token}
            onChange={handleChange}
          />
          <button className="submit input-control" type="submit">
            Generate Token
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
