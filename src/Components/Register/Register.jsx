import { useState } from "react";
import "./register.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
const Register = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const [isWrongPassword, setIsWrongPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            fullName: userName,
            password: password
        }
        if (confirmPassword !== password) {
          setIsWrongPassword("Mật khẩu nhập lại không đúng!")
           return;
        } else
        if (!email || !userName || !password || !confirmPassword) {
          setIsValidate("Thông tin cung cấp thiếu");
          return;
        } else {
          registerUser(newUser, dispatch, navigate);
          setIsValidate("")
        }
    }
    return (
      <section className="register-container">
        <div className="register-title"> Register </div>
        <form onSubmit={handleRegister}>
          <div>
            <span className="text-danger mb-2">{isValidate}</span>
          </div>
          <label>Email</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Full Name</label>
          <input
            type="text"
            className="mb-2"
            placeholder="Enter your full name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Confirm password"
            onChange={(e) => {setConfirmPassword(e.target.value); setIsWrongPassword('')}}
          />
          <div>
            <span className="text-danger mb-2">{isWrongPassword}</span>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {" "}
            Create account{" "}
          </button>
          <div className="login-login"> You have an account ? </div>
          <Link className="login-login-link" to="/login">
            Back to Login
          </Link>
        </form>
      </section>
    );
}
 
export default Register;