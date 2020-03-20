import React from 'react'
import proPic from '../media/download.png'
//css needed

const About = () => {
    return(
        <div className="about-container container">
            <div className="about-photo">
                <img className="propic" alt="profile picture" src={proPic}/>
            </div>
            <div className="about-text">
                <header>
                    <h1>Hello, I'm <span className="about-name">Alberto Jesu</span></h1>
                    <p className="about-tagline">I'm currently attending the Master Degree in Computer Engineering @ University of Bologna.</p>
                </header>
                <p className="about-info about-interests">My main focus areas are <span className="heavier">Artificial Intelligence</span>, <span className="heavier">Machine Learning</span> and <span className="heavier">Cybersecurity</span>. I'm also very much into <span className="heavier">Web Development</span> and <span className="heavier">UX/UI design</span>.</p>
                <p className="about-additional about-interests">In my free time, I love landscape photography, learning new things or going on a hike.</p>
            </div>
        </div>
    )
}

export default About