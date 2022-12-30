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

const notesContainer = document.querySelector('.notes-container')
function addNote(title, link) {

    notesContainer.innerHTML += `
    
    <div class="notes">
            <span class="notes-title">${title}</span>
            <a class="notes-icon-container" href="${link}"><img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Downloads-icon.png" class="notes-icon"></a>
    </div>
    
    `
}

if(sessionStorage.getItem('prod-creda-key')) {
    fetch('/api/get-notes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: sessionStorage.getItem('prod-creda-key')
        })
    }).then(res => res.json()).then(data => {
        const notesArr = data.notesArr;

        if(!notesArr) {
            alert('There was an error finding "notes", try again later!');
            window.location.replace('/user');
        }   

        notesArr.forEach(note => {
            addNote(note.title, note.link);
        })
    });
}