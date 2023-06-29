"use strict";

/* Dependency: js-cookie plugin - Ref: https://github.com/js-cookie/js-cookie */

const modeToggler = document.getElementById('darkmode');
const documentBody = document.getElementsByTagName('body')[0];


function setThemeFromCookie() {
	// Check if the cookie is set 
	if (typeof Cookies.get('mode') !== "undefined" ) {
		documentBody.classList.add('dark-mode');
		modeToggler.checked = true; // toggle change
		
		console.log('Cookie: dark mode' );
		
	} else {
		documentBody.classList.remove('dark-mode');
		modeToggler.checked = false; // toggle change
		
		console.log('Cookie: light mode' );
	}
}


setThemeFromCookie();


modeToggler.addEventListener('change', () => {
	
	console.log(modeToggler.checked);
	
    if (modeToggler.checked) {
		documentBody.classList.add('dark-mode');
		//Set cookies for 7 days 
		Cookies.set('mode', 'dark-mode', { expires: 7 });
		
		console.log ('change to dark mode');
		
	} else {
		documentBody.classList.remove('dark-mode');
		//Remove cookies
		Cookies.remove('mode');
		
		console.log ('change to light mode');
	}
});