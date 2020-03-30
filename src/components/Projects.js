import React from 'react';
import '../css/components/Projects.css';

const Projects = (props) => {
    var i = 0;
    var j = 0;
    const projects = props.list.map(p => {
        return (
            <div className={"project to-slide " + ((i++ % 2 === 0) ? "left" : "right")} key={p.title}>
                
                <div className="project-info">
                    <div className="project-thumbnail">
                        <div style={{height: "350px", background: "black"}}>{p.image}</div>
                    </div>
                    <div className="project-text-wrapper">
                    <h4 className="project-title">{p.title}</h4>
                        <p className="project-description">{p.desc}</p>
                        <div className="project-tech">
                            {p.tech.map(t => {
                                return (
                                    <span className="tech" key={j++}>{t}</span>
                                )
                            })}
                        </div>
                        <div className="project-more">
                            <a href={p.more} title={p.link_title}><span className={p.icon}></span></a>
                        </div>
                    </div>
                </div>
            </div> 
        )
    });
    return (
        <section id="projects" className="projects-section">
            <div className="projects-container container to-slide up">
                <h3>Projects</h3>
                <p>Here are some of the projects I have worked on lately:</p>
                <div className="projects">
                    {projects}
                </div>
            </div>
        </section>
    )
}

export default Projects;