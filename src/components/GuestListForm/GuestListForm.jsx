import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//////////////////Guest List Form Component/////////////////////

function GuestListForm() {
    const activeWedding = useSelector((store) => store.activeWeddingDetails);

    // hooks for form inputs and dispatch and history for navigation and dispatch to redux store
    // may need to update the naming convention for the hooks depending on how we want to handle the data
    const guestData = {
		first_name: "",
		last_name: "",
		username: "",
		password: "",
		phone_number: "",
		street_address: "",
		unit: "",
		city: "",
		state: "",
		zip: "",
		relationship: "",
		wedding_id: activeWedding.id,
		spouse_association: "",
		can_plus_one: null,
	};
    const [guestInfo, setGuestInfo] = useState(guestData);
    const [switchName, setSwitchName] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();

    const addToList = (e) => {
        e.preventDefault();
        dispatch({
			type: "ADD_GUEST_TO_LIST",
			payload: guestInfo,
		});
        setGuestInfo(guestData)
    };


    return (
		<>
			<h2>Guest List Form</h2>
			{/* The h2 above can be deleted once we have a page header established */}
			<form onSubmit={addToList}>
				<h3>Personal Information</h3>
				<input
					value={guestInfo.first_name}
					id="first_name"
					placeholder="First Name *"
					required
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							first_name: e.target.value,
						})
					}
					onBlur={() => setSwitchName(guestInfo.first_name)}
				/>

				<br />

				<input
					value={guestInfo.last_name}
					id="last_name"
					placeholder="Last Name *"
					required
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							last_name: e.target.value,
						})
					}
				/>

				<br />

				<h3>Contact Information</h3>
				<input
					value={guestInfo.username}
					id="username"
					placeholder="E-mail (used as login)*"
					required
					onChange={(e) =>
						setGuestInfo({ ...guestInfo, username: e.target.value })
					}
				/>

				<br />

				<input
					value={guestInfo.phone_number}
					id="phone_number"
					placeholder="Phone Number"
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							phone_number: e.target.value,
						})
					}
				/>

				<br />

				<input
					value={guestInfo.street_address}
					id="street_address"
					placeholder="Street Address"
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							street_address: e.target.value,
						})
					}
				/>

				<br />

				<input
					value={guestInfo.unit}
					id="unit"
					placeholder="Unit/Apt #"
					onChange={(e) =>
						setGuestInfo({ ...guestInfo, unit: e.target.value })
					}
				/>

				<br />

				<input
					value={guestInfo.city}
					id="city"
					placeholder="City"
					onChange={(e) =>
						setGuestInfo({ ...guestInfo, city: e.target.value })
					}
				/>

				<br />

				<select
					value={guestInfo.state}
					id="state"
					onChange={(e) =>
						setGuestInfo({ ...guestInfo, state: e.target.value })
					}
				>
					<option value="" disable selected hidden>
						Select a State
					</option>
					<option value="AL">Alabama</option>
					<option value="AK">Alaska</option>
					<option value="AZ">Arizona</option>
					<option value="AR">Arkansas</option>
					<option value="CA">California</option>
					<option value="CO">Colorado</option>
					<option value="CT">Connecticut</option>
					<option value="DE">Delaware</option>
					<option value="DC">District Of Columbia</option>
					<option value="FL">Florida</option>
					<option value="GA">Georgia</option>
					<option value="HI">Hawaii</option>
					<option value="ID">Idaho</option>
					<option value="IL">Illinois</option>
					<option value="IN">Indiana</option>
					<option value="IA">Iowa</option>
					<option value="KS">Kansas</option>
					<option value="KY">Kentucky</option>
					<option value="LA">Louisiana</option>
					<option value="ME">Maine</option>
					<option value="MD">Maryland</option>
					<option value="MA">Massachusetts</option>
					<option value="MI">Michigan</option>
					<option value="MN">Minnesota</option>
					<option value="MS">Mississippi</option>
					<option value="MO">Missouri</option>
					<option value="MT">Montana</option>
					<option value="NE">Nebraska</option>
					<option value="NV">Nevada</option>
					<option value="NH">New Hampshire</option>
					<option value="NJ">New Jersey</option>
					<option value="NM">New Mexico</option>
					<option value="NY">New York</option>
					<option value="NC">North Carolina</option>
					<option value="ND">North Dakota</option>
					<option value="OH">Ohio</option>
					<option value="OK">Oklahoma</option>
					<option value="OR">Oregon</option>
					<option value="PA">Pennsylvania</option>
					<option value="RI">Rhode Island</option>
					<option value="SC">South Carolina</option>
					<option value="SD">South Dakota</option>
					<option value="TN">Tennessee</option>
					<option value="TX">Texas</option>
					<option value="UT">Utah</option>
					<option value="VT">Vermont</option>
					<option value="VA">Virginia</option>
					<option value="WA">Washington</option>
					<option value="WV">West Virginia</option>
					<option value="WI">Wisconsin</option>
					<option value="WY">Wyoming</option>
				</select>

				<input
					value={guestInfo.zip}
					id="zip"
					placeholder="Zip"
					onChange={(e) =>
						setGuestInfo({ ...guestInfo, zip: e.target.value })
					}
				/>

				<br />
				<div>
					<p>Does this guest get a plus one?</p>

					<label for="can_plus_one">
						Yes
						<input
							type="radio"
							value={guestInfo.can_plus_one}
							id="can_plus_one"
							name="can_plus_one"
							checked={guestInfo.can_plus_one === true}
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									can_plus_one: true,
								})
							}
						/>
					</label>

					<label for="cannot_plus_one">
						{" "}
						No{" "}
						<input
							type="radio"
							value={guestInfo.can_plus_one}
							id="cannot_plus_one"
							name="cannot_plus_one"
							checked={guestInfo.can_plus_one === false}
							onChange={(e) =>
								setGuestInfo({
									...guestInfo,
									can_plus_one: false,
								})
							}
						/>
					</label>
				</div>

				<h3>Other Information</h3>
				{/* Figure out nice looking UX/UI conditional rendering for inline drop downs to avoid parsing pre dispatch to accomodate DB and query logic*/}
				<select
					value={guestInfo.spouse_association}
					id="spouse_association"
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							spouse_association: e.target.value,
						})
					}
				>
					{switchName ? (
						<option value="" disable selected hidden>
							Who is {switchName} is associated with...
						</option>
					) : (
						<option value="" disable selected hidden>
							Who is this guest is associated with...
						</option>
					)}
					<option value={"Replace with redux state for spouse 1"}>
						Guest of (spouse 1)
					</option>
					<option value={"Replace with redux state for spouse 2"}>
						Guest of (spouse 2)
					</option>
				</select>

				<select
					value={guestInfo.relationship}
					id="relationship"
					onChange={(e) =>
						setGuestInfo({
							...guestInfo,
							relationship: e.target.value,
						})
					}
				>
					<option value="" disable selected hidden>
						Relationship to {guestInfo.spouse_association}...
					</option>
					<option value={"family"}>
						{guestInfo.spouse_association}'s Family
					</option>
					<option value="friend">
						{guestInfo.spouse_association}'s Friend
					</option>
					<option value="fam friend">
						{guestInfo.spouse_association}'s Family Friend
					</option>
					<option value="wedding party">
						{guestInfo.spouse_association}'s Wedding Party
					</option>
				</select>

				<br />

				<button>Save and Add Another</button>
				<button>Save and View Guest List</button>
				<button>Save and Exit</button>
			</form>
		</>
	);
};

export default GuestListForm;