import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar.js';
import Header from './components/Header.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Contacts from './components/Contacts.js';

export default class App extends React.Component {
    constructor(prop) {
        super(prop);

        this.state = { currentScroll: 0, currentSection : 'home' };
    }

    navItems = [
        {
            name: 'home'
        },
        {
            name: 'about'
        },
        {
            name: 'projects'
        },
        {
            name: 'contacts'
        }
    ];

    socialMedia = [
        {
            name: 'LinkedIn',
            icon: 'fab fa-linkedin',
            link: 'https://www.linkedin.com/in/alberto-jesu'
        },
        {
            name: 'Facebook',
            icon: 'fab fa-facebook',
            link: 'https://www.facebook.com/alberto.jesu'
        },
        {
            name: 'Instagram',
            icon: 'fab fa-instagram',
            link: 'https://www.instagram.com/albjerto'
        },
        {
            name: 'GitHub',
            icon: 'fab fa-github',
            link: 'https://www.github.com/albjerto'
        },
        {
            name: '500px',
            icon: 'fab fa-500px',
            link: 'https://www.500px.com/albjerto'
        }
    ];
    
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = evt => {
        this.updateScroll();
        this.updateSection();
        this.slideInVisibleElements();
    }

    slideInVisibleElements = () => {
        var elements = Array.from(document.getElementsByClassName('to-slide'));

        elements.forEach(e => {
            if(this.isInViewPort(e)) {
                e.classList.remove("to-slide");
                //the last token indicates the direction
                var dir = e.classList[e.classList.length-1];
                e.classList.remove(dir);
                e.classList.add("fade-in-"+dir);
            }
        })
    }

    isInViewPort = (element) => {
        var bounding = element.getBoundingClientRect();

        if (((window.innerHeight || document.documentElement.clientHeight) - bounding.top)/100 >= 2) {
            return true;
        } else {
            return false;
        }
    }

    updateScroll = () => {
        var offset;
        if(window.pageYOffset !== undefined)
            offset = window.pageYOffset;
        else
            offset = (document.documentElement || document.body.parentNode || document.body).scrollTop;
        
        this.setState({ currentScroll : offset });
    }

    updateSection = () => {
        var sections = Array.from(document.getElementsByTagName('section'))
                            .filter(x => {
                               return x.getBoundingClientRect().top > -window.innerHeight && x.getBoundingClientRect().bottom > 0;
                            });
        var closest = sections[0];
        if(closest) {
            this.setState({ currentSection : closest.getAttribute('id') });
        }

    }

    render() {
        const { currentScroll, currentSection } = this.state;
        return (
            <div className="page-container">
                <Navbar items={this.navItems} currentSection={this.state.currentSection}/>
                <Header/>
                <About /> 
                <Projects />
                <Contacts contacts={this.socialMedia}/>
            </div>
        );
    }
}
