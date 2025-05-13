import { useState } from "react";
import Login from "./Login";
import UserList from "./UserList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <UserList token={token} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
