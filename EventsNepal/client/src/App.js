import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import PartyPalace from "./pages/partyPalace/PartyPalace";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/partyPalaces" element={<List/>}/>
      <Route path="/partyPalaces/:id" element={<PartyPalace/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
