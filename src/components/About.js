import React from 'react';
import proPic from '../media/download.png';
import '../css/components/About.css';

const About = () => {
    return(
        <section id="about" className="about-section">
            <div className="about-container container">
                <div className="about-box">
                    <div className="about-photo">
                        <img className="propic" alt="profile picture" src={proPic}/>
                    </div>
                    <div className="about-text">
                        <header>
                            <h2><span className="letter">A</span><span className="letter">b</span><span className="letter">o</span><span className="letter">u</span><span className="letter">t</span><span className="space"> </span><span className="letter">m</span><span className="letter">e</span></h2>
                        </header>
                        <p className="about-info">I'm a Software Engineer based in Forlì, Italy.</p>
                        <p className="about-info">I'm currently attending the Master Degree in Computer Engineering @ University of Bologna.</p>
                        <p className="about-info about-interests">I love bringing things to life, creating smooth and elegant digital experiences while keeping things clean behind the courtains.</p>
                        <p className="about-info about-interests">I'm interested in all kinds of technology, but my major focuses are Artificial Intelligence, Machine Learning, CyberSecurity and front-end developing.</p>
                        <p className="about-additional about-interests">I also have a strong knowledge on visual post-processing.</p>
                        <p className="about-additional about-interests">In my free time, I enjoy learning new things, taking landscape photographs or going on a hike.</p>
                        <p className="about-keep-scrolling">If you're interested in checking out some of my projects or you want to contact me, keep scroling down.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default About