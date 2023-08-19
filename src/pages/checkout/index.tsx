/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import useStore from "../../hooks/useStore";
import Cart from "../../assets/cart.png";

type SeatsDetailsProps = {
  handleSeatsDetails: () => void;
  seatsPrice?: number;
  seatsQuantity?: number;
  showSeatsDetails: boolean;
  color: string;
};

const SeatDetails = ({
  handleSeatsDetails,
  seatsPrice,
  showSeatsDetails,
  seatsQuantity,
  color,
}: SeatsDetailsProps) => (
  <div className="border-2 border-b-gray-100 flex justify-center items-center">
    <div className="flex gap-2 items-center justify-between px-60 w-full">
      <div
        className="cursor-pointer flex flex-col gap-2"
        onClick={handleSeatsDetails}
      >
        <h1 className={`text-[25px] font-[600] text-[${color}] py-1`}>
          ₹{seatsPrice}
          <span className="text-[#8C8C8C]"> v</span>
        </h1>
        {showSeatsDetails && (
          <div className="flex flex-col gap-1 pb-1">
            <h1 className="text-[18px] font-[600] text-[7C7C7C]">
              Raipur | Quantity - {seatsQuantity} | Stall Type Details
            </h1>
            <h1 className="font-[300] text-[#7C7C7C] text-[16px]">
              <span className="font-[400] text-[#555454]">
                Terms and Conditions -{" "}
              </span>
              Select your favorite social network and share our icons with your
              contacts or friends. If you don’t have these social networks
            </h1>
          </div>
        )}
      </div>
      {!showSeatsDetails && (
        <div className="h-[30px] w-[30px] rounded-full bg-gray-100 flex items-center justify-center border-2 border-slate-500">
          {seatsQuantity}
        </div>
      )}
    </div>
  </div>
);

const Checkout = () => {
  const { cart } = useStore();

  const lastItem = cart[cart.length - 1];

  const [showBigSeatsDetails, setshowBigSeatsDetails] = useState(false);
  const [showMediumSeatsDetails, setshowMediumSeatsDetails] = useState(false);
  const [showSmallSeatsDetails, setshowSmallSeatsDetails] = useState(false);

  const handleBigSeatsDetails = () => {
    setshowBigSeatsDetails(!showBigSeatsDetails);
    setshowMediumSeatsDetails(false);
    setshowSmallSeatsDetails(false);
  };
  const handleMediumSeatsDetails = () => {
    setshowBigSeatsDetails(false);
    setshowMediumSeatsDetails(!showMediumSeatsDetails);
    setshowSmallSeatsDetails(false);
  };
  const handleSmallSeatsDetails = () => {
    setshowBigSeatsDetails(false);
    setshowMediumSeatsDetails(false);
    setshowSmallSeatsDetails(!showSmallSeatsDetails);
  };

  const subTotal =
    lastItem.bigSeatsPrice! +
    lastItem.mediumSeatsPrice! +
    lastItem.smallSeatsPrice!;

  const grandTotal = subTotal + 32000.0;

  const handleCheckout = async () => {
    const {
      data: { key },
    } = await axios.get("https://booking-backend-whatcode.onrender.com/api/get-api-key");

    const {
      data: { order },
    } = await axios.post("https://booking-backend-whatcode.onrender.com/api/checkout", {
      amount: grandTotal,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Shuvam Santra",
      description: "Description",
      image: "https://avatars.githubusercontent.com/u/76802373?v=4",
      order_id: order.id,
      handler: async (response: string) => {
        try {
          const verifyUrl = "https://booking-backend-whatcode.onrender.com/api/payment-verification";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    { /* @ts-ignore */}
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar citySelect />
      <div className="mt-5 flex flex-col">
        <h1 className="text-[36px] font-[600] text-center">
          Shopping Bag - Checkout 🛒
        </h1>
        {lastItem.bigSeatsQuantity === 0 &&
        lastItem.mediumSeatsQuantity === 0 &&
        lastItem.smallSeatsQuantity === 0 ? (
          <div className="mt-6 flex items-center justify-center">
            <img src={Cart} alt="" />
          </div>
        ) : (
          <div className="mt-10">
            <SeatDetails
              color="#00B33C"
              handleSeatsDetails={handleBigSeatsDetails}
              seatsPrice={lastItem.bigSeatsPrice}
              showSeatsDetails={showBigSeatsDetails}
              seatsQuantity={lastItem.bigSeatsQuantity}
            />
            <SeatDetails
              color="#FF6600"
              handleSeatsDetails={handleMediumSeatsDetails}
              seatsPrice={lastItem.mediumSeatsPrice}
              showSeatsDetails={showMediumSeatsDetails}
              seatsQuantity={lastItem.mediumSeatsQuantity}
            />
            <SeatDetails
              color="#808080"
              handleSeatsDetails={handleSmallSeatsDetails}
              seatsPrice={lastItem.smallSeatsPrice}
              showSeatsDetails={showSmallSeatsDetails}
              seatsQuantity={lastItem.smallSeatsQuantity}
            />
          </div>
        )}
        <footer className="bg-gray-100/80 h-[400px] mt-5 pb-5 pt-16 relative">
          <h1 className="text-[#EB008B] font-normal text-[21px] text-center">
            • We levy a 50% Advance on all our Stall sales. The rest 50% shall
            be credited post the event.
          </h1>
          <div className="flex justify-between px-[425px] mt-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-[#A1A1A1] text-[21px] font-medium">
                  Subtotal
                </h3>
                <h3 className="text-[#A1A1A1] text-[21px] font-medium">Tax</h3>
              </div>
              <div>
                <h1 className="text-[#1B1B1B] text-[24px] font-[600]">TOTAL</h1>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-[#A1A1A1] text-[21px] font-medium">
                  ₹ {subTotal}.00
                </h3>
                <h3 className="text-[#A1A1A1] text-[21px] font-medium">
                  {lastItem.bigSeatsQuantity === 0 &&
                  lastItem.mediumSeatsQuantity === 0 &&
                  lastItem.smallSeatsQuantity === 0
                    ? "₹ 0.00"
                    : "₹ 32000.00"}
                </h3>
              </div>
              <div>
                <h1 className="text-[#1B1B1B] text-[24px] font-[600]">
                  {/* ₹ {subTotal + 32000}.00 */}
                  {lastItem.bigSeatsQuantity === 0 &&
                  lastItem.mediumSeatsQuantity === 0 &&
                  lastItem.smallSeatsQuantity === 0
                    ? "₹ 0.00"
                    : "₹ " + grandTotal}
                </h1>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[330px] h-[57px] rounded-[34px] text-center text-[24px] font-bold ${
                lastItem.bigSeatsQuantity === 0 &&
                lastItem.mediumSeatsQuantity === 0 &&
                lastItem.smallSeatsQuantity === 0
                  ? "mt-10 bg-slate-500 cursor-not-allowed"
                  : "mt-16 bg-[#F54874]"
              } text-white`}
            >
              Pay Now
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Checkout;
