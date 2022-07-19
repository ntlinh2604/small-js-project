const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

const gererateTemplate = todo =>{
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html //thêm thẻ li khi ng dùng nhập add new todo
}
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();//xóa khoảng trống trc sau khi user nhập vào
    
    if(todo.length){
        gererateTemplate(todo);
        addForm.reset();//khi nhập vào add new nó tự reset ko lưu lại  chữ trên thanh gõ
    }

})
//khi click vào thùng rác nó xóa lun thẻ li
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove()
    }
})

const filterTodos = (term) =>{

    Array.from(list.children)//lấy đc list li chuyến sang array
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'))

        Array.from(list.children)
        .filter((todo) => todo.textContent.includes(term))
        .forEach((todo) => todo.classList.remove('filtered'))    
}

search.addEventListener('keyup',() => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term)
})