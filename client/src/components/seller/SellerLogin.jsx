import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const [state, setState] = useState("login"); // 'login' or 'register'
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used in register mode

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const url =
        state === "login" ? "/api/seller/login" : "/api/seller/register";

      const payload =
        state === "login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        toast.success(data.message || "Success");
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  if (isSeller) return null;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-6 m-auto items-start p-8 py-12 w-[90%] max-w-sm rounded-2xl shadow-2xl border border-gray-200 bg-white"
    >
      <p className="text-3xl font-semibold m-auto text-center text-gray-800">
        <span className="text-primary">Seller</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "register" && (
        <div className="w-full">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
            className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
          className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          required
        />
      </div>

      <p className="text-sm text-gray-600">
        {state === "register" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer underline hover:text-primary-darker"
            >
              Click here
            </span>
          </>
        ) : (
          <>
            New seller?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer underline hover:text-primary-darker"
            >
              Create an account
            </span>
          </>
        )}
      </p>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-lg font-semibold"
      >
        {state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
};

export default SellerLogin;
