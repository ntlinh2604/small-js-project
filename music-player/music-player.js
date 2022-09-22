const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'ICEBEAR';

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig :function (key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    songs: [
        {
            name: '505',
            singer: 'Arctic Monkeys',
            path : 'songs/song1-505-arcticmonkeys.mp3',
            image: 'images/song1.jfif'
        },
        {
            name: 'One Summer Day-Spirite Away OST',
            singer: 'Joe Hisaishi',
            path : 'songs/song2-OneSummersDaySpiritedAwayOST.mp3',
            image: 'images/song2.jfif'
        },
        {
            name: 'Knights Of Cydonia',
            singer: 'Muse',
            path : 'songs/song3-Muse - Knights Of Cydonia.mp3',
            image: 'images/song3.jfif'
        },
        {
            name: 'Fluorescent Adolescent',
            singer: 'Arctic Monkeys',
            path : 'songs/song4-FlourescentAdolescent-ArcticMonkeys.mp3',
            image: 'images/song4.jfif'
        },
        {
            name: 'Time After Time',
            singer: 'Cyndi Lauper',
            path : 'songs/song5- timeaftertime.mp3',
            image: 'images/song5.jfif'
        },
        {
            name: 'Nhìn lại ký ức',
            singer: 'Lân Nhã',
            path : 'songs/song6-nhinlaikyuc-lannha.mp3',
            image: 'images/song6.jfif'
        },
        {
            name: 'Unstopable',
            singer: 'Sia',
            path : 'songs/song7-Unstoppable-Sia.mp3',
            image: 'images/song7.jfif'
        },
        {
            name: 'City With An Ocean View - Kiki Delivery Service OST',
            singer: 'Joe Hisaishi',
            path : 'songs/song8-CityWithAnOceanView.mp3',
            image: 'images/song8.jfif'
        },
        {
            name: 'Humble',
            singer: 'Kendrick Lamar',
            path : 'songs/song9-Humble-KendrickLamar.mp3',
            image: 'images/song9.jfif'
        },
        {
            name: 'Easy on me (Cover by Leo)',
            singer: 'Leo Moracchioli',
            path : 'songs/song10-easyonme-leomoracchioli.mp3',
            image: 'images/song10.jfif'
        },
    ],

    
    render : function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}" >
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        });
    },
    handleEvents : function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        //handel when Cd spin
        const cdThumbAnimate = cdThumb.animate([
            {transform : 'rotate(360deg)'}
        ],{
            duration : 10000,//10seconds
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        // handle zoom in zoom out photo when scroll up and down
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            
           cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
           cd.style.opacity = newCdWidth/cdWidth;
        }

        //handle when users click play btn
        playBtn.onclick = function () {
            if(_this.isPlaying){
                //_this.isPlaying = false;
                audio.pause();
                //player.classList.remove('playing')
            }else {
                //_this.isPlaying = true;
                audio.play();
                //player.classList.add('playing')
            }
            
        }
        //when song play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play() // cd spin
        }
        
        //when songs pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause() //cd pause
        }

        //when progress is changing
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent
            }
        }

        //when rewind 
        progress.onchange = function (e) {
            const seekTime = audio.duration/100 * e.target.value;
            audio.currentTime = seekTime
        }

        //when click next btn
        nextBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.nextSong()
            }
            //_this.nextSong();
            audio.play()
            _this.render();
            _this.scrollToActiveSong();
        }

        // when click prev btn
        prevBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else {
                _this.prevSong();
            }
            //_this.prevSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();

        }
        //When click repeat
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat',_this.isRepeat);
            
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        // when click random btn
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom);
            
            randomBtn.classList.toggle('active',_this.isRandom)
            
        }

        //handle when songs ended - auto play next song

        audio.onended = function () {
            if(_this.isRepeat){
                audio.play()
            }else {
                nextBtn.click()
            }
        }

        //listen action click to playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');
            if( songNode || e.target.closest('.option')){
                
                //handle click to exact song
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render()
                    audio.play();
                }

                //handle song option ...
                if(e.target.closest('.option')){

                }
            }
        }

    },
    // scroll to the active song
    scrollToActiveSong: function name(params) {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        })
    },
    loadCurrentSong : function () {
        

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig : function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong :function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex= 0;
        }
        this.loadCurrentSong()
    },
    prevSong :function () {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex= this.songs.length -1;
        }
        this.loadCurrentSong()
    },
    playRandomSong : function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();

    },
    start : function () {
        this.loadConfig()
        //define properties for object
        this.defineProperties()

        // lisen / handle events(DOM)
        this.handleEvents()

        //Load the first song to UI(user interface) when start the web
        this.loadCurrentSong()

        //render playlist
        this.render()

        repeatBtn.classList.toggle('active',this.isRepeat)
            randomBtn.classList.toggle('active',this.isRandom)
    }
}
app.start()