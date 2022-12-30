function getAccountToken(link) {
    return link.split('=')[1]
}
const prodCredaKeyInUrl = getAccountToken(window.location.href);

if(prodCredaKeyInUrl) {
    sessionStorage.setItem('prod-creda-key', prodCredaKeyInUrl);
    window.location.replace('/user');
}

if(!sessionStorage.getItem('prod-creda-key')) {
    window.location.replace('/login');
}

const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.querySelector('.sidebar');
closeSidebar.addEventListener('click', e => {
    sidebar.style.display = 'none';
})
const openSidebar = document.getElementById('open-sidebar');
    openSidebar.addEventListener('click', e => {
        sidebar.style.display = 'unset'; 
})

if(sessionStorage.getItem('prod-creda-key')) {
    fetch('/api/get-username', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: sessionStorage.getItem('prod-creda-key')
        })
    }).then(res => res.json()).then(data => {
        const username = document.getElementById('username');
        const username2 = document.getElementById('username-panel');
    
        if(!data.username) {
            return console.log('Failed!');
        }
    
        username.innerText = data.username;
        username2.innerText = data.username;
    });
}