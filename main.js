
// Task 세팅 -> 세팅된 데이터가 같은 범주여야 하기에 수정 삭제 기능 포함 
setTask=function(task,input,list_el){
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
  task_el.appendChild(task_content_el); ''


  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);

  task_el.appendChild(task_actions_el);
  list_el.appendChild(task_el);
  input.value = "";
  
  //클릭 시 수정 -> 로컬스토리지에서도 수정 되도록 바꿔야함
  task_edit_el.addEventListener("click", ()=>{
    editTask(task_edit_el,task_input_el);
  });


  //클릭 시 삭제 -> 로컬스토리지에서도 삭제 되도록 바꿔야함
  task_delete_el.addEventListener("click", ()=> {
    // task_el.remove();
    deleteTask(list_el,task_el);
  });
}

//수정
editTask=function(task_edit_el,task_input_el)
  {
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
  }

  //삭제
  deleteTask = function(list_el,task_el)
  {
    list_el.removeChild(task_el);
  }

//페이지 로드가 끝나면 실행
window.addEventListener('load',()=>{
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list_el = document.querySelector('#tasks');

  
  //로컬 스토리지에서 데이터로 세팅 -> 배열 객체로 변경해야함
  if(localStorage.getItem('key_num')!==0)
  {
    for(var i =1; i<localStorage.length; i++)
    {
      setTask(localStorage.getItem(i),input,list_el);
    }
  }

  //신규 task 추가
  form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const task = input.value; // 전송한 내용

    if(!task){
      alert("추가할 일정이 없습니다.");
      return;
    }
    
    setTask(task,input,list_el);

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

  })
})
