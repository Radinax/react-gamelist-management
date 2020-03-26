import React from 'react'
import Home from './pages/home'
import Gamelist from './pages/gamelist'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from 'styled-components';
import tw from 'tailwind.macro';
import './index.css'

const Container = styled.div`${tw`
  bg-gray-400 font-sans leading-normal tracking-normal min-h-screen
`}`

function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/game-list"  component={Gamelist} />
      </Router>
    </Container>
  )
}

export default App;
