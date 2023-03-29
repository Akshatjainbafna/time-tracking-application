import logo from './logo.svg';
import './App.css';
import { Projects } from './components/projects.compoent';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (localStorage.getItem('allTheProjects') == null){
        localStorage.setItem('allTheProjects', null)
    }
    const currentDate = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem(currentDate) == null){
      localStorage.setItem(currentDate, 0);
    }
}, [])
  return (
    <div className="App">
      <Projects />
    </div>
  );
}

export default App;
