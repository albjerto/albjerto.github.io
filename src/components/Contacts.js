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
                <div className="contacts-container container">
                    <div className="contacts-text">
                        <h2><span className="letter">G</span><span className="letter">e</span><span className="letter">t</span><span className="space"> </span><span className="letter">i</span><span className="letter">n</span><span className="space"> </span><span className="letter">t</span><span className="letter">o</span><span className="letter">u</span><span className="letter">c</span><span className="letter">h</span><span className="letter">!</span></h2>
                        <p className="mail-contacts">If you want to get in touch with me for any reason, may it be about a project, university or even just to say hi, send me a mail at <a className="mail-link" href="mailto:albertojesu1005@gmail.com">albertojesu1995@gmail.com</a> or fill in the form below.</p>
                        <p className="socials-contact">If you wish to follow me or to reach out to me in other ways, you can find also me on</p>
                        <ContactLinks items={contacts} />
                    </div>
                </div>
            </section>
        )
    }
}