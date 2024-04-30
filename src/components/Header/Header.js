import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import "./Header.scss";

function Header({ failedAuth, setUser, setToken }) {
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		setToken(null);
	};

	const handleClick = () => {
		sessionStorage.removeItem("scrollPos");
	};

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
						<li className="header__nav-item" onClick={handleClick}>
							Home
						</li>
					</Link>
					<Link className="header__nav-link" to="/archive">
						<li className="header__nav-item" onClick={handleClick}>
							Archive
						</li>
					</Link>
					<div className="header__nav-access">
						{failedAuth && (
							<Link className="header__nav-link" to="/signup">
								<li className="header__nav-item">Sign Up</li>
							</Link>
						)}
						{failedAuth && (
							<Link className="header__nav-link" to="/login">
								<li className="header__nav-item">Log In</li>
							</Link>
						)}

						{!failedAuth && (
							<Link className="header__nav-link" to="">
								<li className="header__nav-item" onClick={handleLogout}>
									Log Out
								</li>
							</Link>
						)}
					</div>
				</ul>
			</div>
			<div className="header__input-wrapper">
				<select className="header__category input" name="category" onChange={() => ""}>
					<option value="">Select a Category</option>
					<option value="business">Business</option>
				</select>
				<input className="header__search input" placeholder="Search"></input>
			</div>
		</header>
	);
}

export default Header;
