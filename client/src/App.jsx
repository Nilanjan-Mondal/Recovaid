import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Auth from './components/Auth'

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>

      {/* React Component Data Flow ->
      Data (props) flows from Parent → Child
      Always one-way: top-down (parent to child)

      A parent sends data to a child using props.

      The child cannot directly modify the parent’s state — it can only ask the parent to do something (e.g., by calling a function passed as a prop). 
      
      Here App.jsx is the parent component and Navbar is the child component.
      The Navbar component receives the onRegisterClick function as a prop, which it can call when the "Register Now" button is clicked.
      The App component manages the state of whether the Auth modal is open or not, and it passes a function to Navbar that allows it to open the Auth modal when the button is clicked.
      */}


      <Navbar onRegisterClick={() => setAuthOpen(true)} />
      {authOpen && (<Auth onClose={() => setAuthOpen(false)} />)}
      <Home onRegisterClick={() => setAuthOpen(true)}/>
    </>
  )
}

export default App
