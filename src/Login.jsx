import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await fetch("http://localhost:8000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("로그인 실패");
            }

            const data = await res.json();
            onLogin(data.access_token);
        } catch (e) {
            setErr(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>이메일:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>비밀번호:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">로그인</button>
            {err && <p style={{ color: "red" }}>{err}</p>}
        </form>
    );
}

export default Login;