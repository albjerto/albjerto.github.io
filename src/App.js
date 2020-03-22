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

        this.state = { currentScroll: 0, currentSection : '' };
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
        //do nothing
    }

    render() {
        const { currentScroll, currentSection } = this.state;
        return (
            <div className="page-container">
                <Navbar items={this.navItems} currentSection={'about'}/>
                <Header />
                <About /> 
                <Projects />
                <Contacts contacts={this.socialMedia}/> 
            </div>
        );
    }
}
