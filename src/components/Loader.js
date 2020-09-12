import React from 'react';
import '../css/components/Loader.css';

/*
export default class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    addProgress = () => {
        this.setState({progress: this.state.progress+4});
        if (this.state.progress === 100) {
            clearInterval(this.timer);
            document.getElementById("loader-container").classList.add("fade-out-up-big");
            setTimeout(
                this.props.loadingDoneCallback,
                500);
        }
    }

    componentDidUpdate = () => {
        console.log("Loader received " + this.props.progress);
    }

    render = () => {
        return (
            <section id="loader">
                <div id="loader-container" className="loader-container container">
                    <svg viewBox="0 0 662.3936767578125 976.2302856445312" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="662.3936767578125px" height="976.2302856445312px" id="loader-logo">
                        <defs>
                            <linearGradient id="load" x1="0" y1="100%" x2="0" y2="0">
                                <stop offset={this.props.progress+ "%"} stopColor="#61d3a3"/>
                                <stop offset={this.props.progress+ "%"} stopColor="transparent"/>
                            </linearGradient>
                        </defs>
                        <g
                            transform="matrix(6.633274555206299, 0, 0, 6.633274555206299, -7.0870361328125, -2.51312255859375)"
                            fill="url(#load)"
                            id="g10">
                            <path
                            d="M 154.83203 -2.5136719 L 2.265625 646.2207 L 154.83203 646.2207 L 315.95312 -2.5136719 L 154.83203 -2.5136719 z M 334.72656 88.363281 L 258.37695 389.11523 L 320.19922 646.28711 L 472.76367 646.28711 L 334.72656 88.363281 z M 433.89258 326.29883 L 455.11914 415.05078 L 598.79688 411.66797 L 578.89648 326.29883 L 433.89258 326.29883 z M 617.16992 473.68945 L 475.21875 478.92969 L 512.56445 650.00195 L 442.44922 977.48633 L 587.45312 976.42578 L 660.75195 650.66602 L 617.16992 473.68945 z "
                            transform="matrix(0.1507551,0,0,0.1507551,1.0684069,0.37886605)"
                            id="path2" />
                        </g>
                    </svg>
                </div>
            </section>
        )
    }
}*/

export default function Loader(props) {
    const [amount, setAmount] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (amount < 100){
                setAmount(amount + 2);
            }
        }, 50);
        if (props.progress === 100 && amount === 100) {
            document.getElementById("loader-container").classList.add("fade-out-up-big");
            setTimeout(
                props.loadingDoneCallback,
                500);
        }
        
        return function cleanup() {
            clearTimeout();
            clearInterval(interval);
        } 
    });

    return (
        <section id="loader">
            <div id="loader-container" className="loader-container container">
                <svg viewBox="0 0 662.3936767578125 976.2302856445312" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="662.3936767578125px" height="976.2302856445312px" id="loader-logo">
                    <defs>
                        <linearGradient id="load" x1="0" y1="100%" x2="0" y2="0">
                            <stop offset={amount+ "%"} stopColor="#61d3a3"/>
                            <stop offset={amount+ "%"} stopColor="transparent"/>
                        </linearGradient>
                    </defs>
                    <g
                        transform="matrix(6.633274555206299, 0, 0, 6.633274555206299, -7.0870361328125, -2.51312255859375)"
                        fill="url(#load)"
                        id="g10">
                        <path
                            d="M 154.83203 -2.5136719 L 2.265625 646.2207 L 154.83203 646.2207 L 315.95312 -2.5136719 L 154.83203 -2.5136719 z M 334.72656 88.363281 L 258.37695 389.11523 L 320.19922 646.28711 L 472.76367 646.28711 L 334.72656 88.363281 z M 433.89258 326.29883 L 455.11914 415.05078 L 598.79688 411.66797 L 578.89648 326.29883 L 433.89258 326.29883 z M 617.16992 473.68945 L 475.21875 478.92969 L 512.56445 650.00195 L 442.44922 977.48633 L 587.45312 976.42578 L 660.75195 650.66602 L 617.16992 473.68945 z "
                            transform="matrix(0.1507551,0,0,0.1507551,1.0684069,0.37886605)"
                            id="path2" />
                    </g>
                </svg>
            </div>
        </section>
    )
}