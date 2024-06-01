import React, { useState } from "react";
import {
  ref,
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseConfig";

const UpdateProfile = () => {
  const [imageUpload, setImageUpload] = useState("");
  const [imageScreen, setImageScreen] = useState("");
  const [userName, setUserName] = useState("");

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      // Create a reference to 'mountains.jpg'
      const imageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(imageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const uploadBtn = async () => {
    try {
      const res = await uploadFile(imageUpload[0]);
      console.log("res-->", res);
      setImageScreen(res);
    } catch (error) {
      console.log("error-->", error);
    }
  };

  return (
    <div className="bg-white p-5 flex mt-10">
      <div className="bg-purple-400 w-1/2 h-64">
        <input
          type="file"
          id="file"
          onChange={(e) => setImageUpload(e.target.files)}
        />
        {imageScreen && (
          <img
            className="mx-auto my-3"
            src={imageScreen}
            alt="image"
            width={300}
            height={300}
          />
        )}
      </div>
      <div className="bg-yellow-200 w-full">
        <div className="flex items-center gap-3">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700"
          >
            User Name:
          </label>
          <div className="">
            <input
              id="userName"
              name="userName"
              type="userName"
              autoComplete="userName"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
