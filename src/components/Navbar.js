import React from 'react'
import '../css/components/Navbar.css';


const NavItems = props => {
    const click = props.clickHandler;
    const currentSection = props.currentSection;
    const navItems = props.items.map(item => {
        return(
            <a
                key={item.name}
                href={"#"+item.name} 
                onClick={click}
                className={"navbar-item navbar-item-dimensions" + ( item.name === currentSection ? " active" : "" )}>
                    {item.name}
            </a>
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

    handleClick = () => {
        var newState = (this.state.isExpanded ? false : true);
        this.setState({isExpanded : newState});
    }

    render() {
        const { items, currentSection } = this.props;
        return(
            <div className="top">
                <div className={"overlay" + (this.state.isExpanded ? " expanded" : "")}>
                    <NavItems items={items} clickHandler={this.handleClick} currentSection={currentSection} />
                </div>
    
                <div className={"burger-button" + (this.state.isExpanded? " expanded" : "")} onClick={this.handleClick}>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </div>
            </div>
        )
    }
}