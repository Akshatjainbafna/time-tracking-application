import React, { useState } from "react";


// Tasks Component
export default function Tasks({ projectObj }) {
    const [taskName, setTaskName] = useState('')
    const [timeSpent, setTimeSpent] = useState('')
    const [description, setDescription] = useState('')
    var tasks = projectObj.tasks;

    function addTask(e) {
        e.preventDefault();

        // Get the current date in yyyy-mm-dd format
        const currentDate = new Date().toISOString().slice(0, 10);
        const taskData = localStorage.getItem(currentDate);
        let workedToday = Number(taskData) + Number(timeSpent);
        localStorage.setItem(currentDate, workedToday);

        let newTask = { taskName, timeSpent, description };
        let allTheProjects = JSON.parse(localStorage.getItem('allTheProjects'));
        tasks.push(newTask)
        let project = { id: projectObj.id, name: projectObj.name, tasks: tasks };
        console.log(project)
        allTheProjects.splice((projectObj.id - 1), 1, project);

        localStorage.setItem('allTheProjects', JSON.stringify(allTheProjects));
        setTaskName('');
        setTimeSpent(0);
        setDescription('');
    }
    return (
        <div>
            <form onSubmit={addTask}>
                <input type="text" value={taskName} id="taskName" placeholder="Task Name" name="taskName" onChange={(e) => setTaskName(e.target.value)} />

                <input type="number" value={timeSpent} min='1' max='12' id="timeSpent" placeholder="Time Spent" name="timeSpent" onChange={(e) => setTimeSpent(e.target.value)} />

                <input id="description" value={description} placeholder="Description" name="description" onChange={(e) => setDescription(e.target.value)}></input>

                <button type="submit">Create Task</button>
            </form>
            <h5>List of Tasks</h5>
            <table style={{ borderCollapse: 'collapse', width: "100%" }}>
                <tr>
                    <th>
                        Task Name
                    </th>
                    <th>
                        Duration
                    </th>
                    <th>
                        Description
                    </th>
                </tr>

                {tasks.map((task, index) => (
                    <tr>
                        <td>
                            {task.taskName}
                        </td>
                        <td>
                            {task.timeSpent} hrs
                        </td>
                        <td>
                            {task.description ? <span>{task.description}</span> : 'None'}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}