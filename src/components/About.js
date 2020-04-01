import React from 'react';
import proPic from '../media/download.png';
import '../css/components/About.css';

const About = () => {
    return(
        <section id="about" className="about-section">
            <div className="about-container container to-slide up">
                <div className="about-text">
                    <h3>About me</h3>
                    <p className="about-info">I'm a Software Engineer based in Forlì, Italy.</p>
                    <p className="about-info">I'm currently attending the Master Degree in Computer Engineering @ University of Bologna.</p>
                    <p className="about-info about-interests">I love bringing things to life, creating smooth and elegant digital experiences.</p>
                    <p className="about-info about-interests">I'm interested in all kinds of technology, but my major focuses are Artificial Intelligence, Machine Learning, CyberSecurity and Web Development.</p>
                    <p className="about-additional about-interests">I also have good knowledge of photographic post-processing and editing software.</p>
                    <p className="about-additional about-interests">In my free time, I enjoy learning new things, taking landscape photographs or hiking.</p>
                </div>
                <div className="about-photo">
                    <img className="propic" alt="Alberto profile" src={proPic}/>
                </div>
            </div>
        </section>
    );
}

export default About