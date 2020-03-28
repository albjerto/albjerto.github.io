import React from 'react';
import Scene from './Scene.js';
import '../css/components/Header.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true
        }
    }

    slideOut = () => {
        this.setState( { active : false } );
    }

    render = () => {
        return (
            <section id="home" className="header-section">
                <div className="header-container container">
                    <div className="welcome">
                        <h1 className="welcome-hero">
                            Hello!
                        </h1>
                        <h2 className="welcome-name">
                            <span className="letter">I</span><span className="letter">'</span><span className="letter">m</span><span className="space"> </span><span className="letter">A</span><span className="letter">l</span><span className="letter">b</span><span className="letter">e</span><span className="letter">r</span><span className="letter">t</span><span className="letter">o</span><span className="space"> </span><span className="letter">J</span><span className="letter">e</span><span className="letter">s</span><span className="letter">u</span><span className="letter">.</span>
                        </h2>
                        <p className="welcome-info">Software Engineer and Web Developer. I build things.</p>
                        <p className="welcome-sectors">AI | Web | Security</p>
                    </div>
                </div>
                <Scene />
            </section>
        )
    };
}