import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import SignupPage from "./pages/SignupPage.tsx";
import VirtualGrid from "./components/VirtualGrid.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/signup',
        element: <SignupPage/>
    },
    {
        path: '/test',
        element: <VirtualGrid width={100} height={100}/>
    }
])

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#039374',
        },
        secondary: {
            main: '#032393',
        },
    },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={createTheme(themeOptions)}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
