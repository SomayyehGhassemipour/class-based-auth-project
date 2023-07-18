import Button from '../shared components/Button';
import Input from '../shared components/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../services/firebase/AuthenicationService';

const Authenication = () => {
	const [state, setstate] = useState({
		email: '',
		password: '',
	});
	const { email, password } = state;

	const inputs = [
		{
			id: '1',
			name: 'email',
			label: 'Email',
			element: 'input',
			type: 'email',
			value: email,
			placeholder: 'Email',
		},
		{
			id: '2',
			name: 'password',
			label: 'Password',
			placeholder: 'Passwords',
			type: 'password',
			value: password,
			element: 'input',
		},
	];

	const navigate = useNavigate();
	const userAuth = useUserAuth();

	const changeHandler = (event) => {
		let { name, value } = event.target;
		setstate({ ...state, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const res = await userAuth.logIn(email, password);
		if (res === true) navigate('/home');
		else alert(res.error);
	};

	return (
		<>
			<div className="container">
				<div className="card">
					<div className="card-header">
						<h1>LOGIN</h1>
					</div>
					<div className="card-body">
						<form id="form" onSubmit={handleSubmit}>
							{inputs.map((input) => (
								<Input
									key={input.id}
									name={input.name}
									label={input.label}
									placeholder={input.placeholder}
									type={input.type}
									element={input.element}
									value={input.value}
									onchangeHandler={changeHandler}
								/>
							))}
						</form>
					</div>
					<div className="card-footer">
						<Button
							classname="button-text bg-blue-200 text-grey-500"
							form="form"
							type="submit"
						>
							Sign In
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default Authenication;
