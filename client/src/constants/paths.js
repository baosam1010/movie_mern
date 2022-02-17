import SubtanceMain from './../components/subtancemain/SubtanceMain';
import Auth from '../components/form/Auth';

const  paths = [
    {
        path:"/",
        element: SubtanceMain
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
