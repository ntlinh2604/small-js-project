class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save the chat document
        const response = await this.chats.add(chat);//same as use db.collection('chats').add(chat)
        return response;
    }
//real-time lisener
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)//get room whatever we pass in chatroom
            .orderBy('created_at')
            .onSnapshot(snapshot => {
              
            snapshot.docChanges().forEach(change => {
                
                if(change.type === 'added'){
                    //update the ui
                    
                    callback(change.doc)//get all data added-nguyen dam nay goi la data
                    
                }
            })
        })
    }
    //update name

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username)
    }
    
    //update room

    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();//dont save the change anymore
        }
    }

}

// const chatroom = new Chatroom('gaming', 'katze')
// //add chat to database
// // chatroom.addChat('new shoe') - add chat to database


// chatroom.getChats((data) => {//from datas get from the callback, do something with it
    
// })

// setTimeout(() => {
//     chatroom.updateRoom('general');
//     chatroom.updateName('thy');
//     chatroom.getChats(data => {
//         console.log(data)
//     });
//     chatroom.addChat('an com thoi')
    
// }, 3000);