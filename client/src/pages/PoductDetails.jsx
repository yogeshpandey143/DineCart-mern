import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const product = products.find((product) => product._id === id);

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productCopy = products.slice();
      productCopy = productCopy.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setRelatedProducts(productCopy.slice(0, 4));
    }
  }, [products, product]);

  if (!product) return <p className="mt-16 text-center">Loading...</p>;

  return (
    <div className="mt-16">
      <p className="text-sm mb-4">
        <Link to="/">Home</Link>/<Link to="/products">Products</Link>/
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-primary">{product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            {thumbnail && <img src={thumbnail} alt="Selected product" />}
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            <p className="text-base ml-2">{4}</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency} {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/* related products  */}
      <div className="flex flex-col  item-cenetr mt-16">
        <div className="flex flex-col item-cenetr mt-max ">
          <p className="text-2xl md:text-3xl font-medium">Related Products</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <button
            className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition mt-8"
            onClick={() => {
              navigate(`/products`);
              scrollTo(0, 0);
            }}
          >
            see More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
