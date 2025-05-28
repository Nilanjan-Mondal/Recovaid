import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Auth from './components/Auth'

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>

      {/* 
        React Component Data Flow ->
        Data (props) flows from Parent → Child
        Always one-way: top-down (parent to child)

        A parent sends data to a child using props.

        The child cannot directly modify the parent’s state — it can only ask the parent to do something (e.g., by calling a function passed as a prop). 
        
        Here App.jsx is the parent component and Navbar is the child component.
        The Navbar component receives the onRegisterClick function as a prop, which it can call when the "Register Now" button is clicked.
        
        Auth component is conditionally rendered based on the authOpen state, which is controlled by the App component.

        everytime the state is changed react re-renders the app component completely thereby achieving the desired effect of showing and hiding the Auth component.
      */}


      <Navbar onRegisterClick={() => setAuthOpen(true)} />
      {authOpen && (<Auth onClose={() => setAuthOpen(false)} />)}
      <Home onRegisterClick={() => setAuthOpen(true)}/>
    </>
  )
}

export default App
