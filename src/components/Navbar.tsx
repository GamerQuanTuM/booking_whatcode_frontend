import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

import Logo from "../assets/logo.png";
// import useStore from "../hooks/useStore";

interface Props {
  goToCart?: boolean;
  citySelect?: boolean;
  both?: boolean;
}

const Navbar: FC<Props> = ({ citySelect, goToCart, both }) => {
  const navigate = useNavigate();
  // const { cart } = useStore();
  return (
    <nav className="h-20 bg-[#DFDFDF] flex justify-between items-center">
      <div className="flex items-center flex-grow">
        <img src={Logo} alt="Logo" className="h-[77px] w-[128px] mx-auto" />
      </div>
      <div className="relative space-x-4 mr-8">
        {citySelect && (
          <button
            className={`text-white w-[150px] h-[60px] bg-yellow-500 rounded-full flex gap-2 items-center justify-center absolute ${
              both ? "right-40" : "right-0"
            } -top-[30px]`}
            onClick={() => navigate("/")}
          >
            <h1 className="text-lg">City Select</h1>
            <IoLocationSharp className="w-6 h-6" />
          </button>
        )}
        {goToCart && (
          <button
            className="text-white w-[150px] h-[60px] bg-rose-500 rounded-full flex gap-3 items-center justify-center absolute right-0 -top-[30px] disabled:cursor-not-allowed"
            onClick={() => navigate("/checkout")}
            // disabled={cart.length === 0}
          >
            <h1 className="text-lg">Go to Cart</h1>
            <BsHandbagFill className="w-5 h-5" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
