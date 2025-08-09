export default function LogoutButton({
    logoutFunction,
}) {
    return (
        <button className="logout" onClick={logoutFunction}>Logout</button>
    )
}