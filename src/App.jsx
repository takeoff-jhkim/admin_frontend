import { useState, useEffect } from "react";
import Login from "./Login";
import UserList from "./UserList";
import { jwtDecode } from "jwt-decode";
import "./App.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [page, setPage] = useState(1);

  const getTokenExpiration = (token) => {
    try {
      console.log
      const decoded = jwtDecode(token);
      return decoded.exp * 1000;
    } catch (error) {
      return null;
    }
  }

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    const expiration = getTokenExpiration(newToken);
    const timeRemaining = expiration - Date.now();

    if (logoutTimer) clearTimeout(logoutTimer);
    const timerId = setTimeout(() => {
      handleLogout();
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    }, timeRemaining);

    setLogoutTimer(timerId)
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  useEffect(() => {
    if (token) {
      const expiration = getTokenExpiration(token);
      if (Date.now() >= expiration) {
        handleLogout();
      } else {
        const timeRemaining = expiration - Date.now();
        const timerId = setTimeout(() => {
          handleLogout();
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        }, timeRemaining);
        setLogoutTimer(timerId)
      }
    }
  }, []);

  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <input
            type="text"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            placeholder=""
            className="border px-2 py-1 rounded"
          />
          <UserList token={token} page={page} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
