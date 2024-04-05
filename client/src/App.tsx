import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import { Toaster } from "./components/ui/toaster";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="dark bg-background text-foreground w-full flex items-start min-h-[100vh] justify-center  relative">
      <div className="flex flex-col w-[90%] justify-center relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>app</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
