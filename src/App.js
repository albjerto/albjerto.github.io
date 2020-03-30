import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar.js';
import Header from './components/Header.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Contacts from './components/Contacts.js';
import { Scene } from 'three';

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

    projects = [ 
        {
            title: 'Store shelf recognition',
            image: 'Thumbnail',
            desc: 'University project for the development of a computer vision algorithm that recognizes cereal boxes on store shelves, with the intent of creating a device for blind people',
            more: 'https://www.github.com/albjerto',
            link_title: 'Link to GitHub repository',
            icon: 'fab fa-github',
            tech: ['python', 'opencv']
        },
        {
            title: 'Edil Landi Portfolio',
            image: 'Thumbnail',
            desc: 'Simple and fully responsive portfolio website for a construction company in Forlì',
            more: 'https://www.edil-landi.it',
            link_title: 'Link to external website',
            icon: 'fas fa-external-link-alt',
            tech: ['php', 'bootstrap', 'javascript']
        },
        {
            title: 'cercAlloggi',
            image: 'Thumbnail',
            desc: 'User friendly platform and map-based that aids off-site students in searching for an accomodation in Forlì (as of now)',
            more: 'mailto:albertojesu1995@gmail.com',
            link_title: 'Contact me to know more',
            icon: 'fas fa-envelope',
            tech: ['php', 'bootstrap', 'mysql', 'maps-api', 'javascript']
        },
        {
            title: 'MITM attack simulation',
            image: 'Thumbnail',
            desc: 'Simulation of a man-in-the-middle attack that aims to find vulnerabilities in the most used IoT protocols, in collaboration with CryptoNet Labs',
            more: 'mailto:albertojesu1995@gmail.com',
            link_title: 'Contact me to know more',
            icon: 'fas fa-envelope',
            tech: ['python', 'java', 'android', 'wolfssl']
        },
        {
            title: 'robo-butler',
            image: 'Thumbnail',
            desc: 'Project that simulates with a physical robot, and its virtual twin, the behaviour of a butler in a room full of moving obstacles in a technologically heterogeneous environment',
            more: 'https://www.github.com/albjerto',
            link_title: 'Link to GitHub repository',
            icon: 'fab fa-github',
            tech: ['kotlin', 'java', 'ai', 'node', 'javascript', 'mqtt', 'coap', 'prolog']

        }
    ]
    
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
                               return x.offsetTop - this.state.currentScroll <= 1;
                            });
        var closest = sections[sections.length - 1];
        if(closest) {
            this.toggleSidebar(closest.getAttribute('id'), this.state.currentSection, document.getElementById('contacts-sidebar'));
            this.setState({ currentSection : closest.getAttribute('id') });
        }

    }

    toggleSidebar = (currSect, oldSect, sidebar) => {
        if(currSect === 'contacts') {
            if(sidebar.classList.contains('fade-in-left')) {
                sidebar.classList.remove('fade-in-left');
            }
            sidebar.classList.add('fade-out-left');
        } else if(currSect !== 'contacts' && oldSect === 'contacts') {
            if(sidebar.classList.contains('fade-out-left')) {
                sidebar.classList.remove('fade-out-left');
            }
            sidebar.classList.add('fade-in-left');
        }
    }

    increasePoints = () => {
        Scene._setMaxPoints(1000);
    }

    render() {
        const { currentScroll, currentSection } = this.state;
        setInterval(console.log(Scene));
        return (
            <div className="page-container">
                <Navbar items={this.navItems} currentSection={this.state.currentSection}/>
                <Header/>
                <About /> 
                <Projects list={this.projects}/>
                <Contacts contacts={this.socialMedia}/>
            </div>
        );
    }
}
