import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, email, logout } = useAuth();
  return (
    <>
      <div className="w-[90%] h-[10vh] flex justify-between items-center px-2 fixed top-0 ">
        <Button variant="link">
          <Link to="/" className="text-brand font-semibold text-3xl">
            OtherFlix AI
          </Link>
        </Button>

        {isAuthenticated ? (
          <div className="flex justify-center items-center gap-4">
            <span className="text-md">Hello, {email}</span>
            <Button variant="link">
              <Link to="/search" className="text-lg">
                Search
              </Link>
            </Button>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2 ">
            <Button variant="link">
              <Link to="/login" className="text-lg">
                Login
              </Link>
            </Button>
            <Button variant="link">
              <Link to="/signup" className="text-lg text-brand">
                Signup
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="h-[10vh]"></div>
    </>
  );
};

export default Navbar;
