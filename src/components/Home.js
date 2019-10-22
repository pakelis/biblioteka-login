import React from 'react'
import app from '../firebase'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
      {/* button has onClick handler that will sign us out using firebase API */}
    </div>
  )
}

export default Home
