import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import { Toaster } from "./components/ui/toaster";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Favourites from "./pages/Favourites";
import Movie from "./pages/Movie";
import Home from "./Home";
const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="dark bg-background text-foreground w-full flex items-start min-h-[100vh] justify-center  relative">
      <div className="flex flex-col w-[90%] justify-center relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie" element={<Movie />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
