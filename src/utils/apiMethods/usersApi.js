import axios from "axios";

const signUpUser = async (formObj) => {
	const signUpUrl = "http://localhost:8080/users/signup";
	const { first_name, last_name, email, password } = formObj;
	try {
		const response = await axios.post(signUpUrl, {
			first_name,
			last_name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

const loginUser = async (formObj) => {
	const loginUrl = "http://localhost:8080/users/login";
	const { email, password } = formObj;
	try {
		const response = await axios.post(loginUrl, {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

const getUserProfile = async (token) => {
	const profileUrl = "http://localhost:8080/users/profile";
	try {
		const response = await axios.get(profileUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		return "error";
	}
};

export { signUpUser, loginUser, getUserProfile };
