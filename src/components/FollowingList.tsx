import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/auth.types";

interface FollowingListProps {
  savedUsers: User[];
  setSavedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const FollowingList: React.FC<FollowingListProps> = ({ savedUsers, setSavedUsers }) => {
  const token = localStorage.getItem("token");

  const handleUnfollow = async (userId: string) => {
    if (!token) return;

    const res = await fetch(`https://librarybackend-c0p9.onrender.com/api/users/${userId}/save`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;

    setSavedUsers(prev => prev.filter(u => u._id !== userId));
  };

  if (savedUsers.length === 0) return <p>You are not following anyone yet.</p>;

  return (
    <div>

      {savedUsers.map(u => (
        <div
          key={u._id}
          style={{
            display: "flex",
            flexDirection:"row",
            verticalAlign: "center",
         gap: "2em",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0.8rem",
            marginTop: "0.4em",
            marginBottom: "0.5rem",
            backgroundColor: "white",
            borderRadius: "1.5rem",
          }}
        >
          <Link to={`/user/${u._id}`} style={{ fontWeight: 600, textDecoration: "none", color: "#111" }}>
            {u.username}
          </Link>
          <button
            onClick={() => handleUnfollow(u._id)}
            style={{
              padding: "0.3rem 0.8rem",
              cursor: "pointer",
              margin: "auto",
              borderRadius: "1rem",
              backgroundColor: "#ac4a3d",
              color: "white",
              border: "none",
              
            }}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowingList;
