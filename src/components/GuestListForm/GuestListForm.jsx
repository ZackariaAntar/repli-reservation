import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//////////////////Guest List Form Component/////////////////////

function GuestListForm() {

    // hooks for form inputs and dispatch and history for navigation and dispatch to redux store
    // may need to update the naming convention for the hooks depending on how we want to handle the data
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [unit, setUnit] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    

    return (
        <>
            <h2>Guest List Form</h2>
            {/* The h2 above can be deleted once we have a page header established */}
            <form>
                <h3>Personal Information</h3>
                <input 
                    value={first} 
                    id="first" 
                    placeholder="First Name" 
                />
                
                <br />

                <input 
                    value={last} 
                    id="last" 
                    placeholder="Last Name" 
                />

                <br />

                <h3>Contact Information</h3>
                <input 
                    value={email} 
                    id="email" 
                    placeholder="E-mail" 
                />

                <br />

                <input 
                    value={phone}
                    id="phone"
                    placeholder="Phone Number" 
                />

                <br />

                <input 
                    value={street}
                    id="street"
                    placeholder="Street Address" 
                />

                <br />

                <input 
                    value={unit}
                    id="unit"
                    placeholder="Unit/Apt #" 
                />

                <br />

                <input 
                    value={city}
                    id="city"
                    placeholder="City" 
                />

                <br />

                <select 
                    value={state}
                    id="state"
                >
                    <option value="" disable selected hidden>Select a State</option>
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
                    value={zip}
                    id="zip"
                    placeholder="Zip" 
                />

                <br />
                
                <h3>Other Information</h3>
                

                <button>Save and Add Another</button>
                <button>Save and View Guest List</button>
                <button>Save and Exit</button>
            </form>
        </>
    );
};

export default GuestListForm;