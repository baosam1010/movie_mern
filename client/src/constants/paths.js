import Auth from '../components/form/Auth';
import Main from '../components/main/Main';

const  paths = [
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
];

export {paths}
