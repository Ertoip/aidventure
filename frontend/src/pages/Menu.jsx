import React from 'react';
import MenuButton from '../elements/MenuButton';
import 'bootstrap/dist/css/bootstrap.css';
import './Menu.scss';
import Particles from '../elements/Particles';

function Menu() {
  return (
    <div className='menu'>
      <Particles></Particles>
      <div className="menu-container">
        <h1 className="menu-title text-center"><b>AI</b>dventure</h1>
        <div className="menu-items">
          <MenuButton pageName="Demo" destination="/demo" />
          <MenuButton pageName="Worlds" destination="/worlds" />
          <MenuButton pageName="Characters" destination="/characters" />
          <MenuButton pageName="Designer" destination="/designer" />
          <MenuButton pageName="Vault" destination="/vault" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
