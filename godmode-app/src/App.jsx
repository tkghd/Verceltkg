import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Transfer from "./views/Transfer";
export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/transfer" element={<Transfer/>}/>
    </Routes>
  );
}
