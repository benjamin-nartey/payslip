import "./payslip-receipt.styles.css";
import PayslipDataTable from "../payslip-data-table/payslip-data-table.component";
import cocobodLogo from "../../assets/logo-cocobod.png";
import { useState, useEffect } from "react";

const PayslipReceipt = ({ data, printRef, payslipTitle }) => {
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
      {[newData]?.map((staffData, index) => (
        <div key={index}>
          <div className="logo-container receipt-logo">
            <img
              style={{ height: "60px" }}
              src={cocobodLogo}
              alt="cocobod-logo"
            />
            <h1>GHANA COCOA BOARD</h1>
          </div>
          <div className="receipt-letter-head-container">
            <span className="payslip-date-title">
              Payslip for {payslipTitle}
            </span>
            <div className="receipt-header">
              <div className="receipt-header-left">
                <div className="employee-details-label">
                  <span className="employee-lable lable-name">
                    EMPLOYEE NO.
                  </span>
                  <span className="tin-lable lable-name">TIN</span>
                  <span className="employee-name-lable lable-name">
                    EMPLOYEE NAME
                  </span>
                  <span className="SSF-lable lable-name">SSF</span>
                  <span className="tier-2-lable lable-name">TIER 2</span>
                  <span className="tier-3-lable lable-name">TIER 3</span>
                  <span className="salary-grade-lable lable-name">
                    SALARY GRADE
                  </span>
                  <span className="notch-lable lable-name">NOTCH</span>
                  <span className="date-employed-lable lable-name">
                    DATE EMPLOYED
                  </span>
                  <span className="division lable-name">DIVISION</span>
                </div>

                <div className="employee-details-value">
                  <span>{staffData?.Staff_Number}</span>
                  <span>-</span>
                  <span>{`${staffData?.FirstName} ${staffData?.LastName}`}</span>
                  <span>{staffData?.SSF}</span>
                  <span>-</span>
                  <span>-</span>
                  <span>-</span>
                  <span>{staffData?.Notch}</span>
                  <span>{`"${staffData?.HireDate}"`.slice(1, 12)}</span>
                  <span>-</span>
                </div>
              </div>

              <div className="receipt-header-right">
                <div className="employee-details-label">
                  <span className="employee-type lable-name">
                    EMPLOYEE TYPE
                  </span>
                  <span className="department lable-name">DEPARTMENT</span>
                  <span className="section lable-name">SECTION</span>
                  <span className="position lable-name">POSITION</span>
                  <span className="location lable-name">LOCATION</span>
                  <span className="unit lable-name">UNIT</span>
                </div>

                <div className="employee-details-value">
                  <span>{staffData?.EmployeeType}</span>
                  <span>{staffData?.Department}</span>
                  <span>54</span>
                  <span>-</span>
                  <span>-</span>
                  <span>-</span>
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

          {[newData]?.map((staffData, index) => (
            <div key={index} className="payment-column-2">
              <span style={{ fontSize: "10px" }}>{staffData?.Bank_Name}</span>
              <span style={{ fontSize: "10px" }}>{staffData?.Branch_Name}</span>
              <span style={{ fontSize: "10px" }}>{staffData?.BankAC}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayslipReceipt;
