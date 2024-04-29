import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./ProfilePage.scss";

function ProfilePage({ user, failedAuth }) {
	const navigate = useNavigate();

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
