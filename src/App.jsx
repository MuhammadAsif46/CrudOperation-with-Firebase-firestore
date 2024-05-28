import "./App.css";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <h1 className="text-3xl p-4 bg-[#a2d2ff] text-white">
        Crud operation with firebase firestore
      </h1>
      <Profile/>
    </>
  );
}

export default App;
