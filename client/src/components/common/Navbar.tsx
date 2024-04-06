import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { IconSearch, IconStar } from "@tabler/icons-react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <div className="w-[90%] h-[10vh] flex md:flex-row flex-col justify-between items-center px-2 fixed top-0 bg-background z-[99999]">
        <Button variant="link">
          <Link to="/" className="text-brand font-semibold text-3xl">
            OtherFlix AI
          </Link>
        </Button>

        {isAuthenticated ? (
          <div className="flex justify-center items-center sm:gap-4 gap-1">
            {/* <span className="text-md">Hello, {email}</span> */}
            <Button variant="link">
              <Link
                to="/search"
                className="text-lg flex justify-center items-center gap-1"
              >
                <IconSearch />
                Search
              </Link>
            </Button>
            <Button variant="link">
              <Link
                to="/favourites"
                className="text-lg flex justify-center items-center gap-1"
              >
                <IconStar />
                Favourites
              </Link>
            </Button>
            <Button variant="ghost" onClick={logout} className="text-lg">
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center sm:gap-4 gap-1 ">
            <Button variant="link">
              <Link
                to="/search"
                className="text-lg flex justify-center items-center gap-1"
              >
                <IconSearch />
                Search
              </Link>
            </Button>
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
