import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./fonts/fonts.css"
import Menu from "./pages/Menu"
import Worlds from "./pages/Worlds"
import NotFound from "./pages/404"
import Characters from './pages/Characters';
import CharacterPage from "./pages/CharacterPage"
import Layout from "./elements/Layout"
import NewCharacter from './pages/NewCharacter'
import Demo from './pages/Demo'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route index element={<Menu />} />
        <Route element={<Layout/>}>
          <Route path="/demo" element={<Demo/>}/>
          <Route path="/worlds" element={<Worlds/>}/>
          <Route path="/characters" element={<Characters />}/>
          <Route path="/character/:characterId" element={<CharacterPage/>}/>
          <Route path="/newCharacter" element={<NewCharacter/>}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
    </Routes>
  </BrowserRouter>

);