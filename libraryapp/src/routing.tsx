import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import SingleBookPage from "./pages/SingleBookPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/books",
                element: <BookPage />
            },
            {
                path: "/books/:id",
                element: <SingleBookPage />
            },
            {
                path: "/profile",
                element: <h1>Profile</h1>
            },
            {
                path: "/reviews",
                element: <h1>Reviews</h1>
            }
        ]
    }

])
export default router;