export default function BlogSummary({
    id,
    title,
    date,
    detailViewSetter,
    detailIdSetter
}) {

    function detailView() {
        detailIdSetter(id);
        detailViewSetter(true);
    }

    return(
        <div className="blog-summary">
            <p>Title: {title}; Date: {date} <button onClick={detailView}>View Post</button></p>
        </div>
    )
}