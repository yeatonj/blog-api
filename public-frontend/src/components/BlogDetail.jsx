import { useState, useEffect } from "react";
import NewComment from "./NewComment";
import CommentsSection from "./CommentsSection";

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

    if (postDetails === null) {
        return (
            <p>Loading Post...</p>
        )
    }

    let newComment = <p>Please log in in order to post comments!</p>;
    if (token !== null) {
        newComment = <NewComment 
            serverPrefix={serverPrefix}
            token={token}
            deauthHandler={deauthHandler}
            blogId={blogId}
        />
    }


    return (
        <>
            <h1>{postDetails.title}</h1>
            <p>{postDetails.content}</p>
            <button onClick={resetHandler}>Back to Index</button>
            {newComment}
            <CommentsSection 
                comments={postDetails.comments}
            />
        </>
    )
}