export default function Comment({
    details
}) {


    return (
        <div>
            <p>Author: {details.id}; Date: {details.createdAt}</p>
            <p>{details.content}</p>
        </div>
    )
}