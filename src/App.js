import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js'
import About from './components/About.js'

function App() {

    const navItems = [
        {
            name: 'about'
        },
        {
            name: 'works'
        },
        {
            name: 'contact'
        }
    ]

    return (
        <div className="header">
            <div className="page-container">
                <Navbar items={navItems} isExpanded={true} currentSection={'about'}/>
                <div className="header-container"></div>
                <div className="about-container container">
                    <About />
                </div>
                <div className="projects-container container">
                    <h2>Projects</h2>
                    <p>Here are some of the projets I worked on during University or as a freelance.</p>
                </div>
                <div className="contacts-container container">
                    <h2>Say hi!</h2>
                    <p>Don't hesitate to get in touch with me for questions, work or even to have a chat. I swear I'm a friendly guy.</p>
                </div>
            </div>
        </div>
    )
}

export default App;
