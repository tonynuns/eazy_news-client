import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./LoginPage.scss";

function LoginPage() {
	const navigate = useNavigate();
	const [formError, setFormError] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const isFormValid = (formObj) => {
		let response = true;

		for (const key in formObj) {
			if (formObj[key] === "") {
				setFormError((previous) => ({ ...previous, [key]: "empty" }));
			}
		}

		return response;
	};

	const handleSubmit = async (e) => {
		const loginUrl = "http://localhost:8080/users/login";
		e.preventDefault();
		setFormError({});
		const formObj = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		if (isFormValid(formObj) === false) return;

		try {
			const response = await axios.post(loginUrl, formObj);
			setErrorMessage("");
			sessionStorage.setItem("token", response.data.token);
			navigate("/profile");
		} catch (error) {
			setErrorMessage(error.response.data);
		}
	};

	return (
		<main className="login">
			<h1 className="login__title">Log In</h1>
			<form className="login__form" onSubmit={handleSubmit}>
				<Input
					type="text"
					name="email"
					label="Email"
					customClass={formError.email !== undefined ? "signup__form-error" : ""}
				/>
				<Input
					type="password"
					name="password"
					label="Password"
					customClass={formError.password !== undefined ? "signup__form-error" : ""}
				/>
				<button className="login__button btn">Log in</button>

				{errorMessage && <div className="login__message">{errorMessage}</div>}
			</form>
			<p>
				Need an account? <Link to="/signup">Sign up</Link>
			</p>
		</main>
	);
}

export default LoginPage;
