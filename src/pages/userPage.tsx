import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { User } from "../types/auth.types";
import type { Review } from "../types/review.types";
import StarRating from "../components/StarRating";

interface ReviewWithBook extends Review {
  bookInfo?: { 
    title: string;
    authors?: string[];
    thumbnail?: string;
  };
}

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<ReviewWithBook[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user profile
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const res = await fetch(`https://librarybackend-c0p9.onrender.com/api/users/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data: User = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching user profile");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    // Fetch reviews for this user
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await fetch(`https://librarybackend-c0p9.onrender.com/api/users/${id}/reviews`);
        if (!res.ok) throw new Error("Failed to fetch user reviews");
        const reviewsData: ReviewWithBook[] = await res.json();
        setReviews(reviewsData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching reviews");
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loadingUser) return <p>Loading user profile...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "3rem auto", padding: "2rem", backgroundColor: "#e6e6e6", borderRadius: "2em" }}>
      <h1 style={{ color: "#000" }}>{user.username}</h1>
      <h2 style={{ color: "#000", marginTop: "1rem" }}>Reviews</h2>

      {loadingReviews ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>This user hasn't written any reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "1rem 0",
              borderBottom: "1px solid #000",
              color: "#000",
            }}
          >
            {r.bookInfo?.thumbnail && (
              <img
                src={r.bookInfo.thumbnail}
                alt={r.bookInfo.title}
                style={{ width: "100px", objectFit: "contain" }}
              />
            )}

            <div style={{ flex: 1, minWidth: "200px" }}>
              <Link to={`/book/${r.bookId}`} style={{  fontWeight: "bold", textDecoration: "none", color: "#000" }}>
                {r.bookInfo?.title || "Unknown Title"}
              </Link>

              {r.bookInfo?.authors && (
                <p style={{ margin: "0.2rem 0" }}>by {r.bookInfo.authors.join(", ")}</p>
              )}

              <StarRating rating={r.rating} />
              <p style={{ margin: "0.2rem 0" }}>
                ({r.rating} / 5)
              </p>

              <p style={{ fontSize: "0.8rem", color: "#555", margin: "0.2rem 0" }}>
                Posted: {new Date(r.createdAt).toLocaleDateString()}
              </p>
              <p style={{ margin: 0 }}>{r.reviewText}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfilePage;
