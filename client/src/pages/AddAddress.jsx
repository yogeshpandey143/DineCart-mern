import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange }) => {
  return (
    <input
      className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none text-gray-700 focus:border-primary focus:ring-1 focus:ring-primary transition"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      required
    />
  );
};

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext(); // Make sure user is provided by context
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 pb-16 px-4 md:px-20">
      <p className="text-3xl font-semibold text-gray-700">
        Add Shipping <span className="text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between gap-10 mt-10">
        <div className="flex-1 max-w-2xl bg-white p-6 shadow-md rounded-lg">
          <form onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { name: "firstName", type: "text", placeholder: "First Name" },
                { name: "lastName", type: "text", placeholder: "Last Name" },
                { name: "email", type: "email", placeholder: "Email Address" },
                { name: "phone", type: "tel", placeholder: "Phone Number" },
                { name: "street", type: "text", placeholder: "Street Address" },
                { name: "city", type: "text", placeholder: "City" },
                { name: "state", type: "text", placeholder: "State" },
                { name: "country", type: "text", placeholder: "Country" },
                { name: "pincode", type: "text", placeholder: "Pincode" },
              ].map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  handleChange={handleChange}
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-md font-medium hover:bg-primary/90 transition"
            >
              Submit Address
            </button>
          </form>
        </div>

        <div className="flex-1 flex justify-center items-start">
          <img
            className="w-full md:max-w-sm mb-8 md:mb-0 object-contain"
            src={assets.add_address_iamge}
            alt="Add Address"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
