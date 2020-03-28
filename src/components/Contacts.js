import React from 'react';
import '../css/components/Contacts.css';
//css needed

const ContactLinks = props => {
    const position = props.side;
    var i = 11;
    const contactLinks = props.items.map(item => {
        return (
                <li
                    key={item.name}
                    className="contacts-item"   
                >
                    <a className={"contacts-link" + ((position) ? " fade-in-left-"+i-- : "")} title={"Link to Alberto's " + item.name} href={item.link}><span className={item.icon}></span></a>
                </li>

        );
    });
  
    return contactLinks;
}

export default class Contacts extends React.Component {
    
    //useless for now, i'll implement a working form as soon as i have time
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            email: '',
            subject: '',
            text: ''
        }; 
    }
 
    render() {
        const { contacts } = this.props;
        return (
            <section id="contacts" className="contacts-section">
                <div className="contacts-container container to-slide up">
                    <div className="contacts-text">
                        <h3>Get in touch!</h3>
                        <p className="mail-contacts">If you want to get in touch with me for any reason, may it be about a project or just to say hi, send me a mail at <a className="mail-link" href="mailto:albertojesu1005@gmail.com">albertojesu1995@gmail.com</a> or fill in the form below.</p>
                        <p className="socials-contact">If you wish to follow me or to reach out to me in other ways, you can find me also on</p>
                        <ul className="contacts-banner">
                            <ContactLinks items={contacts} side={false}/>
                        </ul>
                    </div>
                </div>
                <div className="contacts-sidebar">
                    <ul className="contacts-sidebar-list">
                        <ContactLinks items={contacts} side={true}/>
                    </ul>
                </div>
            </section>
        )
    }
}