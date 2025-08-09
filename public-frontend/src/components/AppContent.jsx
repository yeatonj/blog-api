import { useState } from "react"
import AllBlogs from "./AllBlogs";

export default function AppContent({
    token,
    deauthHandler
}) {
    const serverPrefix = 'http://localhost:3000/';

    const [detailView, setDetailView] = useState(false);
    const [detailId, setDetailId] = useState(0);

    let content;

    if (!detailView) {
        content = <AllBlogs 
            serverPrefix={serverPrefix}
            token={token}
            deauthHandler={deauthHandler}
            detailViewSetter={setDetailView}
            detailIdSetter={setDetailId}
        />
    } else {
        content= <p>Viewing the details!</p>
    }

    return (
        <>
            {content}
        </>
    )
}