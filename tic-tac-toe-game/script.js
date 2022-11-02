const selectBox = document.querySelector('.select-box'),
selectBtnX = selectBox.querySelector('.playerX'),
selectBtnO = selectBox.querySelector('.playerO'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players'),
resultBox = document.querySelector('.result-box'),
wonText = resultBox.querySelector('.won-text'),
replayBtn = resultBox.querySelector('.btn');


window.onload = () => {
    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute('onclick', 'clickedBox(this)')

    }


    selectBtnX.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }

    selectBtnO.onclick = ()=>{ 
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }   

}


let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;


//user click fn
function clickedBox(element){
    
    if(players.classList.contains("player")){
        playerSign = 'O'
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add('active');
        //if player select O then change the playerSign value to O
        element.setAttribute('id', playerSign)
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add('active')
        element.setAttribute('id', playerSign)
    }
    selectWinner();
    players.style.pointerEvents = 'none';
    element.style.pointerEvents = 'none'; //once user select any box then that box cant be selected again
    let randomDelayTime = ((Math.random()*1000) + 200).toFixed() // chọn random delay time như kiểu bot cũng cần suy nghĩ
    setTimeout(() => {
        bot(runBot)
    }, randomDelayTime);
}

//bot click fn

function bot(runBot) {
    if(runBot){
        //first change the playerSign, if user has X, bot will be O
    playerSign = 'O';
    let array = [];
    for(let i = 0; i < allBox.length; i++){
        if(allBox[i].childElementCount == 0){//if span has no any child element
            array.push(i)
        }
    }
    let randomBox = array[Math.floor(Math.random()*array.length)]//get random index so box select random
    if(array.length > 0){
        if(players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            players.classList.add('active');
            //if user is O then the box id is X
            playerSign = 'X';
            allBox[randomBox].setAttribute('id', playerSign);

        }else{
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove('active')
            allBox[randomBox].setAttribute('id', playerSign);
        }
    }
    
    allBox[randomBox].style.pointerEvents = 'none';
    players.style.pointerEvents = 'auto';
    playerSign = 'X';
    }
}

//select the winner

function getId(idname) {//return id name
    return document.querySelector('.box' + idname).id;
}

function checkId(val1, val2, val3, sign) {
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign ){
        return true;
    }
}

function selectWinner() {
    if(checkId(1,2,3,playerSign) || checkId(4,5,6,playerSign) || checkId(7,8,9,playerSign) || checkId(1,4,7,playerSign) ||checkId(2,5,8,playerSign) || checkId(3,6,9,playerSign) || checkId(1,5,9,playerSign) || checkId(3,5,7,playerSign)) {
        
        runBot =false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove('show');
            resultBox.classList.add('show')
        }, 700);

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
    } else {
        if(getId(1) != '' && getId(2) != '' &&  getId(3) != '' &&  getId(4) != '' &&  getId(5) != '' &&  getId(6) != '' &&  getId(7) != '' &&  getId(8) != '' &&  getId(9) != ''){
            runBot =false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove('show');
            resultBox.classList.add('show')
        }, 700);

        wonText.textContent = `Match has been drawn`
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload()
}