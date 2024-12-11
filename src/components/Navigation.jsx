import React, { useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import EditUserForm from "./EditUserForm";

function NavDrawer({ data }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <button
        className={`p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 absolute top-0 left-0 m-10 ${
          isOpen ? "hidden" : ""
        }`}
        onClick={toggleDrawer}
      >
        <FaAlignJustify />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-row items-center">
          <h2 className="text-xl text-white font-bold w-full">
            Hi,{data.username}
          </h2>
          <button
            className="size-10 flex justify-center items-center border border-white rounded-lg"
            onClick={toggleDrawer}
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <nav className="mt-4 p-4">
          <button
            className="flex w-full flex-row items-center cursor-pointer p-2"
            onClick={openModal}
          >
            <GoPencil />
            <div className="ml-1 text-base font-medium hover:text-slate-400">
              Edit Profile
            </div>
          </button>
          <button
            className="flex w-full flex-row items-center cursor-pointer rounded-lg bg-red-500 hover:bg-red-600 p-2"
            onClick={handleLogout}
          >
            <ImExit />
            <div className="ml-1 text-base font-medium hover:text-slate-400">
              Logout
            </div>
          </button>
        </nav>
      </div>

      {isModalOpen && <EditUserForm closeModal={closeModal} userId={data.id} />}
    </div>
  );
}

export default NavDrawer;
