import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile></Profile>}></Route>
          <Route path="calendar" element={<Calendar></Calendar>}></Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
