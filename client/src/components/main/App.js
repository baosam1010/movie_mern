// import './../../sass/css/app.css';
import Header from './../header/Header';
import { Route, Routes } from 'react-router-dom';
import { paths } from './../../constants/paths';
import Footer from '../footer/Footer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  const showRouter = (paths) => {
    return paths.map(item => {
      // console.log(item)
      const { path, element: Element, ...props } = item
      return <Route key={path} path={path} element={<Element {...props}/>}/>
    })
  }

  return (
    <div className="app">
      <Header />
      {/* <div className="container"> */}
        <Routes>
          {showRouter(paths)}
        </Routes>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
