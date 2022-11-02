//this for dom manipulate js

const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const createForm = document.querySelector('#create-form')
const accountDetails = document.querySelector('.account-details')

//add guide to guidelist
createForm.addEventListener('submit', e =>{
    e.preventDefault();
    //c2 ko can tao class
    db.collection('guides').add({
        title : createForm['title'].value,
        content : createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create')
        M.Modal.getInstance(modal).close();    
        createForm.reset()})
    .catch(err => {console.log(err.message)});

    //c1
    // const title = createForm.title.value.trim()
    // const content = createForm.content.value.trim() //name and id can use dot notation (message is id of newChatform in html file)

    // gameGuide.addGuide(title, content)
    //     .then(() => {
    //         const modal = document.querySelector('#modal-create')
    //         M.Modal.getInstance(modal).close();    
    //         createForm.reset()})
    //     .catch(err => {console.log(err.message)});
})

const setupUI = (user) => {
    if(user){
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>

        `;
        accountDetails.innerHTML = html;

        })
        
        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
        accountDetails.innerHTML = ''
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
}

//setup guides
const setupGuides = (data) =>{
    if(data.length){
        let html = '';
        data.forEach(doc => {
            const guide = doc.data() // data() is fn in data
            const li = `
                    <li>
                        <div class="collapsible-header grey lighten-4">${guide.title}</div>
                        <div class="collapsible-body white">${guide.content}</div>
                    </li>
                `
            html += li
    });
        guideList.innerHTML = html
    } else {
        
       
    }

    
}



//setup materialize components

document.addEventListener('DOMContentLoaded', function () {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals); //https://materializecss.com/modals.html

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items)
})

// c1 : const gameGuide = new Gameguidez()
// gameGuide.getGuide((data) => {//from datas get from the callback, do something with it
    
//     setupGuides(data)
// })