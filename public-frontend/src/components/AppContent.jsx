import { useState } from "react"
import AllBlogs from "./AllBlogs";
import BlogDetail from "./BlogDetail";

export default function AppContent({
    token,
    deauthHandler
}) {
    const serverPrefix = 'http://localhost:3000/';

    const [detailView, setDetailView] = useState(false);
    const [detailId, setDetailId] = useState(0);

    let content;

    function resetDetail() {
        setDetailView(false);
    }

    if (!detailView) {
        content = <AllBlogs 
            serverPrefix={serverPrefix}
            token={token}
            deauthHandler={deauthHandler}
            detailViewSetter={setDetailView}
            detailIdSetter={setDetailId}
        />
    } else {
        content = <BlogDetail 
            serverPrefix={serverPrefix}
            token={token}
            deauthHandler={deauthHandler}
            resetHandler={resetDetail}
            blogId={detailId}
        />
    }

    return (
        <>
            {content}
        </>
    )
}