


window.addEventListener('load',()=>{
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list_el = document.querySelector('#tasks');

  const task_el = document.createElement("div");
  const task_content_el = document.createElement("div");
  const task_input_el = document.createElement("input");
  const task_actions_el=document.createElement("div");
  const task_edit_el=document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerHTML="Edit";

  const task_delete_el=document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerHTML="Delete";

  setTask=function(task){
    const task_el = document.createElement("div");
    task_el.classList.add("task");


    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    // task_content_el.innerText=task; 아래 input에서 속성 value에 추가 시켜줄 것
    
    // 추가될 내용에 속성값을 지정해준다.
    
    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type= "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly" , "readonly");
    
    const task_actions_el=document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el=document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML="Edit";

    const task_delete_el=document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML="Delete";


    task_content_el.appendChild(task_input_el);
    task_el.appendChild(task_content_el); 


    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);
    list_el.appendChild(task_el);
    
    input.value = "";
  }

  if(localStorage.getItem('key_num')!==0)
  {
    

    for(var i =1; i<localStorage.length; i++)
    {
      setTask(localStorage.getItem(i));
    }
  }

  form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const task = input.value; // 전송한 내용

    if(!task){
      alert("추가할 내용이 없습니다.");
      return;
    }
    
    setTask(task);

    if(localStorage.getItem('key_num')===null)
    {
      var save_key = 1;
      localStorage.setItem('key_num',save_key);
    }
    else
    {
      var save_key=localStorage.getItem('key_num');
      save_key++;
    }
    localStorage.setItem(save_key,task);// 내용 저장
    localStorage.setItem('key_num',save_key);// 현재 키 번호 저장

    //수정
    task_edit_el.addEventListener("click", () => {
      if(task_edit_el.innerText.toLowerCase()=="edit")
        {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerHTML="Save";
        }
      else 
        {
          task_input_el.setAttribute("readonly","readonly");
          task_input_el.focus();
          task_edit_el.innerHTML="Edit";
        } 
      });

    //삭제+
    task_delete_el.addEventListener("click", ()=> {
      // task_el.remove();
      list_el.removeChild(task_el);
    })
    
    });

  })
