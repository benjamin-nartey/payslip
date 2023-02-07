import "./payslip-data-table.styles.css";
import { useTable } from "react-table";
import { useMemo } from "react";
const PayslipDataTable = ({ data }) => {
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipDataTable;
