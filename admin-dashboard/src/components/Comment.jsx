export default function Comment({
    commentData,
    serverPrefix,
    token,
    deauthHandler,
    commentsFlipped,
    commentsFlippedSetter,
}) {

    function unpublish() {
        const url = serverPrefix + 'blog/comment/' + String(commentData.id);
        const attemptUnpublish = async () => {
            try {
                const response =  await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: commentData.content,
                        published: false
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                commentsFlippedSetter(commentsFlipped + 1);
            } catch (err) {
                deauthHandler();
                console.error('Issue with posting. logging out:', err);
            }
        }
        attemptUnpublish();
    }

    function publish() {
        const url = serverPrefix + 'blog/comment/' + String(commentData.id);
        const attemptUnpublish = async () => {
            try {
                const response =  await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: commentData.content,
                        published: true
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                commentsFlippedSetter(commentsFlipped + 1);
            } catch (err) {
                deauthHandler();
                console.error('Issue with posting. logging out:', err);
            }
        }
        attemptUnpublish();
    }


    if (commentData.published) {
        return (
            <div>
                <p>Comment: {commentData.content}; Published: {String(commentData.published)} <button onClick={unpublish}>Unpublish</button></p>
            </div>
        )
    } else {
        return (
            <div>
                <p>Comment: {commentData.content}; Published: {String(commentData.published)} <button onClick={publish}>Publish</button></p>
            </div>
        )
    }
    
}