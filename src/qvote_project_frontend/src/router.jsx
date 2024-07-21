import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes.ts";
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
              path: routes[0].path,
              element: <Home />,
            },
            {
                path: routes[1].path,
                element: <Communities />,
            },
            {
                path: routes[2].path,
                element: <Search />,
            },
        ]
    }
]);