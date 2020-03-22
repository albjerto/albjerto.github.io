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
            </div>
        </section>
    )
}

export default Header