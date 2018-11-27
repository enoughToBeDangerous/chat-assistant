import React, { Component } from 'react';
import ConversationWindow from './ConverstationWindow';
import InputSection from './InputSection';

class ChatInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnCount: 0,
            lastQuery: '',
            conversation: [

            ],
            context: {}
        };

        this.HandleUserInput = this.HandleUserInput.bind(this);
    }

    componentDidMount() {
        this.DeliverMessage('');
    }

    HandleUserInput = input => {

        let inputData = { //object added to the conversation array
            turn: this.state.turnCount + 1,
            from: 'user',
            text: input,
        }

        this.setState({
            conversation: this.state.conversation.concat(inputData),
            lastQuery: inputData.text,
            turnCount: inputData.turn
            }, () => {
                this.DeliverMessage(inputData.text);
        });

    }//HandleUserInput

    DeliverMessage = text => {
        let requestor = new XMLHttpRequest();
        let inputData = { //object added to the conversation array
            turn: this.state.turnCount + 1,
            from: 'watson',
            text: ''
        }
        requestor.responseType = 'text';
        requestor.open('POST', `/api/assistant/message/${text}`);
        requestor.onload = () => {
            console.log(JSON.stringify(this.state));
            if (requestor.readyState === requestor.DONE) {
                if (requestor.status === 200 && requestor.responseText !== 'error') {
                    let response = JSON.parse(requestor.responseText);
                    inputData.text = response.output.text[0];
                    this.setState( {context: response.context} );
                } else {
                    inputData.text = "I'm sorry, but it looks like an error has occurred."
                }
                this.setState({
                    conversation: this.state.conversation.concat(inputData),
                    turnCount: inputData.turn
                });
            } //if (requestor.readyState == requestor.DONE)
        } //requestor.onload
        requestor.send(JSON.stringify(this.state.context));
    } //DeliverMessage

    render() {
        return(
            <div id="Chat-Interface">
                <ConversationWindow conversation={this.state.conversation}/>
                <InputSection HandleUserInput={this.HandleUserInput}/>
            </div>
        );
    }
}//class ChatInterface

export default ChatInterface;