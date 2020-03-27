import React from 'react';
import '../css/components/Header.css'

const Header = () => {
    return (
        <section id="home" className="header-section">
            <div className="header-container container">
                <div className="welcome">
                    <h1 className="welcome-title">
                        <span className="letter">H</span><span className="letter">e</span><span className="letter">l</span><span className="letter">l</span><span className="letter">o</span><span className="letter">!</span><br/><span className="letter">I</span><span className="letter">'</span><span className="letter">m</span><span className="space"> </span><span className="letter">A</span><span className="letter">l</span><span className="letter">b</span><span className="letter">e</span><span className="letter">r</span><span className="letter">t</span><span className="letter">o</span><span className="space"> </span><span className="letter">J</span><span className="letter">e</span><span className="letter">s</span><span className="letter">u</span><span className="letter">.</span>
                    </h1>
                    <p className="welcome-info">Computer Engineer and Web Developer.  I build things.</p>
                </div>
                <div className="logo-svg">
                    <svg id="master-artboard" viewBox="0 0 662.3936767578125 976.2302856445312" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="662.3936767578125px" height="976.2302856445312px">
                        <g transform="matrix(6.633274555206299, 0, 0, 6.633274555206299, -7.0870361328125, -2.51312255859375)">
                            <path className="dashed ord-1" d="M 24.40999984741211 0 L 1.409999966621399 97.80000305175781 L 24.40999984741211 97.80000305175781 L 48.70000076293945 0 L 24.40999984741211 0 Z"/>
                            <path className="dashed ord-2" d="M1959.89,2383.49l5.63,25.79-10.57,49.37,21.86-.16,11.05-49.11-6.57-26.68Z" transform="translate(-1887.18 -2310.91)" />
                            <path className="dashed ord-3" d="M1978.52,2373.35l-3-12.87h-21.86l3.2,13.38Z" transform="translate(-1887.18 -2310.91)"/>
                            <path className="dashed ord-4" d="M1938.71,2324.61l20.81,84.11h-23l-9.32-38.77Z" transform="translate(-1887.18 -2310.91)"/>
                        </g>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default Header