// import './../../sass/css/app.css';
import Header from './../header/Header';
import { Route, Routes } from 'react-router-dom';
import { paths } from './../../constants/paths';
import Footer from '../footer/Footer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { LoadUser } from '../../actions/Actions';
import { LocalStorage_TokenName } from '../../constants/actionsType';

function App(props) {
  const dispatch = useDispatch();
  const {info} = props;
  const {accessToken} = info;
  // const {userLoading}= info;
  
  const showRouter = (paths) => {
    return paths.map(item => {
      const { path, element: Element, ...props } = item
      return <Route key={path} path={path} element={<Element {...props}/>}/>
    })
  }

  
  useEffect(() => {
    if( localStorage[LocalStorage_TokenName]){
      dispatch(LoadUser(localStorage[LocalStorage_TokenName]))
    }
    return () => {
      
    }
  
  }, [accessToken, dispatch])
  
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
