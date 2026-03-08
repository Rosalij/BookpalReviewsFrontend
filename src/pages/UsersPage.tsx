import React, { useEffect, useState } from "react";
import SearchUsers from "../components/searchUsers";
import FollowingList from "../components/FollowingList";
import type { User } from "../types/auth.types";
import { useAuth } from "../context/AuthContext"

const UsersPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = useAuth()
  const [savedUsers, setSavedUsers] = useState<User[]>([]);

  // Fetch saved users on mount
  useEffect(() => {
    if (!token) return;
    const fetchSavedUsers = async () => {
      try {
        const res = await fetch(
          "https://librarybackend-c0p9.onrender.com/api/users/me/saved",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch followed users");
        const data: User[] = await res.json();
        setSavedUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedUsers();
  }, [token]);

  return (
    <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "center", gap: "2em", flexWrap: "wrap" }}>
      <div style={{ backgroundColor: "#d0d4d89d", width: "25em", padding: "3em", borderRadius: "2em", marginTop: "2em", marginBottom: "2em" }}>
        <h2>Search users</h2>     {user && (<h3 style={{ fontWeight: "300" }}>You must be logged in to follow other users</h3>)}
{/* SearchUsers Compnent showing searchable users in list */}
        <SearchUsers savedUsers={savedUsers} setSavedUsers={setSavedUsers} />
      </div>
      <div style={{ backgroundColor: "#d0d4d89d", width: "25em", padding: "3em", borderRadius: "2em", marginTop: "2em", marginBottom: "2em" }}>
        <h2>Following</h2>
{/* FollowingList Component, SetSavedUsers on unfollow */}
        <FollowingList savedUsers={savedUsers} setSavedUsers={setSavedUsers} />
      </div>
    </div>
  );
};

export default UsersPage;
