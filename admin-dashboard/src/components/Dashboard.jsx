import { useState } from "react";
import BlogSummary from "./BlogSummary";
import SummaryDisplay from "./SummaryDisplay";
import BlogDetail from "./BlogDetail";
import NewPost from "./NewPost";

export default function Dashboard({
    token,
    deauthHandler // call if we get a server error at any point
}) {
    const serverPrefix = 'http://localhost:3000/';

    const [displaySummaries, setDisplaySummaries] = useState(true);
    const [newPost, setNewPost] = useState(false);
    const [blogDetailId, setBlogDetailId] = useState(0);

    function resetApp() {
        setDisplaySummaries(true);
        setNewPost(false);
        setBlogDetailId(0);
        deauthHandler();
    }

    if (displaySummaries) {
        return (
            <div>
                <SummaryDisplay
                    serverPrefix={serverPrefix}
                    token={token}
                    deauthHandler={resetApp}
                    summarySetter={setDisplaySummaries}
                    detailIdSetter={setBlogDetailId}
                />
                <button onClick={() => {setDisplaySummaries(false); setNewPost(true)}}>New Post</button>
            </div>
        ); 
    } else if (newPost) {
        return (
            <NewPost 
                serverPrefix={serverPrefix}
                token={token}
                deauthHandler={resetApp}
                summarySetter={setDisplaySummaries}
                newPostSetter={setNewPost}
            />
        )
    }
    else {
        return (
            <BlogDetail 
                serverPrefix={serverPrefix}
                token={token}
                deauthHandler={resetApp}
                summarySetter={setDisplaySummaries}
                detailIdSetter={setBlogDetailId}
                blogId={blogDetailId}
            />
        )
        
    }
}