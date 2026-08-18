const data = document.getElementById('data')
const input = document.getElementById('title');
const addData = document.getElementById('addData');
const dataDate = document.getElementById('date')
const editTitle = document.getElementById('editTitle');
let editId = null;

const modal = document.getElementById('modal');
const saveBtn = document.getElementById('save');
const closeModal = document.getElementById('closeModal');

const modalEdit = document.getElementById('modalEdit');
const editBtn = document.getElementById('edit');
const closeModalEdit = document.getElementById('closeModalEdit');


let todos = [];

const showingData = async() => {
    try{
        const response = await fetch("/api/showData");
        const result = await response.json();
        todos = result;
        if (result.length === 0) return;
        console.log(todos);
        console.log(result[0].created_at);
        dataDate.innerHTML = new Date(result[0].created_at).toLocaleString("id-ID");
        
        data.innerHTML = "";

        result.forEach(todo => {
            data.innerHTML += `
                <div class="todo" >
                    <input
                        class="checkbox"
                        type="checkbox"
                        data-id="${todo.id}"
                        ${todo.status ? "checked" : ""}
                    >
                    <div class="seperator">
                        <span
                        style="${todo.status ? "text-decoration: line-through;" : ""}" 
                        >
                        ${todo.title}
                        </span>
                        <div class="actions">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18 22H6V20H18V22ZM9 6H15V4H17V6H22V8H20V20H18V8H6V20H4V8H2V6H7V4H9V6ZM15 4H9V2H15V4Z" class="delete" data-id="${todo.id}"/></svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16H6V18H8V20H10V22H2V14H4V16ZM12 20H10V18H12V20ZM14 18H12V16H14V18ZM10 16H8V14H10V16ZM16 16H14V14H16V16ZM6 14H4V12H6V14ZM12 14H10V12H12V14ZM18 14H16V12H18V14ZM8 12H6V10H8V12ZM14 12H12V10H14V12ZM20 12H18V10H20V12ZM10 10H8V8H10V10ZM18 10H16V8H18V10ZM22 10H20V8H22V10ZM12 8H10V6H12V8ZM16 8H14V6H16V8ZM20 8H18V6H20V8ZM14 6H12V4H14V6ZM18 6H16V4H18V6ZM16 4H14V2H16V4Z" class="edit" data-id="${todo.id}"/></svg>
                        </div>
                    </div>
                </div>
            `;
        })
    }catch(err){
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    showingData();
});

addData.addEventListener("click", () => {
    modal.style.display = "flex";
});

saveBtn.addEventListener("click", async () => {
    const title = input.value;
    if (!title.trim()) return;

    const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });
    const result = await response.json();
    console.log(result);
    input.value = "";
    modal.style.display = "none";
    showingData();
});


data.addEventListener("change", async (e) => {
    if (!e.target.classList.contains("checkbox")) return;

    const id = e.target.dataset.id;
    const status = e.target.checked;

    await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    });

    showingData();
});

data.addEventListener("click", async(e) => {
    if (!e.target.classList.contains("delete")) return;
    const id = e.target.dataset.id;

    await fetch(`/api/todos/${id}`,{
        method: "DELETE",
    })
    showingData();
});

data.addEventListener("click", async(e) => {
    if (!e.target.classList.contains("edit")) return;
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    editId = id;

    const todo = todos.find(todo => todo.id == id);
    if (!todo) return;

    editTitle.value = todo.title;
    modalEdit.style.display = "flex";

 });

editBtn.addEventListener('click', async(e) => {
    const id = editId;
    const title = editTitle.value;
    console.log(id);
     await fetch(`/api/todos/update/${id}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
         body: JSON.stringify({title : title})
    });       
    showingData();
    modalEdit.style.display = "none";
});


closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

closeModalEdit.addEventListener("click", () => {
    modalEdit.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

