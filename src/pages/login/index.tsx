import axios from "axios";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";

import Navbar from "../../components/Navbar";
import Banner from "../../assets/banner.png";
import { auth, GoogleProvider, FacebookProvider } from "../../firebase";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    <div>Loading...</div>;
  }

  const onFormSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://booking-backend-whatcode.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        console.log("Error");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, GoogleProvider);
      const saveUser = await axios.post(
        "https://booking-backend-whatcode.onrender.com/api/auth/register",
        {
          username: result.user.displayName,
          email: result.user.email,
          password: "Google Sign-In",
        }
      );

      if (saveUser.status === 201) {
        setLoading(false);
        navigate("/");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const signInWithFacebook = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, FacebookProvider);
      const saveUser = await axios.post(
        "https://booking-backend-whatcode.onrender.com/api/auth/register",
        {
          username: result.user.displayName,
          email: result.user.email,
          password: "Facebook Sign-In",
        }
      );

      if (saveUser.status === 201) {
        setLoading(false);
        navigate("/");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex gap-96 mt-[96px] mx-12">
        <div>
          <img src={Banner} alt="" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-[700] text-[24px]">Login here!</h1>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email or Phone"
              className="h-[60px] w-[440px] rounded-[5px] border-[1px] border-[#887E7E] px-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="h-[60px] w-[440px] rounded-[5px] border-[1px] border-[#887E7E] px-3"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <div className="font-normal text-[16px] text-[#635C5C] self-end">
              Forgot Password?
            </div>

            <button
              className="mt-3 w-[400px] h-[60px] rounded-[34px] bg-gradient-to-r from-[#F54874] to-[#EC008C] font-[700] text-[24px] self-center disabled:cursor-not-allowed"
              onClick={onFormSubmit}
              disabled={email.length === 0 || password.length === 0}
            >
              <p className="text-center text-white">Login</p>
            </button>

            <div className="relative w-[369px] h-4 text-left text-xs text-dimgray-300 font-open-sans ml-10 mt-3">
              <div className="absolute top-[6px] left-[0px] [background:linear-gradient(269.97deg,_#ca4365,_rgba(196,_196,_196,_0))] w-[132px] h-[3px]" />
              <div className="absolute top-[9px] left-[369px] [background:linear-gradient(269.97deg,_#ca4365,_rgba(196,_196,_196,_0))] w-[132px] h-[3px] [transform:_rotate(-180deg)] [transform-origin:0_0]" />
              <div className="absolute top-[0px] left-[139px]">
                Or Sign-up With
              </div>
            </div>

            <section className="mt-4 flex gap-4 justify-center">
              <div className="w-[52px] h-[52px] rounded-full bg-[#EFE9EC] flex items-center justify-center cursor-pointer">
                <FcGoogle
                  className="h-[30px] w-[30px] cursor-pointer"
                  onClick={signInWithGoogle}
                />
              </div>

              <div
                className="w-[52px] h-[52px] rounded-full bg-[#EFE9EC] flex items-center justify-center cursor-pointer"
                onClick={signInWithFacebook}
              >
                <FaFacebook className="h-[30px] w-[30px]" color="blue" />
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute -bottom-[296px]"
        >
          <path
            fill="#F54874"
            fillOpacity="1"
            d="M0,128L48,117.3C96,107,192,85,288,112C384,139,480,213,576,218.7C672,224,768,160,864,154.7C960,149,1056,203,1152,192C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div> */}
    </div>
  );
};

export default Login;
