import { useState } from "react";

export default function NewComment({
    serverPrefix,
    token,
    deauthHandler,
    blogId,
    commentsMade,
    commentsMadeSetter,
}) {

    const [comment, setComment] = useState('');

    async function submitComment(event) {
        event.preventDefault();
        try {
            const response =  await fetch(serverPrefix + 'blog/' + String(blogId) + '/comment', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: comment
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            commentsMadeSetter(commentsMade + 1);
            setComment('');
            console.log(data)
        } catch (err) {
            // !! Probably want something here to update the fact that we're not actually logged in
            deauthHandler();
            console.error('Issue with login:', err);
        }
    }


    return (
        <div>
            <h3>Submit Comment</h3>
            <form>
                <textarea
                        cols="50"
                        rows="10"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button onClick={submitComment}>Post Comment</button>
            </form>
        </div>
    )
}