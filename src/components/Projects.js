import React from 'react';
import '../css/components/Projects.css';

class GifThumbnails extends React.Component {
    constructor(props) {
        super(props);

        this.static_img = this.props.img[0];
        this.animated_img = this.props.gif;
        this.ref = React.createRef();
    }

    animateGif = () => {
        this.ref.current.getElementsByClassName("static")[0].classList.add("hidden")
        this.ref.current.getElementsByClassName("dynamic")[0].classList.remove("hidden")
    }

    backToStatic = () => {
        this.ref.current.getElementsByClassName("static")[0].classList.remove("hidden")
        this.ref.current.getElementsByClassName("dynamic")[0].classList.add("hidden")
    }

    render() {

        const img = this.static_img;
        let classes = "project-thumbnail gif-to-animate";
        return (
            <div className={classes} onMouseEnter={this.animateGif} onMouseLeave={this.backToStatic} ref={this.ref}>
                <img className="static" src={this.static_img.key} alt="Project preview"></img>
                <img className="dynamic hidden" src={this.animated_img} alt="Project preview"></img>
            </div>
        );
    }
}

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

        var len = this.props.imgs.length;
        var optClasses = this.props.optClasses;

        this.state = {
            curr: 0,
            len: len,
            optClasses: optClasses
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
        let className = "project-thumbnail";
        if(this.state.len > 1) {
            return (
                <div className={className}>
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
                <div className={className}>
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
                    {
                        p.hasOwnProperty("gif") ?   <GifThumbnails img={imgs} gif={p.gif}/> : <Thumbnails imgs={imgs}/>
                    }
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
                            <a href={p.more} target="projects" title={p.link_title}>{p.icon}</a>
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