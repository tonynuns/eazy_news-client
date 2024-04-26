import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";

function SignUpPage() {
	return (
		<main className="signup">
			<h1 className="signup__title">Sign Up</h1>
			<form
				className="signup__form"
				// onSubmit={handleSubmit}
			>
				<Input type="text" name="first_name" label="First Name" />
				<Input type="text" name="last_name" label="Last Name" />
				<Input type="email" name="email" label="Email" />
				<Input type="password" name="password" label="Password" />
				<Input type="password" name="cpassword" label="Confirm Password" />
				<button className="signup__button btn">Sign up</button>

				{/* {success && <div className="signup__message">Signed up!</div>}
					{error && <div className="signup__message">{error}</div>} */}
			</form>
			<p>
				Have an account? <Link to="/login">Log in</Link>
			</p>
		</main>
	);
}

export default SignUpPage;
