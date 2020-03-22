import React from 'react';
import '../css/components/Contacts.css';
//css needed

const ContactLinks = props => {
    const contactLinks = props.items.map(item => {
        return (
            <span className="contacts-item-box" key={item.name}>
                <a
                    className="contacts-item"
                    href={item.link}
                >
                    <span className={item.icon} alt={"Link to Alberto's " + item.name}></span>
                </a>
            </span>

        );
    });
  
    return (
        <div className="contacts-group">
            {contactLinks}
        </div>
    );
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
                <h2>Get in touch!</h2>
                <p>If you want to get in touch with me for any reason, may it be about a project, university or even just to say hi, send me a mail at</p>
                <span className="fas fa-envelope"></span> <a className="mail-link" href="mailto:albertojesu1005@gmail.com">albertojesu1995@gmail.com</a>
                <p>You can also find me at</p>
                <ContactLinks items={contacts} />
            </section>
        )
    }
}