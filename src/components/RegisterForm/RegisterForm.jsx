import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const userInfo = {
		username: "",
		password: "",
		first_name: "",
		last_name: "",
		phone_number: "",
		street_address: "",
		unit: "",
		city: "",
		state: "",
		zip: "",
		allergies: "",
		accommodations: "",
  };
  const [regPayload, setRegPayload] = useState(userInfo);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: regPayload,
    });
    setRegPayload(userInfo)
  }; // end registerUser

  const secretDiv = () =>{
    const testingLogin = {
		username: "ChangeMe@example.com",
		password: "123",
		first_name: "Basic",
		last_name: "User",
		phone_number: "(555) 123-4567",
		street_address: "123 boo st",
		unit: "",
		city: "Gotham",
		state: "Bliss",
		zip: "55407",
		allergies: "None",
		accommodations: "Paint me like one of your french girls.",
	};
    setRegPayload(testingLogin)


  }

  return (
		<form className="formPanel" onSubmit={registerUser}>
			<h2 onClick={secretDiv}>Register User</h2>
			{errors.registrationMessage && (
				<h3 className="alert" role="alert">
					{errors.registrationMessage}
				</h3>
			)}
			<div>
				<label htmlFor="email">
					Email:
					<input
						type="email"
						name="email"
						value={regPayload.username}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								username: event.target.value,
							})
						}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						value={regPayload.password}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								password: event.target.value,
							})
						}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="first_name">
					First Name:
					<input
						type="text"
						name="first_name"
						value={regPayload.first_name}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								first_name: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="last_name">
					Last Name:
					<input
						type="text"
						name="last_name"
						value={regPayload.last_name}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								last_name: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="phone_number">
					Phone Number:
					<input
						type="text"
						name="phone_number"
						value={regPayload.phone_number}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								phone_number: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="street_address">
					Street Address:
					<input
						type="text"
						name="street_address"
						value={regPayload.street_address}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								street_address: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="unit">
					Unit:
					<input
						type="text"
						name="unit"
						value={regPayload.unit}
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								unit: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="city">
					City:
					<input
						type="text"
						name="city"
						value={regPayload.city}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								city: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="state">
					State:
					<input
						type="text"
						name="state"
						value={regPayload.state}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								state: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="zip">
					Zip:
					<input
						type="text"
						name="zip"
						value={regPayload.zip}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								zip: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="allergies">
					Allergies:
					<input
						type="text"
						name="allergies"
						value={regPayload.allergies}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								allergies: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<label htmlFor="accommodations">
					Accommodations:
					<textarea
						style={{
							resize: "none",
							padding: 8,
							fontFamily: "inherit",
						}}
						rows="5"
						cols="45"
						wrap="hard"
						name="accommodations"
						value={regPayload.accommodations}
						required
						onChange={(event) =>
							setRegPayload({
								...regPayload,
								accommodations: event.target.value,
							})
						}
					/>
				</label>
			</div>

			<div>
				<input
					className="btn"
					type="submit"
					name="submit"
					value="Register"
				/>
			</div>
		</form>
  );
}

export default RegisterForm;
