const taskList = document.getElementById("tasklist");
const allTasksButton = document.getElementById("allTasks");
const completeTasksButton = document.getElementById("completeTasks");
const pendingTasksButton = document.getElementById("pendingTasks");
const progressBar = document.getElementById('progress-bar');
const emojiContainer = document.getElementById("emoji-container");
const noTaskImg = document.getElementById("no-task-img");  // Reference to the image

let tasks = [];  // Array to hold tasks

document.getElementById("taskform").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = document.getElementById("inputtask").value.trim();

    if (taskText !== "") {
        addTask(taskText);
        document.getElementById("inputtask").value = "";
    }
});

function addTask(taskText) {
    const task = {
        text: taskText,
        completed: false
    };
    
    tasks.push(task);  // Add task to the array
    renderTasks(tasks);  // Render all tasks
}

function renderTasks(tasksToRender) {
    taskList.innerHTML = "";  // Clear existing tasks

    // Check if there are tasks
    if (tasks.length === 0) {
        // Show the image and message when there are no tasks
        noTaskImg.style.display = "block";  
        emojiContainer.innerHTML = "🚀 Let's start with your tasks!";
       
    } else {
        // Hide the image when tasks exist
        noTaskImg.style.display = "none";  
    }

    tasksToRender.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;  // Update task completion status
            renderTasks(tasks);  // Re-render tasks
        });

        const taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.textContent = task.text;

        const editButton = document.createElement("button");
        const editIcon = document.createElement("img");
        editIcon.src = "https://img.icons8.com/ios-glyphs/30/000000/edit.png";
        editButton.appendChild(editIcon);

        editButton.addEventListener("click", function() {
            const newTaskText = prompt("Edit your task:", task.text);
            if (newTaskText !== null) {
                task.text = newTaskText.trim();
                renderTasks(tasks);
            }
        });

        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png";
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);  // Remove task from array
            renderTasks(tasks);
        });

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        
        taskList.appendChild(li);
    });

    updateProgress(); // Call to update progress and emoji
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressBar.style.width = percentage + "%";

    // Update the emoji message based on task progress
    if (totalTasks === 0) {
        emojiContainer.innerHTML = "🚀 Let's start with your tasks!";
    } else if (percentage === 100) {
        emojiContainer.innerHTML = "🎉 Congratulations! All tasks completed!";
    } else if (percentage > 50) {
        emojiContainer.innerHTML = "😊 Well done! You're over halfway!";
    } else if (percentage > 0) {
        emojiContainer.innerHTML = "💪 Keep going! You're doing great!";
    } else {
        emojiContainer.innerHTML = "🚀 Let's start with your tasks!";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    renderTasks(tasks);
});

// Event listeners for buttons
allTasksButton.addEventListener("click", function() {
    renderTasks(tasks);  // Show all tasks
});

completeTasksButton.addEventListener("click", function() {
    const completedTasks = tasks.filter(task => task.completed);  // Filter completed tasks
    renderTasks(completedTasks);
});

pendingTasksButton.addEventListener("click", function() {
    const pendingTasks = tasks.filter(task => !task.completed);  // Filter pending tasks
    renderTasks(pendingTasks);
});


// let tasks = [];
// const addTast = () => {
//     const inputtask = document.getElementById('inputtask');
//     const task = inputtask.value.trim()

//     if (text) {
//         tasks.push({ text: text, completed: false })
//         inputtask.value = "";
//         updateTaskList();
//     }
//     console.log(tasks);
// };

// const updateTaskList = () => {
//     const tasklist = document.getElementById('tasklist')
//     tasklist.innerHTML = "";

//     tasks.forEach(task => {
//         const listItem = document.createElement('li');
//         listItem.innerHTML = `
//         <div class='taskItem">
//             <div class='task'>
//                 <input type ="checkbox" class="checkbox">
//                 <p>Finish this project</p>
//             </div>

//             <div class="icons">
//                 <img src="">
//                 <img src="">
//             </div>
//         </div>
//         `
//     })
// }

// document.getElementById('newtask').addEventListener('click', function (e) {
//     e.preventDefault()

//     addTast();
// });