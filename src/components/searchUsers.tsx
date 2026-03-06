import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/auth.types";
import accountIcon from "../assets/account_circle.svg";

interface SearchUsersProps {
  savedUsers: User[];
  setSavedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ savedUsers, setSavedUsers }) => {
  const { user: currentUser } = useAuth();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://librarybackend-c0p9.onrender.com/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: User[] = await res.json();
        setUsers(data.filter(u => u._id !== currentUser?._id));
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter(u => u.username.toLowerCase().includes(q));
  }, [search, users]);

  // Follow / Unfollow
  const toggleFollow = async (userId: string) => {
    if (!token) return;
    const method = savedUsers.some(u => u._id === userId) ? "DELETE" : "POST";

    const res = await fetch(`https://librarybackend-c0p9.onrender.com/api/users/${userId}/save`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;

    const userObj = users.find(u => u._id === userId);
    if (!userObj) return;

    setSavedUsers(prev =>
      method === "POST" ? [...prev, userObj] : prev.filter(u => u._id !== userId)
    );
  };

  return (
    <div style={{ maxWidth: "20em",  }}>
 
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", margin: "1rem 0" }}
      />

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredUsers.length === 0 && <p>No users found.</p>}

    {filteredUsers.slice(0, 5).map(u => {
        const isFollowing = savedUsers.some(su => su._id === u._id);
        return (
          <div  
            key={u._id}
            style={{
              padding: "0.8rem",
              marginBottom: "0.5rem",
              backgroundColor: "white",
              borderRadius: "1.5rem",
              display: "flex",
              justifyContent: "space-between"
            
            }}
          > 
            <Link 
              to={`/user/${u._id}`}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "0.5rem",
                color: "#111",
                textDecoration: "none",
              }}
            >
              <img src={accountIcon} alt="icon" width="25px" />
              {u.username}
            </Link>

            {token && (
              <button
                onClick={() => toggleFollow(u._id)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "1rem",
                  border: "none",
                  margin: "auto",
                  cursor: "pointer",
                  backgroundColor: isFollowing ? "#ac4a3d" : "#2f5157",
                  color: "white",
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SearchUsers;
