import "./Footer.scss";

function Footer() {
	return (
		<footer className="footer">
			<p>&copy; {`${new Date().getFullYear()} EazyNews. All Rights Reserved`}</p>
		</footer>
	);
}

export default Footer;
