import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import NavDrawer from "../../components/Navigation";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import AddProductForm from "../../components/AddProductForm";

function MainPage() {
  const [productList, setProductList] = useState([]);
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/product/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductList(response.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const userResponse = await axios.get("http://localhost:3000/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(userResponse.data.user[0]);
        await fetchProducts();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center p-20">
      <div className="text-slate-900 font-bold text-2xl mb-5">
        My Product List
      </div>
      <NavDrawer data={userData} />
      {productList.length !== 0 ? (
        <ProductItem
          productList={productList}
          onProductChange={fetchProducts}
        />
      ) : (
        <div>Empty</div>
      )}
      <button
        className="flex flex-row items-center rounded-md bg-green-500 hover:bg-green-600 p-2 mt-4"
        onClick={openModal}
      >
        <FaPlus />
        <div className="ml-1 text-base font-medium">Add Product</div>
      </button>
      {isModalOpen && (
        <AddProductForm
          closeModal={closeModal}
          onAddProduct={fetchProducts}
          isEditing={false}
        />
      )}
    </div>
  );
}

export default MainPage;
