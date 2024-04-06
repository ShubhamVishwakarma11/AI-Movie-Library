import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all the required fields!",
      });
    } else {
      await login(email, password);
    }
  };

  return (
    <div className="px-2 w-full h-full flex justify-center items-center ">
      <div className="md:w-[30%] w-[80%] flex flex-col gap-4 justify-center h-[90vh] ">
        <h1 className="text-4xl font-semibold mb-4">Login</h1>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative"
          />
          <Button
            variant="ghost"
            className="rounded-full absolute right-1 bottom-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <IconEye className="w-4 h-4" />
            ) : (
              <IconEyeClosed className="w-4 h-4" />
            )}
          </Button>
        </div>

        <Button type="submit" className="" onClick={handleLogin}>
          Log into OtherFlix AI
        </Button>
      </div>
    </div>
  );
};

export default Login;
