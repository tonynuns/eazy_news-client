import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import "./Header.scss";

function Header() {
	return (
		<header className="header">
			<div className="header__container">
				<div>
					<Link to="/">
						<img className="header__logo" src={logo} alt="EazyNews Logo" />
					</Link>
				</div>
				<ul className="header__nav">
					<Link className="header__nav-link" to="/">
						<li className="header__nav-item">Home</li>
					</Link>
					<Link className="header__nav-link" to="/archive">
						<li className="header__nav-item">Archive</li>
					</Link>
					<div className="header__nav-access">
						<Link className="header__nav-link" to="/signup">
							<li className="header__nav-item">Sign Up</li>
						</Link>
						<Link className="header__nav-link" to="/login">
							<li className="header__nav-item">Log In</li>
						</Link>
						<Link className="header__nav-link" to="">
							<li className="header__nav-item">Log Out</li>
						</Link>
					</div>
				</ul>
			</div>
			<div className="header__input-wrapper">
				<select className="header__category input" name="category" onChange="">
					<option value="">Select a Category</option>
					<option value="business">Business</option>
				</select>
				<input className="header__search input" placeholder="Search"></input>
			</div>
		</header>
	);
}

export default Header;
