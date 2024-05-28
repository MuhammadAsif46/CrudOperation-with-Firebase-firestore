import React, { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection, db, getDocs,onSnapshot,query } from "../../firebase/firebaseConfig";

const Profile = () => {
  const [post, setPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // try {
        // setIsLoading(true);
        const getAllPosts = await getDocs(collection(db, "posts"));
        getAllPosts.forEach((doc) => {
          console.log(`${doc.id} => `, doc.data());

          setAllPosts((prev) => {
            const newData = [...prev, doc.data()];
            return newData;
          });
        })
        // setIsLoading(false);
      // } catch (error) {
        // console.log(error.message);
      // }
    };
    getData();

    let unsubscribe = null;
    const getRealTimeData = () => {
      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });

        setAllPosts(posts);
        console.log("posts :" , posts);
      });
    }
    getRealTimeData();

    return ()=>{
      console.log("cleanup function");
      unsubscribe();
    }
  }, []);

  const createPostHandler = async (e) => {
    e.preventDefault();

    console.log("post->", post);
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "posts"), {
        text: post,
        createdOn: new Date().getTime(),
      });
      setIsLoading(false);
      e.target.reset();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={createPostHandler}>
        <div className="bg-white shadow p-4 my-6 mx-auto rounded-md w-1/2 flex gap-3">
          <input
            type="text"
            name="text"
            required
            className="w-full focus ps-3"
            placeholder="Enter a post...."
            onChange={(e) => setPost(e.target.value)}
          />
          <button className="bg-[#a2d2ff] text-xl py-2 px-5 text-white rounded-md">
            Post
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-x-20 gap-y-4">
        {/* {isLoading && (
          <div className="text-center text-xl ">Data Loading....</div>
        )} */}
        {allPosts.map((eachPost, idx) => (
          <div class=" w-1/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white ">
            <p class="mb-3 text-center text-xl py-10 text-gray-700 dark:text-gray-700">
              {eachPost?.text}
            </p>
            <div className="flex gap-3 justify-center">
              <button class="px-5 py-2 font-medium text-center text-white bg-[#] rounded-lg hover:bg-[#3cadc4] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#00b4d8] dark:hover:bg-[#269bb3] dark:focus:ring-blue-800">
                Edit
              </button>
              <button class="px-3 py-2 font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-[#ef233c] dark:hover:bg-red-700 dark:focus:ring-red-800">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
