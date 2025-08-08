export default function LogoutButton({
    tokenSetter,
    loggedInSetter,
    isAdminSetter,
}) {
    function handleClick() {
        tokenSetter(null);
        loggedInSetter(false);
        isAdminSetter(false);
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
    }
    return (
        <button onClick={handleClick}>Logout</button>
    )
}