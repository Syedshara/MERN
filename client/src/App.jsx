import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';

const App = () => {
  return (
   <BrowserRouter>
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