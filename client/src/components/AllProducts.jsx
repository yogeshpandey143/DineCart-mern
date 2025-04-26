import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(trimmedQuery)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col items-center">
      <div className="flex flex-col items-end w-full max-w-screen-xl px-4">
        <p className="text-2xl md:text-3xl font-medium uppercase">
          All Products
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-6 px-4 w-full max-w-screen-xl">
        {filteredProducts.filter((product) => product.inStock).map((product) => (
          <ProductCard key={product._id || product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
