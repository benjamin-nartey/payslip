import { useState } from "react";
import { useEffect } from "react";
import "./check-payslip.styles.css";
import api from "../../api/axios";
import PayslipDataTable from "../../components/payslip-data-table/payslip-data-table.component";
// const setCurrentMonthAndYear = () => {
//   const now = new Date();
//   const month = `${now.getMonth()}`.padStart(2, "0");
//   const year = now.getFullYear();

//   return `"${year}-${month}"`;
// };

const defaultFormFields = {
  payslip_date: "",
};

const CheckPayslip = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [token, setToken] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [connection, setConnection] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  const { paylip_date } = formFields;

  useEffect(() => {
    setYear(formFields.payslip_date.slice(0, 4));
    setMonth(formFields.payslip_date.slice(5));
    console.log(month);
    console.log(year);
  }, [formFields, month, year]);

  useEffect(() => {
    const getEmployeeToken = JSON.parse(localStorage.getItem("token"));
    setToken(getEmployeeToken);
    const getEmployee_id = JSON.parse(localStorage.getItem("employee_id"));
    setEmployee_id(getEmployee_id);
    const getConnection = JSON.parse(localStorage.getItem("connection"));
    setConnection(getConnection);
    console.log(employee_id, connection);
  }, [employee_id, connection, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkPayslipParams = { employee_id, month, year, connection };

    try {
      const response = await api.post("/check", checkPayslipParams, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setData(response.data?.message?.payslips);
        console.table(response.data.message.payslips);
      }
    } catch (error) {
      switch (error.code) {
        case "ERR_NETWORK":
          alert("Network Error, check internet connection");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);
  // const [pString, setpString] = useState("");
  // useEffect(() => {
  //   setpString(setCurrentMonthAndYear());
  //   console.log(pString);
  // }, [pString]);
  return (
    <div className="check-payslip-container">
      <div className="date-picker-container">
        <span>Select year and month</span>
        <form onSubmit={handleSubmit}>
          <input
            type="month"
            id="payslipDate"
            name="payslip_date"
            value={paylip_date}
            min="1995-03"
            defaultValue="2022-05"
            // max="2023-01"
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
      <PayslipDataTable data={data} />
    </div>
  );
};

export default CheckPayslip;
