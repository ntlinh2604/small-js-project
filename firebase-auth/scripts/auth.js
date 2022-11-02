//authenticaton

//get data
// db.collection('guides').get().then(snapshot => {
//     setupGuides(snapshot.docs)
// })
//addGuide
//cach dung class get guide
// class Gameguidez {
//     constructor(){
//         this.guides = db.collection('guides');

//     }

//     async addGuide(title, content){
//         const newGuide = {
//             title : title,
//             content : content,
            
//         }
//         //save the guide
//         const response = await this.guides.add(newGuide);
//         return response;
//     }

//     getGuide(callback){
//         this.guides
//             .onSnapshot(snapshot => {
//             snapshot.docChanges().forEach(change => {
//                 console.log(change.doc.data())
//                 if(change.type === 'added'){
//                     callback(change.doc.data())//get all data added
//                 }
//             })
//         })
//     }

// }



//listen for auth status changes
auth.onAuthStateChanged(user => {
    setupUI(user)
    if (user){ //when user log in we show data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs)
        }), function(err) {
            console.log(err.message)
        };
        
    } else {
        setupGuides([])//length is null
        guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>'
    }
})

//sign up

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({ //create new collection with id same as id of email sign up (if we use add() will be auto id)
            bio: signupForm['signup-bio'].value
        });
        
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset()
    });

});

//sign-out, logging out

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) =>{
    e.preventDefault();
    auth.signOut()

})

//login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    auth.signInWithEmailAndPassword(email, password).then((cred) =>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset()
    })
})