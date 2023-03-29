import React, { useState } from 'react';
import Tasks from './tasks.components';


// Projects Component
function Projects() {
    const [title, setTitle] = useState('');
    if (localStorage.getItem('allTheProjects') === null || localStorage.getItem('allTheProjects') === 'null') {
        var allTheProjects = 'null';
    } else {
        allTheProjects = JSON.parse(localStorage.getItem('allTheProjects'));
    }
    function addProject(e) {
        e.preventDefault();
        var allTheProjects = JSON.parse(localStorage.getItem('allTheProjects'));

        if (localStorage.getItem('allTheProjects') !== 'null') {
            let newProject = {
                id: allTheProjects.length + 1,
                name: title,
                tasks: []
            }
            console.log(newProject);
            allTheProjects.push(newProject)
            localStorage.setItem('allTheProjects', JSON.stringify(allTheProjects))

            allTheProjects = JSON.parse(localStorage.getItem('allTheProjects'));

        } else {
            let newProject = [{
                id: 1,
                name: title,
                tasks: []
            }]
            localStorage.setItem('allTheProjects', JSON.stringify(newProject))

            allTheProjects = JSON.parse(localStorage.getItem('allTheProjects'));
        }
        setTitle('')
    }
    return (
        <div>
            <TimeTracker />
            <div style={{ position: 'sticky', top: '0', right: '0', width: '100%', backgroundColor: 'white'}}>
            <h2>Create a new Project</h2>
            <form onSubmit={addProject}>
                <input type="text" id="projectName" placeholder='Project Name' value={title} name="projectName" onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Create Project</button>
            </form>
            <h3>List of Projects</h3>
            <hr></hr>
            </div>

            <ul>
                {allTheProjects !== 'null' && allTheProjects.reverse().map((project, index) => (
                    <div key={index} style={{ marginBottom: '5vh' }}>
                        <div>
                            <h3>{project.name}</h3>
                        </div>
                        <Tasks projectObj={project} />
                        <hr></hr>
                    </div>
                ))}
            </ul>
        </div>
    );
}


// TimeTracker Component
function TimeTracker() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const workedToday = localStorage.getItem(currentDate);
    return (
        <div style={{ position: 'fixed', top: '20px', right: '5vw', width: '100px', borderRadius: '10%', backgroundColor: 'lightgrey', padding: '10px', zIndex: '2' }}>
            <b>Worked Today:
                <br />
                <br />
                {workedToday} hrs
            </b>
        </div>
    );
}

export { Projects, TimeTracker };
