import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import type { Review } from "../types/review.types";
import StarRating from "./StarRating";


//Component for getting the 5 latest reviews in a list

//interface extending Review type form matching google books
interface ReviewWithBook extends Review {
  title: string;
  thumbnail: string;
}

const LatestReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewWithBook[]>([]);
  const [loading, setLoading] = useState(true);

  //fetch latest reviews on page load
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(
          "https://librarybackend-c0p9.onrender.com/api/reviews/latest"
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const reviewData: Review[] = await res.json();

        //After fetching reviews, get book info via google books, with bookId
        const getBooks = await Promise.all(
          reviewData.map(async (review) => {
            let title = "Unknown Title";
            let thumbnail = "./placeholder.jpg";

            try {
              const bookRes = await fetch(
                `https://librarybackend-c0p9.onrender.com/api/books/${review.bookId}`
              );
              if (bookRes.ok) {
                const bookData = await bookRes.json();

                title = bookData.volumeInfo?.title || "Unknown Title";

                thumbnail =
                  bookData.volumeInfo?.imageLinks?.thumbnail ||
                  "/placeholder.jpg";
              }

            } catch (err) {
              console.error(`Failed to fetch book ${review.bookId}`, err);
            }

            return {
              ...review,
              title,
              thumbnail,
            };
          })
        );

        //set reviews
        setReviews(getBooks);
      } catch (err) {
        console.error("Failed to fetch latest reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) return <p>Loading latest reviews...</p>;


  return (
    <div
      style={{
        margin: "auto",
        maxWidth: "50em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "white",
        borderRadius: "2em",
        marginBottom: "2em",
      }}
    >
      {/*list of latest reviews*/}
      <h2 style={{ margin: "2em" }}>Latest Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              display: "flex",
              gap: "1rem",
              borderBottom: "1px solid #ccc",
              padding: "1.5em",
              alignItems: "center",
            }}
          >
            <img
              src={r.thumbnail}
              alt={r.title}
              style={{ width: "100px", objectFit: "cover" }}
            />

            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <h4>{r.title}</h4>

              <div
                style={{
                  display: "flex",
                  margin: "auto",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {r.user ? (
                  <strong>
                    <NavLink
                      to={`/user/${r.user._id}`}
                      style={{ color: "black" }}
                    >
                      {r.user.username}
                    </NavLink>
                  </strong>
                ) : (
                  <strong>Unknown</strong>
                )}
  {/*Star rating component used for rating for each review*/}     
 <StarRating rating={r.rating} />
              </div>

              <p>{r.reviewText || "No review text available."}</p>

              <Link
                to={`/book/${r.bookId}`}
                style={{ color: "black", width: "100%" }}
              >
                View Book →
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LatestReviews;
