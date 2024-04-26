import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
	return (
		<main className="login">
			<h1 className="login__title">Log In</h1>
			<form
				className="login__form"
				// onSubmit={handleSubmit}
			>
				<Input type="text" name="email" label="Email" />
				<Input type="password" name="password" label="Password" />

				<button className="login__button btn">Log in</button>

				{/* {error && <div className="login__message">{error}</div>} */}
			</form>
			<p>
				Need an account? <Link to="/signup">Sign up</Link>
			</p>
		</main>
	);
}

export default LoginPage;
