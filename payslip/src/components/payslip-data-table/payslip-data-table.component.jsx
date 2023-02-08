import "./payslip-data-table.styles.css";
import { useTable } from "react-table";
import { useMemo } from "react";
import { useState, useEffect } from "react";

const PayslipDataTable = ({ data }) => {
  const allDeductions = data.map((deduceData) => {
    return deduceData.Deduction_Amount;
  });
  console.log(allDeductions);

  const deduceAmount = allDeductions.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue);
  }, 0);
  const finalDeduceValue = deduceAmount.toFixed(4);

  const totalDedutions = useState(finalDeduceValue);
  // console.log(deduceAmount.toFixed(2));

  console.log(totalDedutions);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setNewData(data[0]);
  }, [data]);
  useMemo(() => data, []);
  const columns = useMemo(
    () => [
      {
        Header: "EARNINGS",
        accessor: "Earning_Name",
      },
      {
        Header: "HOURS",
        accessor: "Hours",
      },

      {
        Header: "AMOUNT",
        accessor: "Earning_Amount",
      },
      {
        Header: "DEDUCTION",
        accessor: "Deduction_Name",
      },
      {
        Header: "AMOUNT BALANCE",
        accessor: "Deduction_Amount",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
            {[newData]?.map((staffData) => (
              <>
                <tr>
                  <td className="text-bold"></td>
                  <td className="text-bold">GROSS SALARY</td>
                  <td className="text-bold">{staffData?.Gross_Salary}</td>
                  <td className="text-bold">TOTAL DEDUCTION</td>
                  <td className="text-bold">{totalDedutions[0]}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-bold">NETPAY</td>
                  <td className="text-bold">{staffData?.Net_Pay}</td>
                  <td className="text-bold">TAXABLE</td>
                  <td className="text-bold">{staffData?.Taxable}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-bold">TAKE HOMEPAY</td>
                  <td className="text-bold">{staffData?.Take_Home_Pay}</td>
                  <td className="text-bold"></td>
                  <td className="text-bold"></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipDataTable;
