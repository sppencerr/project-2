// Submit comment form
const commentFormSubmit = async ( event ) => {
	event.preventDefault();

	const content = document.querySelector( '#comment-post' ).value.trim();
	const blogpostId = document.querySelector( '#blogpostId' ).value.trim();

	if ( content ) {
		const response = await fetch( '/api/blogposts/comment', {
			method: 'POST',
			body: JSON.stringify( {
				content,
				blogpostId
			} ),
			headers: { 'Content-Type': 'application/json' },
		} );

		if ( response.ok ) {
			location.reload();
		} else {
			alert( 'Please add text to comment before submitting' );
		}
	}
};

// Listen for the comment form submission
document
	.querySelector( '.comment-form' )
	.addEventListener( 'submit', commentFormSubmit );