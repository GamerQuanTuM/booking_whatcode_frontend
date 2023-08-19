import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import { LiaCitySolid } from "react-icons/lia";

import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CityList = {
  name: string;
  date: string;
  callToActionButton: string;
};

const cityList = [
  { name: "Raipur", date: "10/11/2023", callToActionButton: "Book Now" },
  { name: "Haryana", date: "09/12/2023", callToActionButton: "Book Now" },
  { name: "Amritsar", date: "02/01/2024", callToActionButton: "Book Now" },
  { name: "Nagpur", date: "18/11/2024", callToActionButton: "Book Now" },
  { name: "Pune", date: "22/11/2024", callToActionButton: "Book Now" },
  { name: "Nashik", date: "01/05/2024", callToActionButton: "Book Now" },
  { name: "Goa", date: "05/05/2024", callToActionButton: "Book Now" },
];

const CitySelection = () => {
  const navigate = useNavigate();
  const [filterCity, setFilterCity] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setFilterCity(newText);
  };

  const filteredCity = cityList.filter((city: CityList) =>
    city.name.toLowerCase().includes(filterCity.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#F7F7F7] overflow-hidden">
      <Navbar goToCart />
      <div className="mt-10 flex flex-col gap-10">
        <div className="flex justify-center items-center">
          <h1 className="font-semibold text-[34px]">Select your Location</h1>
          <FaLocationDot className="w-[50px] h-[40px]" />
        </div>

        <div className="flex justify-center items-center">
          <input
            value={filterCity}
            onChange={handleFilterChange}
            type="text"
            className="w-[747px] h-[40px] border-2 rounded-[19px] drop-shadow-lg pl-6 pr-10 relative"
            placeholder="Search"
          />
          <AiOutlineSearch className="absolute right-[498px]" color="#ABABAB" />
        </div>

        <div className="mt-3">
          {filteredCity.map((item: CityList) => (
            <div
              className="flex justify-evenly items-center border-[1px] border-[#E0E0E0] border-opacity-30 py-1"
              key={item.name}
            >
              <div className="w-[200px] flex items-center gap-5">
                <LiaCitySolid className="w-[34px] h-[28px]" />
                <h1 className="font-[700] text-[17px]">{item.name}</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="font-[400] text-[11px] text-center text-[#474747]">
                  {item.date}
                </h1>
              </div>
              <div>
                <div
                  className="w-[200px] flex items-center gap-2 cursor-pointer text-[#ABABAB] hover:text-rose-500/80 hover:underline"
                  onClick={() => navigate("/select-seats")}
                >
                  <h1 className="font-[700] text-[18px] ">
                    {item.callToActionButton}
                  </h1>
                  <AiOutlineRight className="h-[22px] w-[30px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="pt-8 mt-5 bg-gray-200/80 flex flex-col gap-3 items-center"
          style={{ flex: `0 0 calc(100vh - 400px)` }}
        >
          <h1 className="text-[28px] text-[#7C7C7C] font-normal">
            Not found the City you were looking for 😕?
          </h1>
          <button className="w-[213px] h-[56px] rounded-3xl drop-shadow-lg bg-white text-[20px] font-normal text-center">
            Contact Sales ☎️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySelection;
