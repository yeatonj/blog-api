import { useState, useEffect } from "react";

export default function BlogDetail({
    serverPrefix,
    token,
    deauthHandler,
    summarySetter,
    detailIdSetter,
    blogId
}) {
    function setSummary() {
        detailIdSetter(0);
        summarySetter(true);
    }

    const [postDetails, setPostDetails] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postTitle, setPostTitle] = useState(null);
    const [isPublished, setIsPublished] = useState(null);

    async function updatePost(event) {
        event.preventDefault();
        const url = serverPrefix + 'blog/' + String(blogId);
        try {
            const response =  await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postBody,
                    published: isPublished
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (err) {
           deauthHandler();
            console.error('Issue with posting. logging out:', err);
        }
    }

    // Grab the blog data to display
    useEffect(() => {
        const fetchPosts = async () => {
                try {
                const response =  await fetch(serverPrefix + 'blog/protected/' + blogId, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                const data = await response.json();
                setPostDetails(data);
                setPostBody(data.content);
                setPostTitle(data.title);
                setIsPublished(data.published)
            } catch (err) {
                console.log(err);
                deauthHandler();
            }
        }

        
        fetchPosts();
    }, [deauthHandler, token, serverPrefix, blogId]);

    if (postDetails === null) {
        return (
            <p>Waiting for post to load...</p>
        )
    }

    return (
        <div>
            <p>This is the detail of a blog!</p>
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
                <div>
                    <label>Publish:</label>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                    />
                </div>
                <button onClick={updatePost}>Update Post</button>
            </form>
            <button onClick={setSummary}>Return to Summary</button>
        </div>
        
    )
}