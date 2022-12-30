const sessionToken = localStorage.getItem('_prod_session');

if(sessionToken) {
    window.location.replace(`/home?sessionToken=${sessionToken}`);
}