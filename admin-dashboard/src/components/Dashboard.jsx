import { useState } from "react";
import BlogSummary from "./BlogSummary";
import SummaryDisplay from "./SummaryDisplay";
import BlogDetail from "./BlogDetail";

export default function Dashboard({
    token,
    deauthHandler // call if we get a server error at any point
}) {
    const serverPrefix = 'http://localhost:3000/';

    const [displaySummaries, setDisplaySummaries] = useState(true);
    const [blogDetailId, setBlogDetailId] = useState(0);

    if (displaySummaries) {
        return (
            <SummaryDisplay 
                serverPrefix={serverPrefix}
                token={token}
                deauthHandler={deauthHandler}
                summarySetter={setDisplaySummaries}
                detailIdSetter={setBlogDetailId}
            />
        ); 
    }
    else {
        return (
            <BlogDetail 
                serverPrefix={serverPrefix}
                token={token}
                deauthHandler={deauthHandler}
                summarySetter={setDisplaySummaries}
                detailIdSetter={setBlogDetailId}
                blogId={blogDetailId}
            />
        )
        
    }
}