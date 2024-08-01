
displayToDo();

// Adding a To-Do to the localStorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTime = document.getElementById("addTime");
  let addTxt = document.getElementById("addTxt");
  
 
  let list = localStorage.getItem("notes");
  if (list== null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }
  let Obj = {
    time:addTime.value,
    text: addTxt.value
  }

  //console.log(Obj.time)

  ToDoObj.push(Obj);
  localStorage.setItem("notes", JSON.stringify(ToDoObj));
 
  addTime.value = "";
  addTxt.value = "";
 //console.log(ToDoObj);
  displayToDo();
});

// Function to show elements from localStorage
function displayToDo() {
  let list = localStorage.getItem("notes");
  if (list == null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }
  let ToDo = "";
  ToDoObj.forEach(function(element, index) {
    ToDo += `
            <div class="task my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body card-background">
                        <h5 class="card-title time">${element.time}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}" class="btn btn-danger" onclick="deleteToDo(this.id)">X</button>
                        <button id="${index}" class="btn btn-success" onclick="completed(this.id)">Done</button>
                        <button id="${index}" class="btn btn-primary" onclick="editToDo(this.id)">Edit</button>
                        <button id="${index}" class="btn btn-warning " onclick="saveToDo(this.id)">Save</button>
                    </div>
                </div>`;
  
  });
 

  let Elm = document.getElementById("notes");
  if (ToDoObj.length != 0) {
    Elm.innerHTML = ToDo;
  } else {
    Elm.innerHTML = "No To-Do as of now";
  }
}

// Function to delete a task
function deleteToDo(index) {

  let list = localStorage.getItem("notes");
  if (list == null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }

  ToDoObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(ToDoObj));
  displayToDo();
}

//Searching for a task
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputValue = search.value;
    let noteCards = document.getElementsByClassName('task');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputValue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
//Function to complete a task
function completed(index){
  
  let list = localStorage.getItem("notes");
  if (list == null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }
  let date=document.getElementsByClassName("time")[index]
  date.innerText=""
 let elementBg= document.getElementsByClassName("card-background")[index]
elementBg.style.backgroundColor="green"
let elementText=document.getElementsByClassName("card-text")[index]
elementText.innerText="Task completed successfully"
Obj={
  time:date.innerText,
  text:elementText.innerText
}
ToDoObj.push(Obj)

localStorage.setItem("notes",JSON.stringify(ToDoObj))
deleteToDo(index)
}

//Function to edit a task
function editToDo(index){
  let list = localStorage.getItem("notes");
  if (list == null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }
  let canEdit=false
  let elementText=document.getElementsByClassName("card-text")[index]
    if(elementText.innerText==="Task completed successfully"){
      canEdit=false
    }
    else{
      canEdit=true
      let elementText=document.getElementsByClassName("card-text")[index]
elementText.contentEditable="true"
    }
  }
  
  //Function to save edited task
  function saveToDo(index){
    let list = localStorage.getItem("notes");
  if (list == null) {
    ToDoObj = [];
  } else {
    ToDoObj = JSON.parse(list);
  }
    let date=document.getElementsByClassName("time")[index]
    let elementText=document.getElementsByClassName("card-text")[index]
  let newText=elementText.innerText

Obj={
  time:date.innerText,
  text:newText
}
ToDoObj.push(Obj)

localStorage.setItem("notes",JSON.stringify(ToDoObj))
deleteToDo(index)

}



