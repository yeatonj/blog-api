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

    // Grab the blog data to display
    useEffect(() => {
        const fetchPosts = async () => {
                try {
                    console.log(serverPrefix + 'blog/' + blogId)
                const response =  await fetch(serverPrefix + 'blog/' + blogId, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                const data = await response.json();
                setPostDetails(data);
                console.log(data);
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
        <>
            <p>This is the detail of a blog!</p>
            <button onClick={setSummary}>Return to Summary</button>
        </>
        
    )
}