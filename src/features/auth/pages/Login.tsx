import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; 
import eye from "../assets/eye.svg";
import Button from "../../../components/Button";
import CloseButton from "./CloseButtons"; 




const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
     
      <main className="flex justify-center items-center p-5 min-h-screen bg-neutral-100">
      <section className="relative flex flex-col items-center p-4 bg-white rounded-xl shadow-lg w-[500px] min-h-[400px] max-md:w-full max-md:max-w-[450px] max-sm:p-4 border border-gray-200">
  <CloseButton /> 

      <img src={logo} alt="Logo" className="mb-4 w-16 h-[50px]" />
          <h1 className="mb-6 text-lg font-medium">Welcome Back !</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[350px] max-sm:max-w-full"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 text-xs text-black block"
              >
                Email*
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="px-4 py-2 w-full text-sm text-black rounded-md border border-gray-300 h-[36px]"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 text-xs text-black block"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="px-4 py-2 w-full text-sm text-black rounded-md border border-gray-300 h-[36px]"
                  required
                />
              <img src={eye} 
                  alt="Show password"
                  className="absolute right-4 top-2/4 w-4 h-3 -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <div className="mb-4 text-right">
  <a href="#" className="text-xs text-[#3E7CB1] no-underline">
    Forgot password?
  </a>
</div>

            </div>

            <Button type="submit">Log In</Button>
          </form>
          <footer className="mt-8 text-sm text-black">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-xs no-underline text-[#3E7CB1]">
  Sign Up
</Link>
          </footer>
        </section>
      </main>
    </>
  );
};

export default Login;
