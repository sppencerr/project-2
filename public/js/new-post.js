async function newPostFormHandler(e) {
    e.preventDefault();

    const post_title = document.querySelector('#post-title').value.trim();
    const post_body = document.querySelector('#post-body').value.trim();
    
    if (post_title && post_body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                post_title,
                post_body
            }),
            headers: {
                'Content-Type':'application/json'
            }
        });

        console.log(response);
        if (response.ok) {
            document.location.replace('/dashboard');
        }
    } else {
        alert('Both fields are required.');
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);