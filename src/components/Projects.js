import React from 'react';
import '../css/components/Projects.css';

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

        var len = this.props.imgs.length;

        this.state = {
            curr: 0,
            len: len
        }
    }
 
    _nextSlide = button => { 
        var next = (this.state.curr + 1 >= this.state.len) ? 0 : this.state.curr + 1;
        this.setState( { curr: next },
            () => {
                this.changeSlide(button);
            });
    }

    _prevSlide = button => {
        var prev = this.state.curr - 1 < 0 ? this.state.len -1 : this.state.curr - 1;
        this.setState( { curr: prev },
            () => {
                this.changeSlide(button);
            } ); 
    }

    onButtonClick = e => {
        var button = e.target;

        //the event might be triggered by the button children as well
        if(button.classList.contains('next') || button.classList.contains('next-button')) {
            this._nextSlide(button);
        } else {
            this._prevSlide(button);
        }
    }

    changeSlide = button => {
        var siblings = Array.from( (button.classList.contains('next') ? button.parentElement.parentElement.children : button.parentElement.children) );
        var dir = (button.classList.contains('next') || button.classList.contains('next-button')) ? 'right' : 'left';
        var toRemove = siblings.find(el => {
            return el.tagName !== "DIV" && !el.classList.contains('hidden');
        });
        if(toRemove !== undefined) {
            toRemove.classList.remove('fade-in-left');
            toRemove.classList.remove('fade-in-right');
            toRemove.classList.add('hidden');
            var toSlide = siblings.find(el => {
                return el.classList.contains('image-slide-'+this.state.curr);
            });
            if(toSlide !== undefined) {
                toSlide.classList.remove('hidden');
                toSlide.classList.add('fade-in-'+dir);
            }

        }
    }

    render() {

        const imgs = this.props.imgs;
        if(this.state.len > 1) {
            return (
                <div className="project-thumbnail">
                    {imgs}
                    <div className="next-button" onClick={this.onButtonClick}>
                        <span className="next"></span>
                        <span className="next"></span>
                    </div>
                    <div className="prev-button" onClick={this.onButtonClick}>
                        <span className="prev"></span>
                        <span className="prev"></span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="project-thumbnail">
                    {imgs}
                </div>
            );
        }
    }
}

const Projects = (props) => {
    var i = 0;
    var j = 0;
    const projects = props.list.map(p => {
        var idx = 0;
        const imgs = p.image.map(img => {
            return(
                <img key={img} className={"image-slide-"+idx + ((idx++ > 0) ? " hidden" : "")} src={img} alt={"Preview for project " + p.title}/>
            );
        });
        return (
            <div className={"project to-slide " + ((i++ % 2 === 0) ? "left" : "right")} key={p.title}>
                <div className="project-info">
                    <Thumbnails imgs={imgs}/>
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
                            <a href={p.more} title={p.link_title}>{p.icon}</a>
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