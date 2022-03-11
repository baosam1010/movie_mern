import Auth from '../components/form/Auth';
import Main from '../components/main/Main';
import ListPage from '../pages/listPage/ListPage';
import FilmPage from '../pages/filmPage/FilmPage';
import NotFound from '../pages/notfound/NotFound';
import ProtectRoute from '../components/protectRoute/ProtectRoute';

export const  paths = [
    {
        path:"/",
        element: Main
    },
    {
        path:"/login",
        authRoute:'login',
        element: Auth
    },
    {
        path:"/register",
        authRoute:'register',
        element: Auth
    },
   
    {
        path:"/info/:slug",
        element: FilmPage
    },
    {
        path:"/list/:slug",
        element: ListPage
    },
    {
        path:"/list",
        element: ListPage
    },
    {
        path:"/dashboard/*",
        element: ProtectRoute
    },
    {
        path:"*",
        element: NotFound
    },
    
];

export const API_URL = "http://192.168.0.102:5000/api" 


