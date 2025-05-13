import { useEffect, useState } from "react";

function UserList({ token }) {
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8000/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("유저 목록 불러오기 실패");

            const data = await res.json();
            setUsers(data);
        } catch (e) {
            setErr(e.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    return (
        <div>
            <h2>👥 유저 목록</h2>
            {err ? (
                <p style={{ color: "red" }}>{err}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> ({user.email}) / {user.role}
                            {user.nickname && <> / 닉네임: {user.nickname}</>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserList;
