import { useState } from "react";

export default function LoginForm({
    tokenSetter,
    loggedInSetter,
    loginMessage,
    loginMessageSetter
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
            tokenSetter(data.token);
            loginMessageSetter('');
            // console.log(data);
        } catch (err) {
            // !! Probably want something here to update the fact that we're not actually logged in
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('admin');
            localStorage.removeItem('token');
            loginMessageSetter('Error logging in, please retry.');
            // Set in application also
            loggedInSetter(false);
            tokenSetter(null);
            console.error('Issue with login:', err);
        }
    }

    let message = <></>;
    if (loginMessage !== '') {
        message = <p>{loginMessage}</p>
    }

    return (
        <>
            <h3>Log In</h3>
            {message}
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
        </>
    )
}