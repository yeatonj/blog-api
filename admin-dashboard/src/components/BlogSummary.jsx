export default function BlogSummary({
    id,
    title,
    author,
    date,
    published,
    summarySetter,
    detailIdSetter
}) {

    function detailView() {
        detailIdSetter(id);
        summarySetter(false);
    }

    return(
        <div className="blog-summary">
            <p>Title: {title}; Author: {author}; Date: {date}; Published: {published} <button onClick={detailView}>Edit</button></p>
        </div>
    )
}