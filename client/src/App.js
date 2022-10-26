import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import PlayDateRequests from './pages/PlayDateRequests';

import Home from './components/Home.js';
import Friends from './pages/Friends';
import Posts from './pages/Posts';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout></Layout>}>
					<Route path='' element={<Home />}></Route>
					<Route
						path='play_date_requests'
						element={<PlayDateRequests />}
					></Route>
					<Route path='signin' element={<SignIn />} />
					<Route path='posts' element={<Posts />}></Route>
					<Route path='friends' element={<Friends />}></Route>
					<Route path='profile' element={<Profile></Profile>}></Route>
					<Route path='calendar' element={<Calendar></Calendar>}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
