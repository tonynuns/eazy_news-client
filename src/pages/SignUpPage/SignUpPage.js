import Input from "../../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../utils/apiMethods/usersApi";
import "./SignUpPage.scss";

function SignUpPage() {
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
		if (formObj.password !== formObj.confirm_password) {
			response = false;
			setErrorMessage("Passwords do not match");
			setFormError((previous) => ({ ...previous, password: "empty", confirm_password: "empty" }));
		}
		return response;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError({});
		const formObj = {
			first_name: e.target.first_name.value,
			last_name: e.target.last_name.value,
			email: e.target.email.value,
			password: e.target.password.value,
			confirm_password: e.target.cpassword.value,
		};
		if (isFormValid(formObj) === false) return;

		const signUpResponse = await signUpUser(formObj);
		if (signUpResponse === "Registered successfully") {
			setErrorMessage("");
			navigate("/login");
		} else {
			setErrorMessage(signUpResponse);
		}
	};

	return (
		<main className="signup">
			<h1 className="signup__title">Sign Up</h1>
			<form className="signup__form" onSubmit={handleSubmit}>
				<Input
					type="text"
					name="first_name"
					label="First Name"
					customClass={formError.first_name !== undefined ? "signup__form-error" : ""}
				/>
				<Input
					type="text"
					name="last_name"
					label="Last Name"
					customClass={formError.last_name !== undefined ? "signup__form-error" : ""}
				/>
				<Input
					type="email"
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
				<Input
					type="password"
					name="cpassword"
					label="Confirm Password"
					customClass={formError.confirm_password !== undefined ? "signup__form-error" : ""}
				/>
				<button className="signup__button btn">Sign up</button>

				{errorMessage && <div className="signup__message">{errorMessage}</div>}
			</form>
			<p>
				Have an account? <Link to="/login">Log in</Link>
			</p>
		</main>
	);
}

export default SignUpPage;
