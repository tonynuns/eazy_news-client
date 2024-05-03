import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { getUserProfile } from "./utils/apiMethods/usersApi";
import { useState, useEffect } from "react";
import "./App.scss";

function App() {
	const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
	const [token, setToken] = useState(sessionStorage.getItem("token"));

	useEffect(() => {
		const getUserInfo = async () => {
			if (!token) {
				return setFailedAuth(true);
			}
			// if token exists in session storage, get the user data from the backend API
			const profileResponse = await getUserProfile(token);
			if (profileResponse !== "error") {
				setUser(profileResponse);
				setFailedAuth(false);
			} else {
				setFailedAuth(true);
			}
		};
		getUserInfo();
	}, [token]);

	return (
		<div className="app-container">
			<BrowserRouter>
				<ScrollToTop />
				<Header failedAuth={failedAuth} setUser={setUser} setToken={setToken} />
				<div className="main-body">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/archive" element={<HomePage />} />
						<Route path="/:id" element={<NewsDetailPage user={user} />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/login" element={<LoginPage setToken={setToken} />} />
						<Route path="/profile" element={<ProfilePage user={user} failedAuth={failedAuth} />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
