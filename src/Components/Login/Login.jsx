import {  useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const error = useSelector((state)=> state.auth.login?.msg)
    const dispatch = useDispatch()
    const navigate = useNavigate()
     
    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        setIsValidate("Error : Thông tin cung cấp thiếu");
        return;
      }
    
      try {
        const newUser = {
          email: email,
          password: password,
        };
    
        const errorMessage = await loginUser(newUser, dispatch, navigate);
        
        if (errorMessage) {
          setIsValidate(errorMessage);
        } else {
          setIsValidate(errorMessage || error);
          await loginUser(newUser, dispatch, navigate);
        }
      } catch (error) {
        console.error("Lỗi trong quá trình đăng nhập:", error);
        setIsValidate("Đã xảy ra lỗi trong quá trình đăng nhập.");
      }
    };
    return (
      <section className="login-container">
        <div className="login-title"> Login</div>
        <form onSubmit={handleLogin}>
          <div>
            <span className="text-danger">{isValidate}</span>
          </div>
          <label>Email</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">
            {" "}
            Login{" "}
          </button>
        </form>
        <div className="login-register"> Don't have an account yet? </div>
        <Link className="login-register-link" to="/register">
          Go to Register !{" "}
        </Link>
      </section>
    );
}
 
export default Login;