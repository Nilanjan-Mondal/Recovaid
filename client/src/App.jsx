import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import { BaseUrl } from './configs/ClientConfig'

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${BaseUrl}/ping`, {
          method: 'GET',
          credentials: 'include',
        })
        if (res.ok) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (err) {
        console.error('Login check failed', err)
        setIsLoggedIn(false)
      }
    }

    checkLogin()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BaseUrl}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include', // sends cookies
      });

      if (res.ok) {
        setIsLoggedIn(false);
        navigate('/'); // go to home or login
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const handleGoToDashboard = () => {
    // Navigate or scroll to the dashboard section.
    console.log("Navigating to dashboard...");
  };

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

      <Navbar
        onRegisterClick={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboard={handleGoToDashboard}
      />

      {authOpen && (<Auth onClose={() => setAuthOpen(false)} onLogin={() => setIsLoggedIn(true)} />)}

      <Home
        onRegisterClick={() => setAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        onDashboard={handleGoToDashboard}
      />

    </>
  )
}

export default App
