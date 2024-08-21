import { createBrowserRouter } from "react-router-dom";
import Root from './layout/Root.jsx';

import Home from "./pages/Home.jsx";
import Communities from "./pages/Communities.jsx";
import Search from "./pages/Search.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
              path: "/",
              element: <Home />,
            },
            {
                path: "/communities",
                element: <Communities />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ]
    }
]);