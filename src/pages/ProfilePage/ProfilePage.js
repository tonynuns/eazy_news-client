import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";

function ProfilePage() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	return (
		<main className="profile">
			<p>
				Welcome,
				{/* {user.first_name} {user.last_name} */}
			</p>

			<div className="profile__info">
				<h1 className="profile__title">Your Details</h1>
				<p>
					First Name:
					{/* {user.email} */}
				</p>
				<p>
					Last Name:
					{/* {user.phone} */}
				</p>
				<p>
					Email:
					{/* {user.address} */}
				</p>

				<button className="profile__button btn" onClick={() => navigate("/")}>
					Continue
				</button>
			</div>
		</main>
	);
}

export default ProfilePage;
