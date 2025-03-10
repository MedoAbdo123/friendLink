import { useState } from 'react'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from './components/Home'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App