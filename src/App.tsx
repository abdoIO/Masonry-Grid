import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MasonryGrid from './components/MasonryGrid'
import PhotoDetail from './components/PhotoDetail'
import { LoadingProvider } from './context/LoadingContext'

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
          <Route path='/' element={<MasonryGrid />} />
          <Route path='/photo/:id' element={<PhotoDetail />} />
        </Routes>
      </Router>
    </LoadingProvider>
  )
}

export default App
