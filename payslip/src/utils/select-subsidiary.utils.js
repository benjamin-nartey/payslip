// export const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     background: "#fff",
//     color: "#000",
//     // Overwrittes the different states of border
//     borderColor: state.isFocused ? "yellow" : "#624736",
//     // Removes weird border around container
//     boxShadow: state.isFocused ? null : null,
//     "&:hover": {
//       // Overwrittes the different states of border
//       borderColor: state.isFocused ? "red" : "blue",
//     },
//   }),
// };

export const options = [
  {
    label: "Executives",
    value: "exec",
    id: 1,
  },
  {
    label: "Contract",
    value: "temp",
    id: 2,
  },
  {
    label: "BOD",
    value: "sqlsrv",
    id: 3,
  },
  {
    label: "CMS",
    value: "cms",
    id: 4,
  },
  {
    label: "QCC",
    value: "qcc",
    id: 5,
  },
  {
    label: "SPD",
    value: "spd",
    id: 6,
  },
  {
    label: "CHED",
    value: "ched",
    id: 8,
  },
  {
    label: "CRIG",
    value: "crig",
    id: 9,
  },
];
