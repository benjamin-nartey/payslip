import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./check-payslip.styles.css";
import api from "../../api/axios";
import { RiCloseFill, RiDownload2Fill } from "react-icons/ri";
import PayslipReceipt from "../../components/payslip-receipt/payslip-receipt.component";

// const setCurrentMonthAndYear = () => {
//   const now = new Date();
//   const month = `${now.getMonth()}`.padStart(2, "0");
//   const year = now.getFullYear();

//   return `"${year}-${month}"`;
// };
const payslipLabelString = "payslip for";
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
  // const [toggle, setToggle] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [payslipTitle, setPayslipTitle] = useState("");
  const printRef = useRef(null);

  const { payslip_date } = formFields;

  const yearPayslip = payslip_date.slice(0, 4);
  const monthPayslip = payslip_date.slice(5, 8);

  const formatDate = (month, year) => {
    switch (month) {
      case "01":
        month = "january";
        break;
      case "02":
        month = "february";
        break;
      case "03":
        month = "march";
        break;
      case "04":
        month = "april";
        break;
      case "05":
        month = "may";
        break;
      case "06":
        month = "june";
        break;
      case "07":
        month = "july";
        break;
      case "08":
        month = "august";
        break;
      case "09":
        month = "september";
        break;
      case "10":
        month = "october";
        break;
      case "11":
        month = "november";
        break;
      case "12":
        month = "december";
        break;
      default:
    }

    return `${month} ${year}`;
  };

  const generatedPayslipDate = formatDate(monthPayslip, yearPayslip);
  useEffect(() => {
    setPayslipTitle(generatedPayslipDate);
  }, []);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const pdf = new jsPDF("portrait", "px", [380, 380]);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    await html2canvas(element, { scale: 5 }).then(function (canvas) {
      const PdfLabel = `${payslipLabelString} ${generatedPayslipDate}`;
      var data = canvas.toDataURL("image/png");
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(PdfLabel);
    });
  };

  useEffect(() => {
    setYear(formFields.payslip_date.slice(0, 4));
    setMonth(formFields.payslip_date.slice(5));
    // console.log(month);
    // console.log(year);
  }, [formFields, month, year]);

  useEffect(() => {
    const getEmployeeToken = JSON.parse(localStorage.getItem("token"));
    setToken(getEmployeeToken);
    const getEmployee_id = JSON.parse(localStorage.getItem("employee_id"));
    setEmployee_id(getEmployee_id);
    const getConnection = JSON.parse(localStorage.getItem("connection"));
    setConnection(getConnection);
    // console.log(employee_id, connection);
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
        // console.table(response.data.message.payslips);
        setFormSubmitted(true);
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

  // const [pString, setpString] = useState("");
  // useEffect(() => {
  //   setpString(setCurrentMonthAndYear());
  //   console.log(pString);
  // }, [pString]);
  return (
    <div className="check-payslip-container">
      {!formSubmitted && (
        <div className="date-picker-container">
          <span>Select year and month</span>
          <form onSubmit={handleSubmit}>
            <input
              type="month"
              id="payslipDate"
              name="payslip_date"
              value={payslip_date}
              min="1995-03"
              // defaultValue="2022-05"
              // max="2023-01"
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      )}
      {formSubmitted && (
        <div className="payslip-main-container">
          <PayslipReceipt
            payslipTitle={payslipTitle}
            printRef={printRef}
            style={{ height: "380px" }}
            data={data}
          />
          <div className="closeBtn-container">
            <RiCloseFill
              className="close-btn "
              onClick={() => setFormSubmitted(false)}
            />
          </div>
          <div className="downloadBtn-container">
            <RiDownload2Fill
              onClick={handleDownloadPdf}
              className="downloadBtn"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPayslip;
