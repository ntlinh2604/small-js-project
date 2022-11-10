//render chat templates to the DOM
//clear the list of chats(when the room changes)

class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = '';
  };

  

  render(data) {
   
    const when = dateFns.distanceInWordsToNow(data.data().created_at.toDate(), { addSuffix: true });
    const html = `
            <li id="${data.id}" class="list-group-item">
                <div>
                    <span class="username">${data.data().username}</span>
                    <span class="message">${data.data().message}</span>
                    <div class="time">${when}</div>
                </div>
                <button class="delete-msg">x</button>
            </li>
        `; //data get from calbackfn in chat.js and getChat(data)

    this.list.innerHTML += html;

    let deletebtns = document.querySelectorAll('.delete-msg');
    
    deletebtns.forEach((deletebtn) =>{
      deletebtn.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('id');
        
        let li = document.getElementById(id);
        console.log(li)
        
        db.collection('chats').doc(id).delete()
        chatList.removeChild(li)
    })
    })

    
    


    
    
  }

  
}
