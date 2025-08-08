import { useState } from "react";

export default function LoginForm() {
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
            console.log(response)
            const data = await response.json();
            console.log(data);
            alert(data);
        } catch (err) {
            // !! Probably want something here to update the fact that we're not actually logged in
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