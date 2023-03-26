
// Task 세팅 -> 세팅된 데이터가 같은 범주여야 하기에 수정 삭제 기능 포함 
setTask=function(task,input,list_el){
  //task라는 class이름을 가진 div 생성
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
    editTask(input,task_edit_el,task_input_el);
  });


  //클릭 시 삭제 -> 로컬스토리지에서도 삭제 되도록 바꿔야함
  task_delete_el.addEventListener("click", ()=> {
    // task_el.remove();
    deleteTask(input,task_input_el,list_el,task_el);
  });
}

//수정
editTask=function(input,task_edit_el,task_input_el)

  {
    var editKey='changing';
    var editTask=editKey;
    var btnStatus =task_edit_el.innerText.toLowerCase();

    var checkCnt=1;
    var checkDuplicate =localStorage.getItem('Task');
    var parseCheckDuplicate = JSON.parse(checkDuplicate);
    // 동시 수정 예외처리
    parseCheckDuplicate.forEach((value) => {
      if((value == editKey) && (btnStatus == "edit"))
      {
        checkCnt++;
      }
    });

    if(checkCnt > 1 )
    {
      alert('여러개의 일정을 동시에 수정할 수 없습니다.');
      return;
    }
    else
    {
      if(btnStatus=="edit")
        {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();

          editKey=task_input_el.value;

          task_edit_el.innerHTML="Save";
        }
      else 
        {
          task_input_el.setAttribute("readonly","readonly");
          input.focus();

          editTask = task_input_el.value;

          task_edit_el.innerHTML="Edit";
          
        } 

        var loadStorageTask =localStorage.getItem('Task');
        var parseStorageTask = JSON.parse(loadStorageTask);
        parseStorageTask.forEach((value,index) => {
          if(value == editKey)
          {
            parseStorageTask.splice(index,1,editTask);

            var s_EditStorageTask = JSON.stringify(parseStorageTask);
            localStorage.setItem('Task',s_EditStorageTask);
          }
        });
    }
      
  }

  //삭제
  deleteTask = function(input,task_input_el,list_el,task_el)
  {
    var deleteStorageTask = localStorage.getItem('Task');
    var pareseDeleteStorageTask = JSON.parse(deleteStorageTask);

    pareseDeleteStorageTask.forEach((value,index)=>{
      if(value == task_input_el.value)
      {
        pareseDeleteStorageTask.splice(index,1);
        var s_DeleteStorageTask = JSON.stringify(pareseDeleteStorageTask);
        localStorage.setItem('Task',s_DeleteStorageTask);
        
        list_el.removeChild(task_el);
        input.focus();
      }
    });
  }



//페이지 로드가 끝나면 실행
window.addEventListener('load',()=>{
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list_el = document.querySelector('#tasks');

  // 페이지 로드 후 입력창에 포커싱
  input.focus();
  
  //로컬 스토리지에서 데이터로 세팅 
  if(localStorage.getItem('Task')!==null)
  {
    var getStorageTask = localStorage.getItem('Task');
    var parseGetStorageTask = JSON.parse(getStorageTask);

    parseGetStorageTask.forEach((value)=>{
      setTask(value,input,list_el);
    })
  }

  //신규 task 추가
  form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const task = input.value; // 전송한 내용

    // 예외처리들
    if(!task){
      alert("추가할 버킷리스트가 없습니다.");
      return;
    }
    
    
    // LocalStorage에 저장된 task 없으면 새로 추가 있으면 기존 배열에 새로운 task 추가 후 저장
    if(localStorage.getItem('Task')===null)
    {
      var localTask=[];
      localTask.push(task);
      var jsonLocalTask= JSON.stringify(localTask);
      
      localStorage.setItem('Task',jsonLocalTask);
    }
    else
    {
      var loadStorageTask =localStorage.getItem('Task');
      var parseStorageTask = JSON.parse(loadStorageTask);
      
      for(var i=0; i<parseStorageTask.length; i++)
      {
        if(parseStorageTask[i] == task)
        {
          alert("중복된 내용입니다. \n새로운 버킷리스트를 추가해주세요!");
          return 'retry';
        }
      }
      
      parseStorageTask.push(task);
      var s_EditStorageTask = JSON.stringify(parseStorageTask);
      localStorage.setItem('Task',s_EditStorageTask);
    }

    setTask(task,input,list_el);

  })
})
