import React, { useState } from "react";


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        const response = await fetch('http://localhost:3003/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, pass,passConf,name })
          });
            const data = await response.json();
            console.log(data);          
 
       
    }
    
    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form method="POST" className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confrim-password</label>
            <input value={passConf} onChange={(e) => setPassConf(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
