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
                    <a className={"contacts-link" + ((position) ? " fade-in-left-"+i-- : "")} title={"Link to Alberto's " + item.name} href={item.link} target="social">{item.icon}</a>
                </li>

        );
    });
  
    return contactLinks;
}

export default class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.nameId="name";
        this.emailId="email";
        this.textId="text";

        this.state = {
            name: '',
            email: '',
            text: ''
        }
    }

    handleChange = e => {
        var key = e.target.attribute.it;
        this.setState({ [key] : e.target.value.trim() });
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this._validateForm());
    }

    _validateForm = () => {
        var name = this.state.name;

        if(name.length < 5) {
            document.getElementById(this.nameId).classList.add('error-highlight');
            return false;
        }
        document.getElementById(this.nameId).classList.remove('error-highlight');

        var email = this.state.email;
        if(!this._validateMail(email)) {
            document.getElementById(this.emailId).classList.add('error-highlight');
            return false;
        }
        document.getElementById(this.emailId).classList.remove('error-highlight');

        var message = this.state.text;
        if(message.length < 5) {
            document.getElementById(this.textId).classList.add('error-highlight');
            return false;
        }
        document.getElementById(this.textId).classList.remove('error-highlight');
        return true;
        
    }

    _validateMail = email => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return (true)
        }
        return false;
    }

    render() {
        const { contacts } = this.props;
        return (
            <section id="contacts" className="contacts-section">
                <div className="contacts-container container to-slide up">
                    <div className="contacts-text">
                        <h3>Get in touch </h3>
                        <p className="mail-contacts">If you want to get in touch with me for any reason, may it be about work or just to say hi, send me a mail at <a className="mail-link" href="mailto:albertojesu1995@gmail.com">albertojesu1995@gmail.com</a> and I will get back to you as soon as possible.</p>
                    </div>
                    <div className="contacts-mobile">
                        <p>Alternatively, if you wish to follow me or to contact me in other ways, you can also find me on </p>
                        <ul className="contacts-banner">
                            <ContactLinks items={contacts} side={false}/>
                        </ul> 
                    </div>
                </div>
                <div className="contacts-sidebar" id="contacts-sidebar">
                    <ul className="contacts-sidebar-list">
                        <ContactLinks items={contacts} side={true}/>
                    </ul>
                </div>
            </section>
        )
    }
}