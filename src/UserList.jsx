import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function UserList({ token, page }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("유저 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`${API_BASE}/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `${API_BASE}/admin/users/${userId}`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("역할 변경 실패:", error);
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <table
      border="1"
      cellPadding="1"
      style={{ borderCollapse: "collapse", marginTop: "1rem" }}
    >
      <thead
        style={{
          backgroundColor: "#f5f5f5",
          color: "#333",
          fontWeight: "bold",
          textAlign: "left",
          borderBottom: "2px solid #ccc",
        }}
      >
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>이름</th>
          <th>닉네임</th>
          <th>권한</th>
          <th>가입일</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody
        style={{
          backgroundColor: "#fff",
          color: "#333",
          fontWeight: "14px",
        }}
      >
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.nickname || "-"}</td>
            <td>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </td>
            <td>{new Date(user.created_at).toLocaleString()}</td>
            <td>
              <button onClick={() => handleDelete(user.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
