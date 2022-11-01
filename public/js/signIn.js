// Submit login form to validate account exists and login
const loginFormSubmit = async ( event ) => {
	event.preventDefault();

	const username = document.querySelector( '#username-signup' ).value.trim();
	const password = document.querySelector( '#password-signup' ).value.trim();

	if ( username && password ) {
		const response = await fetch( '/api/users/login', {
			method: 'POST',
			body: JSON.stringify( {
				username,
				password
			} ),
			headers: { 'Content-Type': 'application/json' },
		} );

		if ( response.ok ) {
			document.location.replace( '/dashboard' );
		} else {
			alert( 'Incorrect login' );
		}
	}
};

// Listen for the login form submission
document
	.querySelector( '.login-form' )
	.addEventListener( 'submit', loginFormSubmit );