import React from 'react'
//css needed

const Navbar = ({items, isExpanded, currentSection}) => {
    const className = isExpanded ? 'expanded' : ''
    const navItems = items.map(item => {
        return(
            <a
                key={item.name} 
                className={"navbar-item navbar-item-dimensions clickable " + ( item.name === currentSection ? "navbar-item-selected" : "" )}>
                    {item.name}
            </a>
        )
    });

    return(
        <nav className={"navbar navbar-top " +className}>
           {navItems}
        </nav>
    )
}

export default Navbar;