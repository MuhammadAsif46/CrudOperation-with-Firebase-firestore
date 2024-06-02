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

//   console.log(imageUpload);

  return (
    <div className="bg-white p-5 mt-10 mx-auto w-1/3 rounded-md shadow-lg">
      <div className="border h-64 rounded flex justify-center items-center">
        <input
          hidden
          type="file"
          id="file"
          onChange={(e) => {
            const base64Url = URL.createObjectURL(e.target.files[0]);
            setImageUpload(base64Url);
          }}
        />

        {imageUpload ? (
          <div>
            <img
              className=""
              src={imageUpload}
              alt="image"
              width={150}
              height="100%"
            />
          </div>
        ) : (
          <div className="border h-52 w-52 bg-purple-50 flex justify-center items-center">
            <label htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={100}
                height={100}
                fill="currentColor"
                //   class="bi bi-person-fill-add"
                className="cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                  fill="#ccc"
                />
                <path
                  d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
                  fill="#ccc"
                />
              </svg>
            </label>
          </div>
        )}
      </div>
      <div className="mt-5">
        <input
          id="userName"
          name="userName"
          type="userName"
          value={userName}
          autoComplete="userName"
          placeholder="Username"
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
