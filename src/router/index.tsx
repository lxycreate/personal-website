import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@layout/layout";
import View from "@views/view";
import JavaScript from "@views/javascript/javascript";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/javascript" />,
            },
            {
                path: "/javascript",
                element: <View />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/javascript/default" />,
                    },
                    { path: "/javascript/default", element: <JavaScript /> },
                ],
            },
        ],
    },
]);

export default router;
