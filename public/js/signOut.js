// Handle logging out the user
const logout = async () => {
	const response = await fetch( '/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	} );

	if ( response.ok ) {
		document.location.replace( '/' );
	} else {
		alert( response.statusText );
	}
};

// Listen for the logout click
document.querySelector( '#logout' ).addEventListener( 'click', logout );