import { Route, Routes} from "react-router-dom";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage/>}/>
      <Route path="/update-profile" element={<UpdateProfilePage/>}/>
    </Routes>
  );
}

export default App;

