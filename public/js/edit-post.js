async function editPostFormHandler(e) {
    e.preventDefault();
    const formEl = e.target;

    // get post info from form and id from url string
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const post_title = formEl.querySelector('#edit-title').value.trim();
    const post_body = formEl.querySelector('#edit-body').value.trim();

    if (post_title && post_body) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post_title,
                post_body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(`${response.statusText}
            Something went wrong...`);
        }
    }
};

async function deletePostHandler(e) {
    e.preventDefault();
    const formEl = document.querySelector('.edit-post-form');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const confirmDelete = confirm('Are you sure you want to delete this post? This action cannot be reversed.');

    if (confirmDelete) {
        // await delete and respond with dashboard
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // alert to success and send to dashboard or alert error
        if (response.ok) {
            formEl.innerHTML = `
        <div class="form-title lead pb-1 mb-2 d-flex flex-row justify-content-between align-items-center">
            post deleted
        </div>`;
            setTimeout(() => {
                document.location.replace('/dashboard');
            }, 2000);
        } else {
            alert(`${response.statusText}
            Something went wrong...`);
        }
    } else {
        return;
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);
document.querySelector('.btn-delete').addEventListener('click', deletePostHandler);