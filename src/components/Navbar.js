import React from 'react'
import scrollToElement from 'scroll-to-element';
import '../css/components/Navbar.css';


const NavItems = props => {
    const click = props.clickHandler;
    const currentSection = props.currentSection;
    const navItems = props.items.map(item => {
        return(
            <li className="navbar-item" key={item.name}>
                <a
                    href={"#"+item.name} 
                    onClick={click}
                    className={"navbar-item navbar-item-dimensions" + ( item.name === currentSection ? " active" : "" )}>
                        {item.name}
                </a>
            </li>
        );
    });
 
    return (
        <nav className="navbar">
            {navItems}
        </nav>
    );
}


export default class Navbar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }
    }

    navbarMenuClick = () => {
        var newState = (this.state.isExpanded ? false : true);
        this.setState({isExpanded : newState});
        document.getElementById('navbar-list').classList.toggle('fade-in-down');
    }

    navbarLinkClink = (e) => {
        e.preventDefault();
        var target = e.target.hash;
        scrollToElement(target, {
            ease: 'inOutQuad',
            duration: 400
        })
    }


    render() {
        const { items, currentSection } = this.props;
        return(
            <div className="top">
                <div className={"overlay" + (this.state.isExpanded ? " expanded" : "")}>
                    <ul className="navbar-list" id="navbar-list">
                        <NavItems items={items} clickHandler={this.navbarLinkClink} currentSection={currentSection} />
                    </ul>
                </div>
                <div className={"burger-button" + (this.state.isExpanded? " expanded" : "")} onClick={this.navbarMenuClick}>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </div>
            </div>
        )
    }
}