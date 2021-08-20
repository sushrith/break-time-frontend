import React, { useRef } from 'react'
import { images } from '../../constants/constants';
import WelcomeCard from './WelcomeCard'
import EmptyComponent from './EmptyComponent'
import './welcome.css'
import DataService from '../../DataService';
import {JPA_API_URL} from '../../constants/constants'
class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subscribeDisabled: false,
        }
        this.publicSigningKey = '';
        this.checkSubscription = this.checkSubscription.bind(this);
        this.init = this.init.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }

    async checkSubscription() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
            console.info('Subscription: ', subscription.endpoint);
            //    localStorage.setItem('Subscription',subscription.endpoint);
            const response = await fetch(`${JPA_API_URL}/isSubscribed`, {
                method: 'POST',
                body: JSON.stringify({ endpoint: subscription.endpoint }),
                headers: {
                    "content-type": "application/json"
                }
            });
            const subscribed = await response.json();

            if (subscribed) {
                console.log('Subscription: ', subscription.endpoint);
                this.setState({
                    subscribeDisabled: true
                });
            }
            return subscribed;
        }
        return false;
    }

    async init() {
        fetch(`${JPA_API_URL}/publicSigningKey`)
            .then(response => response.arrayBuffer())
            .then(key => this.publicSigningKey = key)
            .finally(() => console.info(this.publicSigningKey, 'Application Server Public Key fetched from the server'));

        await navigator.serviceWorker.register("/sw.js", {
            scope: "/"
        });

        await navigator.serviceWorker.ready;
        console.info('Service Worker has been installed and is ready');
    }

    async subscribe() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.publicSigningKey
        });
        const i = Math.floor(Math.random() * 3);
        const obj = { "subscription": subscription, "username": localStorage.getItem('username'), "schedule": i };
        localStorage.setItem('Id', i);
        console.info(`Subscribed to Push Service: ${subscription.endpoint}`);
        //localStorage.setItem('endpoint',JSON.stringify(subscription.endpoint));

        //subscription.username= await localStorage.getItem('username');
        //subscription.schedule= 1;
        //console.info(`Subscribed to Push Service: ${subscription}`);
        //alert(JSON.stringify(obj));
        await fetch(`${JPA_API_URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json"
            }
        });

        console.info('Subscription info sent to the server');
        this.setState({
            subscribeDisabled: true
        });
    }

    async unsubscribe() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
            const successful = await subscription.unsubscribe();
            if (successful) {
                console.info('Unsubscription successful');

                await fetch(`${JPA_API_URL}/unsubscribe`, {
                    method: 'POST',
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                    headers: {
                        "content-type": "application/json"
                    }
                });

                console.info('Unsubscription info sent to the server');

                this.setState({
                    subscribeDisabled: false
                });
            }
            else {
                console.error('Unsubscription failed');
            }
        }
    }

    componentDidMount() {
        if ("serviceWorker" in navigator) {
            try {
                this.checkSubscription();
                this.init();
            } catch (e) {
                console.error('error init(): ' + e);
            }
        }
    }

    render() {
        return (
            <>
                <h1 className="welcomeHeading">Your Interests</h1>
                <h5 className="schedule" >{localStorage.getItem('Id') > 0 ? localStorage.getItem('Id') == 1 ? <span className="busy">Today your schedule is BUSY</span>  : <span className="hectic">Today your schedule is HECTIC</span > : <span className="normal">Today your schedule is NORMAL</span>}</h5>
                <span className="my-4">
                    <button className="btn btn-success" id="subscribeButton"
                        disabled={this.state.subscribeDisabled}
                        onClick={() => {
                            this.subscribe().catch(e => {
                                if (Notification.permission === 'denied') {
                                    console.warn('Permission for notifications was denied');
                                } else {
                                    console.error('error subscribe(): ' + e);
                                }
                            });
                            this.setState({
                                subscribeDisabled: !this.state.subscribeDisabled
                            });
                        }}
                    >Subscribe Notifications</button>
                    <button className="btn btn-warning" id="unsubscribeButton"
                        disabled={!this.state.subscribeDisabled}
                        onClick={() => {
                            this.unsubscribe().catch(e => console.error('error unsubscribe(): ' + e));
                        }}
                    >Unsubscribe Notifications</button>
                </span>

                <div className="head">
                    {
                        (this.props.data.length === 0) ? <EmptyComponent /> : this.props.data.map((i, k) => {
                            var f = images.filter(obj => { return obj.id === i })
                            if (f.length === 1)
                                return (
                                    <WelcomeCard key={k} data={f} alldata={this.props.data} setState={this.props.setState} />
                                )
                        })
                    }
                </div>
                <div className="back">
                    <a href="/chooseIntrest"><button type="button" className="btn btn-info m-4">Back To Interests</button></a>

                </div>
            </>
        )
    }

}

export default Welcome