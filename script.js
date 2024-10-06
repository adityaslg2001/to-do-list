let arr_of_todos=[];

let arr_of_time_date=[];

function addTodo()
{
    let txtField=document.querySelector('.txt').value;
    let timeDateField=document.querySelector('.date').value;


    if(txtField&&timeDateField)
    {
    arr_of_todos.push(
        {
            task: txtField,
            dateTime: timeDateField
        }
    );
    // arr_of_todos.push(txtField);
    // arr_of_time_date.push(timeDateField);
    
    sortTodo();
    displayTodos();
     

    document.querySelector('.txt').value='';
    document.querySelector('.date').value='';

    }
    else
    {
        alert('Please Enter Both Task and Date/Time');
    }



}

function sortTodo() {
    arr_of_todos.sort((a, b) => {
        // Date comparison based on the original ISO dateTime string (which is sortable)
        let dateA = new Date(a.dateTime);
        let dateB = new Date(b.dateTime);

        // Compare the two Date objects
        return dateA - dateB;
    });
}


function displayTodos()
{   

    sortTodo();
    let addHere=document.querySelector('.add-todo');

    addHere.innerHTML="";

    for(let i=0;i<arr_of_todos.length;i++)
    {
        //make new div for each task
        let newDiv=document.createElement('div');
        newDiv.classList.add('parent');
        newDiv.classList.add('newdivs')

        let txtDiv=document.createElement('div');
        txtDiv.classList.add('txtdiv');

        //add task name
        let taskName=document.createElement('h2');
        taskName.textContent=arr_of_todos[i].task;
        txtDiv.appendChild(taskName);
        newDiv.appendChild(txtDiv);

        //add date-time
        let taskDate=document.createElement('h2');
        taskDate.textContent=better(arr_of_todos[i].dateTime);
        newDiv.appendChild(taskDate);

        let nestedDiv=document.createElement('div');
        nestedDiv.classList.add('button-field');
        //add delete-Button
        let delBtn=document.createElement('button');
        delBtn.textContent='DELETE';
        delBtn.classList.add('btn');
        delBtn.onclick = function() {
            deleteTodo(i);
        };
        nestedDiv.appendChild(delBtn);
        newDiv.appendChild(nestedDiv);


        addHere.appendChild(newDiv);

    }
    console.log(arr_of_todos);
}

function deleteTodo(i)
{
    arr_of_todos.splice(i,1);
    // arr_of_time_date.splice(i,1);
    displayTodos();
}

function better(dateTime)
{
        // Create a Date object from the datetime-local input
        let date = new Date(dateTime);
        
        // Extract day, month, and full year
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let year = date.getFullYear(); // Get full year
        
        // Extract time in HH:MM format
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Return formatted date and time as "DD-MM-YYYY ; HH:MM"
        return `${day}-${month}-${year}  /  ${hours}:${minutes}`;
}

