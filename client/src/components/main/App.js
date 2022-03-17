// import './../../sass/css/app.css';
import Header from './../header/Header';
import { Route, Routes } from 'react-router-dom';
import { paths } from './../../constants/paths';
import Footer from '../footer/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { LoadUser, Login, Register } from '../../actions/Actions';
import { LocalStorage_TokenName } from '../../constants/actionsType';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_API_FIREBASE_DOMAIN,
  // ...
};
firebase.initializeApp(config);


function App(props) {
  const dispatch = useDispatch();
  const { info, } = props;
  const { accessToken,  message } = info;
  // const {userLoading}= info;

  const showRouter = (paths) => {
    return paths.map(item => {
      const { path, element: Element, ...props } = item
      return <Route key={path} path={path} element={<Element {...props} />} />
    })
  }


  useEffect(() => {
    if (localStorage[LocalStorage_TokenName]) {
      dispatch(LoadUser(localStorage[LocalStorage_TokenName]))
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }
      const getLogin = async () => {
        try {
          if (user.displayName !== "" && user.uid !== "") {
            dispatch(Login({
              username: user.displayName,
              password: user.uid
            }
            ))
          }

        } catch (error) {
          throw error
        }
      };
      const getRegister = async () => {
        try {
          if (user.displayName !== "" && user.uid !== "") {
            dispatch(Register({
              username: user.displayName,
              password: user.uid
            }
            ))
          }

        } catch (error) {
          throw error
        }
      };
      if (!localStorage[LocalStorage_TokenName]) {
        getRegister()
      }
      if(message === "Username has been used"){
        getLogin();
      }
      
      // const token = await user.getIdToken();
    });

    return () => unregisterAuthObserver();

  }, [dispatch, message]);

  return (
    <div className="app">
      <Header />
      <Routes>
        {showRouter(paths, props)}
      </Routes>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    info: state.user,

  }
}
export default connect(mapStateToProps, null)(App);
