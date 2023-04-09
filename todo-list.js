let todoInput=document.getElementById('Todoinput')
let todoSubmit=document.querySelector('.submit-todo-btn')
let todoContainer=document.querySelector('.list-container')
let completedList=document.querySelector('.completed-list')




todoSubmit.addEventListener('click',(e)=>{
    e.preventDefault()

    if(todoInput.value==null||todoInput.value==''){
        return
    } else{
       
        localStorage.setItem(todoInput.value.trim(),todoInput.value)
     
        // console.log(localStorage.clear())
        window.location.reload()
    }
   
   
})

document.addEventListener('DOMContentLoaded',AddTodo)
document.addEventListener('DOMContentLoaded',renderCompleted)


function AddTodo(){
    for(i=0;i<localStorage.length;i++){
        let currentKey=localStorage.key(i)

        if(currentKey.includes('com-')){
            continue
        }else {
            let todoHolder=document.createElement('div')
            todoHolder.classList.add('Atodo')
            todoHolder.innerHTML=`<li class="todo-inner" >${localStorage.getItem(currentKey)} </li>
            <div class="functionbuttons">
                <input type="checkbox" name="complete" id="completeCheck" class="checkbox-style">
            <i class="fa-solid fa-trash delbtn" id='delbtn'></i>
            </div>`
    
            todoContainer.appendChild(todoHolder)
        }
        
    }
  

    //delete todos

    let deleteTodo=document.querySelectorAll('.delbtn')
// console.log(deleteTodo);
deleteTodo.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
     let todoInner=e.target
     let keyDelete=todoInner.parentElement.parentElement.children[0].innerHTML.trim()
     
     localStorage.removeItem(keyDelete);
     todoInner.parentElement.parentElement.remove()
     console.log(localStorage);
    })
})

//Add to completed list
let completedBoxes=document.querySelectorAll('.checkbox-style')
for(let i=0;i<completedBoxes.length;i++){
    
  let currentCheck=completedBoxes[i]
//   console.log(currentCheck);
  currentCheck.addEventListener('change',(e)=>{

    if(currentCheck.checked){
        console.log(`${this} is checked`);
        let checkTarget=e.target
        let completeInner=checkTarget.parentElement.parentElement.children[0].innerHTML
        let completeInnerKey=checkTarget.parentElement.parentElement.children[0].innerHTML.trim()
        localStorage.setItem(`com-${completeInner}`,completeInner)
        localStorage.removeItem(completeInnerKey)
        window.location.reload()
        checkTarget.parentElement.parentElement.remove()
    }

  })
}
}



function renderCompleted(){
    for(i=0;i<localStorage.length;i++){
        let compKey=localStorage.key(i)

        if(!compKey.includes('com-')){
            continue
        } else{
            let compEl=document.createElement('li')
            compEl.classList.add("comtodo")
            compEl.innerHTML=`<div>${localStorage.getItem(compKey)}</div>
            <i class="fa-solid fa-trash delbtn comdel" id='delbtn'></i>`
            completedList.appendChild(compEl)
        }
    }
     
    //Function to delete completed todo
    function deleteCompleted(){
        let comDelBtns=document.querySelectorAll('.comdel')

    for(i=0;i<comDelBtns.length;i++){
        let CurrentDel=comDelBtns[i]
        CurrentDel.addEventListener('click',(e)=>{
            let storedCom=e.target
            let comDelKey=storedCom.parentElement.children[0].innerHTML
            // console.log(comDelKey);
            localStorage.removeItem(`com-${comDelKey}`)
            storedCom.parentElement.remove()
            window.location.reload()
        })
    }
    }

    deleteCompleted()
    
    
}

