import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import CitySelect from "./pages/city-select";
import SelectSeats from "./pages/select-seats";
import Checkout from "./pages/checkout";
import PaymentSuccess from "./pages/payment-success";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CitySelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-seats" element={<SelectSeats />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
