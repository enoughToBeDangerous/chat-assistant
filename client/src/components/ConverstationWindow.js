import React, { Component } from 'react';
import ChatItem from './ChatItem';

class ConversationWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div id="Conversation-Window">
                {
                    this.props.conversation.map( item => {
                        return(
                            <ChatItem 
                                from={item.from}
                                key={item.turn}
                                content={item.text}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default ConversationWindow;