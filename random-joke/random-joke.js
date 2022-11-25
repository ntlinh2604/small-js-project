
const de = document.getElementById('de');
const en = document.getElementById('en');
const jokeLine1 = document.getElementById('joke-line1');
const jokeLine2 = document.getElementById('joke-line2');

const btn = document.getElementById('btn');

const URL1 = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist';
const URL2 = 'https://v2.jokeapi.dev/joke/Any?lang=de&blacklistFlags=racist'





let getJoke = (url) =>{
    jokeLine1.classList.remove('fade');

    fetch(url)
    .then(data => data.json())
    .then(item => {
        
        jokeLine1.innerHTML = `
        ${item.setup}
        
        `;
        jokeLine2.innerHTML = `
        ${item.delivery}
        
        `;
        jokeLine1.classList.add('fade');
        jokeLine2.style.display='none';

    })
   
    
}
window.onload = () =>{
    getJoke(URL1);
    en.style.textDecoration='underline';
    setTimeout(() =>{
        jokeLine2.style.display='block';
        jokeLine2.classList.add('fade');
    
    },2000)
    
    btn.addEventListener('click',() =>{
        jokeLine2.style.display='none';
        getJoke(URL1)
        setTimeout(() =>{
            jokeLine2.classList.add('fade');
            jokeLine2.style.display='block';
        },2000)
    })
}



de.addEventListener('click',() =>{
    btn.textContent='ufälligen Witz bekommen';
    en.style.textDecoration='none';

    de.style.textDecoration='underline'
    getJoke(URL2)
    setTimeout(() =>{
        jokeLine2.style.display='block';
        jokeLine2.classList.add('fade');
    
    },2000)
    btn.addEventListener('click',() =>{
        jokeLine2.style.display='none';
        getJoke(URL2)
        setTimeout(() =>{
            jokeLine2.classList.add('fade');
            jokeLine2.style.display='block';
        },2000)
    })
    
})

en.addEventListener('click',() =>{
    
    de.style.textDecoration='none';

    en.style.textDecoration='underline'
    getJoke(URL1)
    setTimeout(() =>{
        jokeLine2.classList.add('fade');

        jokeLine2.style.display='block';
    
    },2000)
    btn.addEventListener('click',() =>{
        jokeLine2.style.display='none';
        getJoke(URL1)
        setTimeout(() =>{
            jokeLine2.classList.add('fade');
            jokeLine2.style.display='block';
        },2000)
    })
    
})

    