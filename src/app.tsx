import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import HomePage from "./pages/home.js";
import RootLayout from "./root_layout.js"; // Обов'язково імпортуємо RootLayout (перевір шлях до файлу!)
import UserProfilePage from "./pages/UserProfilePage.js";
import CardsWithUsers from "./pages/CardsWithUsers.js";

const NotFoundPage = () => (
    <div> 
        <h1 className="text-7xl text-red-950 uppercase font-bold">404 Not Found.</h1> 
        <Link to='/'>Go home</Link>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'user-profile/:id', 
                element: <UserProfilePage />
            },
            {
                path: 'user-profile', 
                element: <UserProfilePage />
            },
            {
                path:'cards-user',
                element:<CardsWithUsers/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);

const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default App;