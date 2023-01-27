import "./login.component.styles.css";
// import Select from "react-select";
import { options } from "../../utils/select-subsidiary.utils";
import { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import SpiClipLoaderSpinnerSpinner from "../clip-loader/clip-loader-spinner.component";
import api from "../../api/axios";
import ClipLoaderSpinner from "../clip-loader/clip-loader-spinner.component";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const brandColor = "#624736";

const defaultFormFields = {
  subsidiary: "",
  staff_number: "",
  verification_code: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { subsidiary, staff_number, verification_code } = formFields;
  const [isVerifiedToken, setIsVerifiedToken] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buttonState = {
    button: "generateToken",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (buttonState.button === "generateToken") {
      const loginRequestParams = { subsidiary, staff_number };

      try {
        setLoading(true);

        const response = await api.post("/login", loginRequestParams);
        console.log(response);

        const token = response.data?.token;
        const email = response.data?.email_verify?.toLowerCase();

        setEmail(email);
        setToken(token);
        if (token) {
          setLoading(false);
        }

        if (response.data) {
          const generateTokenParams = {
            // email: response.data?.email_verify?.toLowerCase()
            email: " benjaminnartey37@gmail.com",
          };
          const responseToken = await api.post(
            "/generateOTP",
            generateTokenParams,
            {
              headers: {
                Authorization: `Bearer ${response.data?.token}`,
              },
            }
          );
          console.log(responseToken);
        }
      } catch (error) {
        switch (error.code) {
          case "ERR_NETWORK":
            alert("Network error, check your internet connection");
            break;
          case "ERR_BAD_REQUEST":
            alert(
              "Request Error, make sure your subsidiary matches your Staff Id"
            );
            break;
          default:
            console.log(error.code);
        }
        setLoading(false);
        console.log(error);
      }
    }

    if (buttonState.button === "login") {
      const verificationParams = { verification_code };

      try {
        const responseData = await api.post("/verify", verificationParams, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("here is the return object", responseData);

        if (responseData.data?.success) {
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/check-payslip");
        }

        switch (responseData.data?.error) {
          case "Token does not match":
            alert("Invalid Token");
            break;
          case "Token Expired":
            alert("Token Expired");
          default:
            console.log(responseData.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  console.log(formFields);

  console.log(email, token);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
          <select
            onChange={handleChange}
            value={subsidiary}
            className="input-control"
            name="subsidiary"
            required
          >
            <option value="0">Select subsidiary</option>
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
            name="staff_number"
            value={staff_number}
            onChange={handleChange}
            required
          />

          {token && (
            <>
              <span>
                A token has been sent to <span className="email">{email}</span>
              </span>

              <input
                className="token input-control"
                type="text"
                placeholder="Enter token"
                name="verification_code"
                value={verification_code}
                onChange={handleChange}
                required
              />
            </>
          )}

          {!token ? (
            <button
              disabled={loading ? true : false}
              onClick={() => (buttonState.button = "generateToken")}
              className="submit input-control"
              type="submit"
            >
              Generate Token
              {loading && (
                <ClipLoaderSpinner
                  color={brandColor}
                  loading={loading}
                  cssOverride={override}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </button>
          ) : (
            <button
              onClick={() => (buttonState.button = "login")}
              className="submit input-control"
              type="submit"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
