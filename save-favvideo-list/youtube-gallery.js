const videosContainer = document.querySelector('#videosContainer');
const videoIdInput = document.querySelector('#videoId');
const popup = document.querySelector('#popup');
const video = document.querySelector('#popup > iframe');

let  youTubeVideoIds = [];
const IDs_KEY = 'youTubeVideoIds';


const loadVideos = () => {
    youTubeVideoIds = JSON.parse(localStorage.getItem(IDs_KEY)) || [];
    
}

const displayVideo = () =>{
    const videoHTMLStrings = youTubeVideoIds.map(id => `
        <li onclick="clickVideo(event, '${id}')">
            <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for youtube video with id ${id}">
            <button class="delete-btn"> &times;</button>
        </li>
    `
    ).join("");
    videosContainer.innerHTML=videoHTMLStrings;
    
};

const clickVideo = (event, id) => {
    console.log(event,id)
    if(event.target.classList.contains('delete-btn')){
        youTubeVideoIds = youTubeVideoIds.filter(i => i != id)
        localStorage.setItem(IDs_KEY, JSON.stringify(youTubeVideoIds));
        displayVideo()
        
    }else{
        //show the video
        video.src =  `https://www.youtube.com/embed/${id}`;
        popup.classList.add('open');
        popup.classList.remove('closed')
    }
}

const saveVideo = e => {
    e.preventDefault();
    const videoId = videoIdInput.value;
    youTubeVideoIds.unshift(videoId);
    videoId.value = '';
    localStorage.setItem(IDs_KEY,JSON.stringify(youTubeVideoIds));
    displayVideo()
}

const handlePopupClick = () => {
    popup.classList.add('closed');
    popup.classList.remove('open')
}
loadVideos();
displayVideo();