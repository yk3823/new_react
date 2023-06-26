import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const jsonObject = {
      firstName: firstName,
      lastName: lastName,
      date: formattedDate,
      email: email,
      phone: phone,
    };

    try {
      const response = await axios.post(
        "http://localhost:5020/create",
        jsonObject
      );

      console.log("Response:", response.data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Email already exists in the system");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <p>Date: {date}</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default App;
