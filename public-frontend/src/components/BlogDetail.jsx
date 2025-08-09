import { useState, useEffect } from "react";

export default function BlogDetail({
    serverPrefix,
    token,
    deauthHandler,
    resetHandler,
    blogId
}) {
    const [postDetails, setPostDetails] = useState(null);
    
    // Grab the blog data to display
    useEffect(() => {
        let active = true;
        const fetchPosts = async () => {
            try {
                const response =  await fetch(serverPrefix + 'blog/' + blogId, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                const data = await response.json();
                if (active) {
                    setPostDetails(data);
                }
            } catch (err) {
                console.log(err);
                deauthHandler();
            }
        }

        
        fetchPosts();

        return () => {
            active = false;
        }

    }, [deauthHandler, token, serverPrefix, blogId]);

    console.log(postDetails);


    return (
        <>
            <p>This will be the details of a specific blog post.</p>
            <button onClick={resetHandler}>Back to Summary</button>
        </>
    )
}