import { useState, useEffect } from "react";
import BlogSummary from "./BlogSummary";

export default function SummaryDisplay({
    serverPrefix,
    token,
    deauthHandler,
    summarySetter,
    detailIdSetter
}) {
    const [blogContents, setBlogContents] = useState(null);  
    // Grab the blog data to display
    useEffect(() => {
        const fetchPosts = async () => {
                try {
                const response =  await fetch(serverPrefix + 'blog/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                const data = await response.json();
                setBlogContents(data);
            } catch (err) {
                console.log(err);
                deauthHandler();
            }
        }
        
        fetchPosts();
    }, [deauthHandler, token, serverPrefix]);

    if (blogContents === null) {
        return (
            <>
            <p>Posts currently loading!</p>
            </>
        );
    }

    const posts = blogContents.map(post => 
        <li key={post.id}>
            <BlogSummary 
                id={post.id}
                title={post.title}
                author={post.authorId}
                date={post.createdAt}
                published={String(post.published)}
                summarySetter={summarySetter}
                detailIdSetter={detailIdSetter}
            />
        </li>
    )

    return (
        <>
            <h1>Blog Post Summary</h1>
            <ul>{posts}</ul>
        </>
    );
}