import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import "./App.scss";

function App() {
	const [user, setUser] = useState(null);
	const userInfo = sessionStorage.getItem("user_info");

	useEffect(() => {
		setUser(userInfo);
	}, [userInfo]);
	return (
		<div className="app-container">
			<BrowserRouter>
				<Header user={user} setUser={setUser} />
				<div className="main-body">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/archive" element={<HomePage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
						<Route path="/:id" element={<NewsDetailPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
