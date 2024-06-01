import React from "react";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";

const UpdateProfilePage = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 bg-[#a2d2ff] ">
        <h1 className="text-3xl text-white">
          Update Profile{" "}
        </h1>
        <button
          onClick={() => navigate("/update-profile")}
          className="bg-gray-400 font-bold text-white p-3 rounded-md hover:bg-gray-500"
        >
          Update
        </button>
      </div>
      <UpdateProfile/>     
    </>
  );
};

export default UpdateProfilePage;
