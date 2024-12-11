import React, { useState } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";

function ProductItem({ productList, onProductChange }) {
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Success delete product");
        onProductChange();
      }
    } catch (error) {
      console.error("Error delete product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-black px-2 py-2">Name</th>
            <th className="border border-black px-2-py-2">Price</th>
            <th className="border border-black px-2 py-2">Description</th>
            <th className="border border-black px-2 py-2 w-40"></th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product, index) => (
            <tr key={index}>
              <td className="border border-black px-3 py-1">{product.name}</td>
              <td className="border border-black px-3 py-1">{product.price}</td>
              <td className="text-center border border-black py-1">
                {product.description}
              </td>
              <td className="border border-black px-3 py-1 ">
                <button className="bg-blue-500 text-white p-2 rounded-md font-medium">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md font-medium ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductItem;
