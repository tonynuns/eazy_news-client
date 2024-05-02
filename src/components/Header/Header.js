import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo.jpg";
import "./Header.scss";

function Header({ failedAuth, setUser, setToken }) {
	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("scrollPos");
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
				</ul>

				<div className="header__nav-access-wrapper">
					{failedAuth && (
						<ul className="header__nav-access">
							<Link className="header__nav-link" to="/signup">
								<li className="header__nav-item">Sign Up</li>
							</Link>

							<Link className="header__nav-link" to="/login">
								<li className="header__nav-item">Log In</li>
							</Link>
						</ul>
					)}

					{!failedAuth && (
						<ul className="header__nav-access">
							<Link className="header__nav-link" to="/profile">
								<li className="header__nav-item" onClick={handleClick}>
									Profile
								</li>
							</Link>
							<Link className="header__nav-link" to="">
								<li className="header__nav-item" onClick={handleLogout}>
									Log Out
								</li>
							</Link>
						</ul>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
