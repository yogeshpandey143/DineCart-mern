import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate,setSearchQuery,searchQuery,getCartCount } = useAppContext();
  const logout = async () => {
    setUser(false);
    navigate("/");
  };


  useEffect(()=>{
   if(searchQuery.length>0)
   {
    navigate("/products")
   }

  },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e)=>{setSearchQuery(e.target.value)}}
          />
          <img onClick={()=>{setOpen(false)}} src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div  onClick={()=>{navigate("/cart")}} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-60" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button  onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile_icon"
              className="w-10"
            />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm">
            
              <li  onClick={()=>{navigate("/my-orders")}} className="p-1.5 pl-2 hover:bg-primary-dull cursor-pointer rounded-full " >MyOrders</li>
              <li  onClick={logout} className="p-1.5 pl-2 hover:bg-primary-dull cursor-pointer rounded-full ">Logout</li>
            </ul>
          </div>
        )}
      </div>
   <div  className="flex items-center gap-4 sm:hidden">
   <div  onClick={()=>{navigate("/cart")}} className="relative cursor-pointer">
          <img src={assets.cart_icon} alt="cart" className="w-6 opacity-60" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
    
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img src={assets.menu_icon} alt="menu" />
      </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="block"
            onClick={() => setOpen(false)}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/products"
              className="block"
              onClick={() => setOpen(false)}
            >
              User Products
            </NavLink>
          )}
          <NavLink to="/" className="block" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              LogOut
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
