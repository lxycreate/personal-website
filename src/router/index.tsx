import { createHashRouter, Navigate } from "react-router-dom";
import Layout from "@layout/layout";
import View from "@views/view";
import JavaScript from "@views/javascript/javascript";
import Html from "@views/html/html";
import Css from "@views/css/css";
const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/javascript" />,
            },
            {
                path: "/html",
                element: <View />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/html/default" />,
                    },
                    {
                        path: "/html/default",
                        element: <Html />,
                    },
                ],
            },
            {
                path: "/css",
                element: <View />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/css/default" />,
                    },
                    {
                        path: "/css/default",
                        element: <Css />,
                    },
                ],
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
