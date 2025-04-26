import React from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-bold ">Categories</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className="group flex flex-col items-center justify-center gap-2 cursor-pointer px-3 py-5 rounded-lg"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {navigate(`/products/${category.path.toLowerCase()}`); scrollTo(0, 0);}}
              
            >
              <img
                src={category.image}
                alt="category.text"
                className="group-hover:scale-110 transition max-w-28"
              />
              <p className="text-sm font-medium">{category.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
