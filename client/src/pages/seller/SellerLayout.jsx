import React from "react";
import { useAppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { navigate,  axios } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout", {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white shadow-sm">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="h-10 w-auto md:w-32 cursor-pointer"
          />
        </Link>
        <div className="flex items-center gap-4 text-gray-700">
          <span className="font-medium text-sm md:text-base">Hi! Admin</span>
          <button
            onClick={logout}
            className="border rounded-full text-sm px-4 py-1 bg-gray-100 hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="md:w-64 w-20 border-r border-gray-200 bg-white py-6 px-2 flex flex-col gap-2 transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg gap-3 transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium border-r-4 border-primary"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <span className="hidden md:inline text-sm">{item.name}</span>
            </NavLink>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
