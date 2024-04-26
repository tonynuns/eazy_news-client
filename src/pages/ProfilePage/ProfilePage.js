import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./ProfilePage.scss";

function ProfilePage({ user, setUser }) {
	const navigate = useNavigate();
	const [failedAuth, setFailedAuth] = useState(false);

	const token = sessionStorage.getItem("token");

	useEffect(() => {
		const getUserInfo = async () => {
			if (!token) {
				return setFailedAuth(true);
			}
			// Get the data from the API
			const profileUrl = "http://localhost:8080/users/profile";
			try {
				const response = await axios.get(profileUrl, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUser(response.data);
				sessionStorage.setItem("user_info", response.data);
			} catch (error) {
				setFailedAuth(true);
			}
		};
		getUserInfo();
	}, []);

	if (failedAuth) {
		return (
			<main className="profile">
				<p>You must be logged in to view this page.</p>
				<p>
					<Link to="/login">Log in</Link>
				</p>
			</main>
		);
	}

	if (user === null) {
		return (
			<main className="profile">
				<p>Loading...</p>
			</main>
		);
	}

	return (
		<main className="profile">
			<p>Welcome, {user.first_name}</p>

			<div className="profile__info">
				<h1 className="profile__title">Your Details</h1>
				<p>First Name: {user.first_name}</p>
				<p>Last Name: {user.last_name}</p>
				<p>Email: {user.email}</p>

				<button className="profile__button btn" onClick={() => navigate("/")}>
					Continue
				</button>
			</div>
		</main>
	);
}

export default ProfilePage;
