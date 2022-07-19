//submit event

const form = document.querySelector('.signup-form');
// const username = document.querySelector('#username');
const feedback = document.querySelector('.feedback');
const usernamePattern = /^[a-zA-Z]{6,12}$/;
form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(username.value)
   const username = form.username.value;
   
   if(usernamePattern.test(username)){
    //feedback good info
        return feedback.textContent = 'that username is valid'
   }else {
    //feedback help info
        feedback.textContent = 'username must contain letters only & be between 6 & 12 character long'
   }    
});


const username = 'linhmap'
const pattern = /^[a-z]{6,}$/;

let result = pattern.test(username)
console.log(result);

//live feedback

form.username.addEventListener('keyup', e => {
    console.log(e)
    //console.log(e.target.value, form.username.value)
    if(usernamePattern.test(e.target.value)){
        form.username.setAttribute('class','sucess');
    }else{
        form.username.setAttribute('class','error');
    }
})