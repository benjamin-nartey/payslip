import "./payslip-receipt.styles.css";
import PayslipDataTable from "../payslip-data-table/payslip-data-table.component";
import cocobodLogo from "../../assets/logo-cocobod.png";
import { useState, useEffect } from "react";
const PayslipReceipt = ({ data, printRef }) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data[0]);
  }, [data]);
  return (
    <div
      ref={printRef}
      className="payslip-receipt-container"
      style={{ padding: "20px", size: "A4" }}
    >
      {[newData]?.map((staffData) => (
        <div>
          <div className="logo-container receipt-logo">
            <img
              style={{ height: "60px" }}
              src={cocobodLogo}
              alt="cocobod-logo"
            />
            <h1>GHANA COCOA BOARD</h1>
          </div>
          <div className="receipt-letter-head-container">
            <span className="payslip-date-title">Payslip for january 2023</span>
            <div className="receipt-header">
              <div className="receipt-header-left">
                <div className="employee label-div">
                  <span className="employee-lable lable-name">
                    EMPLOYEE NO.
                  </span>
                  <span>{staffData?.Staff_Number}</span>
                </div>
                <div className="tin label-div">
                  <span className="tin-lable lable-name">TIN</span>
                  <span></span>
                </div>
                <div className="employee-name label-div">
                  <span className="employee-name-lable lable-name">
                    EMPLOYEE NAME
                  </span>
                  <span>
                    {`${staffData?.FirstName} ${staffData?.LastName}`}
                  </span>
                </div>
                <div className="SSF label-div">
                  <span className="SSF-lable lable-name">SSF</span>
                  <span>{staffData?.SSF}</span>
                </div>
                <div className="tier-2 label-div">
                  <span className="tier-2-lable lable-name">TIER 2</span>
                  <span></span>
                </div>
                <div className="tier-3 label-div">
                  <span className="tier-3-lable lable-name">TIER 3</span>
                  <span></span>
                </div>
                <div className="salary-grade label-div">
                  <span className="salary-grade-lable lable-name">
                    SALARY GRADE
                  </span>
                  <span></span>
                </div>
                <div className="NOTCH label-div">
                  <span className="notch-lable lable-name">NOTCH</span>
                  <span>{staffData?.Notch}</span>
                </div>
                <div className="date-employed label-div">
                  <span className="date-employed-lable lable-name">
                    DATE EMPLOYED
                  </span>
                  <span>{`"${staffData.HireDate}"`.slice(1, 12)}</span>
                </div>
                <div className="division label-div">
                  <span className="division lable-name">DIVISION</span>
                  <span></span>
                </div>
              </div>
              <div className="receipt-header-right">
                <div className="employee-type label-div">
                  <span className="employee-type lable-name">
                    EMPLOYEE TYPE
                  </span>
                  <span>{staffData?.EmployeeType}</span>
                </div>
                <div className="department label-div">
                  <span className="department lable-name">DEPARTMENT</span>
                  <span>{staffData?.Department}</span>
                </div>
                <div className="section label-div">
                  <span className="section lable-name">SECTION</span>
                  <span>54</span>
                </div>
                <div className="position label-div">
                  <span className="position lable-name">POSITION</span>
                  <span></span>
                </div>
                <div className="location label-div">
                  <span className="location lable-name">LOCATION</span>
                  <span></span>
                </div>
                <div className="unit label-div">
                  <span className="unit lable-name">UNIT</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <PayslipDataTable data={data} />
      <div className="bank-details-container">
        <span style={{ fontSize: "11px" }} className="payment-to">
          PAYMENT MADE BY TRANSFER TO:
        </span>
        <div className="payment-container">
          <div style={{ fontSize: "10px" }} className="payment-column-1">
            <span style={{ fontSize: "10px" }}>BANK</span>
            <span style={{ fontSize: "10px" }}>BRANCH</span>
            <span style={{ fontSize: "10px" }}>ACCOUNT NO.</span>
          </div>

          {[newData]?.map((staffData) => (
            <div className="payment-column-2">
              <span style={{ fontSize: "10px" }}>{staffData?.Bank_Name}</span>
              <span style={{ fontSize: "10px" }}>{staffData?.Branch_Name}</span>
              <span style={{ fontSize: "10px" }}>{staffData.BankAC}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayslipReceipt;
