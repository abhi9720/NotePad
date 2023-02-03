
import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Notepad from './Notepad/Notepad';
import Todo from './ToDO/Todo';
import Home from './Home';
import NewAPP from './NewsApp/NewAPP';



const App = () => {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/notepad" element={<Notepad />}>
        </Route>
        <Route path="/task-tracker" element={<Todo />}>
        </Route>
        <Route path="/news" element={<NewAPP />}>
        </Route>

      </Routes>
    </Router>

  )
}

export default App