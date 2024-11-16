import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Login } from './pages/LoginPage/Login'
import { Start } from './pages/StartPage/Start'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      <Start />
    </>
  )
}

export default App
