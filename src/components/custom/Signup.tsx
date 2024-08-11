import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signupProps } from "interfaces/global";

interface SignupProps {
  data: signupProps;
}
const Signup: React.FC<SignupProps> = ({ data }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div className="md:h-[100vh]  flex  py-4 px-2 md:py-0 md:px-0  md:items-center justify-center bg-primary">
      <div className="flex flex-col md:flex-row md:w-4/5 shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image and Text */}
        <div className="flex flex-col md:w-1/2 md:p-10 bg-secondary text-white">
          <div className="h-full rounded-lg flex flex-col justify-center items-center gap-4">
            <img
              src={data.image}
              alt="Login image"
              className="w-3/4 h-3/4 object-contain mix-blend-multiply rounded-md"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-text tracking-wide">
                cbQuiz Hub
              </h2>
              <p className="text-md pb-4 text-para">{data.desc}</p>
            </div>
          </div>
        </div>
        {/* Right Side - Form */}
        <div className="md:w-1/2  bg-white md:p-10 h-full  md:h-auto flex flex-col justify-center items-center">
          <div className="pb-8">
            <p className="text-text text-2xl">
              cbQuiz <span className="text-highlight">Hub</span>
            </p>
          </div>
          <div className="w-full p-4 md:p-0 md:w-4/5 relative">
            <label
              
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <Input
              id="fname"
              type="text"
              placeholder="Enter first name"
              className="w-full mb-4 p-2 outline-none rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <Input
              id="lname"
              type="text"
              placeholder="Enter last name"
              className="w-full mb-4 p-2 outline-none rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="w-full mb-4 p-2 outline-none rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full mb-6 p-2 outline-none  rounded "
            />
            {show ? (
              <EyeIcon
                onClick={() => setShow(false)}
                className="absolute right-6 bottom-[88px] md:right-1 md:bottom-[72px] cursor-pointer"
              />
            ) : (
              <EyeOff
                onClick={() => setShow(true)}
                className="absolute right-6 bottom-[88px] md:right-1 md:bottom-[72px] cursor-pointer"
              />
            )}
            <Button className="w-full bg-btn text-white py-2 rounded">
              Signup
            </Button>
          </div>
          <div className="pt-4">
            <p className="pb-4 md:pb-0">
              Already have an account?{" "}
              <span className="text-highlight underline cursor-pointer ">
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;