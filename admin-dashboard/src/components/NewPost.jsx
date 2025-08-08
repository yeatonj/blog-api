import { useState } from "react";

export default function NewPost({
    serverPrefix,
    token,
    deauthHandler,
    summarySetter,
    newPostSetter
}) {

    function returnToSummary() {
        newPostSetter(false);
        summarySetter(true);
    }

    const [postBody, setPostBody] = useState('');
    const [postTitle, setPostTitle] = useState('');

    async function createPost(event) {
        event.preventDefault();
        const url = serverPrefix + 'blog';
        try {
            const response =  await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postBody,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (err) {
            returnToSummary();
            deauthHandler();
            console.error('Issue with posting. logging out:', err);
        }
        returnToSummary();
    }

    return (
        <>
            <p>This is a place to create a new post! Post will not be published until you edit it in the detail page.</p>
            <form>
                <label>Post Title:</label>
                <input 
                    type="text" 
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <div>
                    <label>Post Text:</label>
                    <textarea
                        cols="100"
                        rows="10"
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={createPost}>Create Post</button>
            </form>
            <button onClick={returnToSummary}>Return without Creating</button>
        </>
    )
}