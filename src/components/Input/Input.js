import "./Input.scss";

function Input({ label, name, type, customClass }) {
	return (
		<div className="field">
			<label htmlFor={name} className="field__label">
				{label}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={label}
				className={`field__input ${customClass}`}
			/>
		</div>
	);
}

export default Input;
