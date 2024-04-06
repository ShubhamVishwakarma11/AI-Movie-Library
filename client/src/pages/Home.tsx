import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { IconChevronRight, IconStar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="px-2 w-full h-[90vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6 justify-center items-center w-[75%]">
        <div className="text-6xl text-brand font-semibold text-center ">
          Discover Your Favorite Movies Through AI Summaries
        </div>
        <div className="text-xl text-muted-foreground">
          Experience Movie Insights with AI-Powered Summaries. Dive Deep into
          Your Favorite Films Like Never Before.
        </div>
        <div className="mt-12">
          {isAuthenticated ? (
            <Button
              size="lg"
              className="text-lg flex gap-2"
              onClick={() => navigate("/favourites")}
            >
              <IconStar /> <span>Checkout your Favourites </span>
            </Button>
          ) : (
            <Button
              size="lg"
              className="text-lg flex gap-2 "
              onClick={() => navigate("/login")}
            >
              <span>Get Started </span> <IconChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
