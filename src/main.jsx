import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import Materials from './pages/Materials'
import QuotePage from './pages/QuotePage'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/solutions' element={<Solutions />} />
          <Route path='/materials' element={<Materials />} />
          <Route path='/quote' element={<QuotePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/faq' element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)