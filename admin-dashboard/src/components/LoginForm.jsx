import { useState } from "react";

export default function LoginForm({
    tokenSetter,
    loggedInSetter,
    isAdminSetter
}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function login(event) {
        event.preventDefault();
        try {
            const response =  await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Set localstorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('admin', String(data.admin));
            localStorage.setItem('token', data.token);
            // Set in application also
            loggedInSetter(true);
            isAdminSetter(data.admin);
            tokenSetter(data.token);
            // console.log(data);
        } catch (err) {
            // !! Probably want something here to update the fact that we're not actually logged in
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('admin');
            localStorage.removeItem('token');
            // Set in application also
            loggedInSetter(false);
            isAdminSetter(false);
            tokenSetter(null);
            console.error('Issue with login:', err);
        }
    }

    return (
        <form onSubmit={login}>
            <label>Username</label>
            <input 
                placeholder="username@example.com" 
                type="email" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <button type="submit">Log In</button>
        </form>
    )
}