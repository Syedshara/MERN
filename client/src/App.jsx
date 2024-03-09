import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';
import Header from './pages/Header';

const App = () => {
  return (
   <BrowserRouter>
       <Header/>
       <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/sign-in" element={<Signin/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/projects" element={<Projects/>}/>
       </Routes>
   </BrowserRouter>
  )
}

export default App