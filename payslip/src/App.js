import { Route, Routes } from "react-router-dom";
import CheckPayslip from "./routes/check-payslip/check-payslip.component";
import Home from "./routes/home/home.component";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="check-payslip" element={<CheckPayslip />} />
    </Routes>
  );
};

export default App;
