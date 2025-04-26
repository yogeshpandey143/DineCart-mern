import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";

// Add Product ; /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Ensure productData is provided in the body
    const { productData } = req.body;
    if (!productData) {
      return res.status(400).json({ success: false, message: "Product data is required" });
    }

    // Ensure files are uploaded and available
    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    // Upload images to Cloudinary and collect URLs
    let imageUrls = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.tempFilePath, {
            resource_type: "image",
          });
          return {
            public_id: result.public_id,
            url: result.secure_url,
          };
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
          throw new Error("Failed to upload image to Cloudinary");
        }
      })
    );

    // Parse and create the product with images
    const parsedProductData = JSON.parse(productData); // Safely parse product data
    const newProduct = await Product.create({
      ...parsedProductData,
      images: imageUrls,
    });

    res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error); // Improved error logging
    res.status(500).json({ success: false, message: "Failed to add product", error: error.message });
  }
};

// Get Product List ; /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error); // Improved logging
    res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

// Get single Product by ID ; /api/product/:id
export const productById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error); // Improved logging
    res.status(500).json({ success: false, message: "Failed to fetch product", error: error.message });
  }
};

// Change Product Stock ; /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    if (!id || inStock === undefined) {
      return res.status(400).json({ success: false, message: "Product ID and stock status are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Stock updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating stock:", error); // Improved logging
    res.status(500).json({ success: false, message: "Failed to update stock", error: error.message });
  }
};
