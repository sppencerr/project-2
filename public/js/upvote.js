async function upvoteClickHandler(e) {
    e.preventDefault();

    // get post id from url string
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    // put vote
    const response = await fetch('/api/post/upvote', {
        method: 'PUT',
        body: JSON.stringify({ post_id }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    // if success reload page, else alert user
    if (response.ok) {
        document.location.reload();
    } else {
        alert(`${response.statusText}
    You can only vote on posts once`);
    }
};

document.querySelector('.btn-vote').addEventListener('click', upvoteClickHandler);