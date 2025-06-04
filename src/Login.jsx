import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입용 필드
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("user");

  const API = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/admin/login`, {
        email,
        password,
      });
      const token = res.data.access_token;
      onLogin(token);
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/users`, {
        email: regEmail,
        password: regPassword,
        name: regName,
        role: regRole,
      });
      alert("회원가입 성공! 로그인 해주세요.");
      setIsRegistering(false);
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <div>
      <form className="test" onSubmit={handleLogin}>
        <input
          className="input"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="input"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button" type="submit">
          로그인
        </button>
      </form>

      <br />
    </div>
  );
}

export default Login;
