import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  
  return (
    <div className="mt-16 px-4">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl md:text-3xl font-medium uppercase">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-center h-[60vh]">
          <p className="text-2xl font-semibold text-primary">
            No products found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
