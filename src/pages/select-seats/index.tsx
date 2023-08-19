import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import Navbar from "../../components/Navbar";
import Seats from "../../assets/seats.png";
import useStore from "../../hooks/useStore";

const SelectSeats = () => {
  const navigate = useNavigate();

  const { addToCart, removeFromCart } = useStore();

  const [bigSeats, setBigSeats] = useState<number>(Number(localStorage.getItem("bigSeats")) || 0);
  const [mediumSeats, setMediumSeats] = useState<number>(Number(localStorage.getItem("mediumSeats")) || 0);
  const [smallSeats, setSmallSeats] = useState<number>(Number(localStorage.getItem("smallSeats")) || 0);

  const [bigSeatsPrice, setBigSeatsPrice] = useState<number>(Number(localStorage.getItem("bigSeatsPrice")) || 0);
  const [mediumSeatsPrice, setMediumSeatsPrice] = useState<number>(Number(localStorage.getItem("mediumSeatsPrice")) || 0);
  const [smallSeatsPrice, setSmallSeatsPrice] = useState<number>(Number(localStorage.getItem("smallSeatsPrice")) || 0);

  useEffect(() => {
    localStorage.setItem("bigSeats", String(bigSeats));
  }, [bigSeats]);

  useEffect(() => {
    localStorage.setItem("mediumSeats", String(mediumSeats));
  }, [mediumSeats]);

  useEffect(() => {
    localStorage.setItem("smallSeats", String(smallSeats));
  }, [smallSeats]);

  useEffect(() => {
    localStorage.setItem("bigSeatsPrice", String(bigSeatsPrice));
  }, [bigSeatsPrice]);

  useEffect(() => {
    localStorage.setItem("mediumSeatsPrice", String(mediumSeatsPrice));
  }, [mediumSeatsPrice]);

  useEffect(() => {
    localStorage.setItem("smallSeatsPrice", String(smallSeatsPrice));
  }, [smallSeatsPrice]);


  const addBigSeats = () => {
    addToCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice + 55000,
      bigSeatsQuantity: bigSeats + 1,
      mediumSeatsPrice: mediumSeatsPrice,
      mediumSeatsQuantity: mediumSeats,
      smallSeatsPrice: smallSeatsPrice,
      smallSeatsQuantity: smallSeats,
    });
    setBigSeats(bigSeats + 1);
    setBigSeatsPrice(bigSeats * 55000 + 55000);
  };
  const addMediumSeats = () => {
    addToCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice,
      bigSeatsQuantity: bigSeats,
      mediumSeatsPrice: mediumSeatsPrice + 35000,
      mediumSeatsQuantity: mediumSeats + 1,
      smallSeatsPrice: smallSeatsPrice,
      smallSeatsQuantity: smallSeats,
    });
    setMediumSeats(mediumSeats + 1);
    setMediumSeatsPrice(mediumSeats * 35000 + 35000);
  };
  const addSmallSeats = () => {
    addToCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice,
      bigSeatsQuantity: bigSeats,
      mediumSeatsPrice: mediumSeatsPrice,
      mediumSeatsQuantity: mediumSeats,
      smallSeatsPrice: smallSeatsPrice + 25000,
      smallSeatsQuantity: smallSeats + 1,
    });
    setSmallSeats(smallSeats + 1);
    setSmallSeatsPrice(smallSeats * 25000 + 25000);
  };

  const removeBigSeats = () => {
    removeFromCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice - 55000,
      bigSeatsQuantity: bigSeats - 1,
      mediumSeatsPrice: mediumSeatsPrice,
      mediumSeatsQuantity: mediumSeats,
      smallSeatsPrice: smallSeatsPrice,
      smallSeatsQuantity: smallSeats,
    });
    setBigSeats(bigSeats - 1);
    setBigSeatsPrice(bigSeats * 55000 - 55000);
  };

  const removeMediumSeats = () => {
    removeFromCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice,
      bigSeatsQuantity: bigSeats,
      mediumSeatsPrice: mediumSeatsPrice - 35000,
      mediumSeatsQuantity: mediumSeats - 1,
      smallSeatsPrice: smallSeatsPrice,
      smallSeatsQuantity: smallSeats,
    });
    setMediumSeats(mediumSeats - 1);
    setMediumSeatsPrice(mediumSeats * 35000 - 35000);
  };
  const removeSmallSeats = () => {
    removeFromCart({
      name: "Seats",
      bigSeatsPrice: bigSeatsPrice,
      bigSeatsQuantity: bigSeats,
      mediumSeatsPrice: mediumSeatsPrice,
      mediumSeatsQuantity: mediumSeats,
      smallSeatsPrice: smallSeatsPrice - 25000,
      smallSeatsQuantity: smallSeats,
    });
    setSmallSeats(smallSeats - 1);
    setSmallSeatsPrice(smallSeats * 25000 - 25000);
  };

  return (
    <div className="h-screen">
      <Navbar goToCart citySelect both />

      <div className="h-[375px] bg-[#EAE8E9] flex items-center justify-center">
        <img src={Seats} alt="seats.png" />
      </div>
      <div className="h-[45px] bg-[#DDDDDD] px-80 flex items-center justify-between">
        <h1 className="font-bold text-[17px]">Color Code</h1>
        <section className="flex items-center gap-7">
          <div className="flex items-center gap-2">
            <h4 className="text-[17px] font-[600] text-[#FF6600]">H1 -</h4>
            <button className="w-[21.8px] h-[24px] rounded-full bg-[#FF6600]"></button>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-[17px] font-[600] text-[#00B33C]">H2 -</h4>
            <button className="w-[21.8px] h-[24px] rounded-full bg-[#00B33C]"></button>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="text-[17px] font-[600] text-[#808080]">H3 -</h4>
            <button className="w-[21.8px] h-[24px] rounded-full bg-[#808080]"></button>
          </div>
        </section>
      </div>
      <div>
        <div className="h-[83px] bg-gray-100 flex px-80 justify-between items-center border-b-2 border-gray-200/50">
          <div className="flex gap-16 w-[280px] h-[41px] items-center">
            <div className="text-[#00B33C] text-[22px] font-bold flex gap-3 items-center">
              <button className="h-[25px] w-[25px] rounded-full bg-green-500 flex items-center justify-center">
                <AiFillStar color="yellow" />
              </button>
              <span>55,000</span>
            </div>
            <div className="text-[#00B33C] text-[22px] font-bold">
              32 Sq. Mt.
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={addBigSeats}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlinePlus className="text-gray-500" />
            </button>
            <p className="font-bold text-[24px]">{bigSeats}</p>
            <button
              onClick={removeBigSeats}
              disabled={bigSeats === 0}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlineMinus className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="h-[49px] bg-gray-100 flex px-80 justify-between items-center border-b-2 border-gray-200/50">
          <div className="flex gap-16 w-[280px] h-[41px] items-center">
            <div className="text-[#00B33C] text-[22px] font-bold flex gap-3 items-center">
              <div className="h-[25px] w-[25px] rounded-full bg-[#FF6600] flex items-center justify-center" />
              <span className="text-[17px] font-[400] text-[#FF6600]">
                35,000
              </span>
            </div>
            <div className="text-[17px] font-[400] text-[#FF6600] pl-5">
              24 Sq. Mt.
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={addMediumSeats}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlinePlus className="text-gray-500" />
            </button>
            <p className="font-bold text-[24px]">{mediumSeats}</p>
            <button
              onClick={removeMediumSeats}
              disabled={mediumSeats === 0}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlineMinus className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="h-[49px] bg-gray-100 flex px-80 justify-between items-center border-b-2 border-gray-200/50">
          <div className="flex gap-16 w-[280px] h-[41px] items-center">
            <div className="text-[#00B33C] text-[22px] font-bold flex gap-3 items-center">
              <div className="h-[25px] w-[25px] rounded-full bg-[#808080] flex items-center justify-center" />
              <span className="text-[17px] font-[400] text-[#808080]">
                25,000
              </span>
            </div>
            <div className="text-[17px] font-[400] text-[#808080] pl-5">
              18 Sq. Mt.
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={addSmallSeats}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlinePlus className="text-gray-500" />
            </button>
            <p className="font-bold text-[24px]">{smallSeats}</p>
            <button
              onClick={removeSmallSeats}
              disabled={smallSeats === 0}
              className="h-[22px] w-[22px] rounded-full border-2 border-gray-500 flex justify-center items-center"
            >
              <AiOutlineMinus className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <h4
        className="mt-7 font-[600] text-[19px] text-[#808080] text-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {"< Back to City "}
      </h4>
    </div>
  );
};

export default SelectSeats;
