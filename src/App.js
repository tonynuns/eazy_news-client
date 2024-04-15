import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NewsDetailPage from "./pages/NewsDetailPage/NewsDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Header />
				<div className="main-body">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/archive" element={<HomePage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/login" element={<LoginPage />} />
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
