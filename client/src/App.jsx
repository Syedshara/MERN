import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import Projects from './pages/Projects';
import Header from './pages/Header';
import Footer from './components/Footer';
import ProtextDashboard from './components/ProtextDashboard';
import AdminProtectPost from './components/AdminProtectPost';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost'
import ShowPost from './components/ShowPost';
import ScrollUp from './components/ScrollUp';
import Search from './components/Search';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollUp />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path='/search' element={<Search />} />
        <Route element={<ProtextDashboard />} >
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route element={<AdminProtectPost />} >
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postslug" element={<ShowPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App