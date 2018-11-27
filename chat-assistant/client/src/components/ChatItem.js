import React from 'react';

const ChatItem = props => {
    let rowSide = props.from === 'user' ? 'Chat-Row-Right' : 'Chat-Row-Left';
    let bubbleClass = rowSide === 'Chat-Row-Right' ? 'From-User' : 'From-Watson';

    return(
        <div className={rowSide}>
            <div className={['Chat-Item', bubbleClass].join(' ')}>
                <div className={'Chat-Content'}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default ChatItem;