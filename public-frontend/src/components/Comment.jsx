export default function Comment({
    details
}) {

    console.log(details)

    return (
        <div>
            <p>Author: {details.userId}; Date: {details.createdAt}</p>
            <p>{details.content}</p>
        </div>
    )
}