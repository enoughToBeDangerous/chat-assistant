import React, { Component } from 'react';

class InputSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    HandleInputBarChange = event => { this.setState( {input: event.target.value} ) }

    HandleSubmitButton = event => {
        event.preventDefault();
        this.props.HandleUserInput(this.state.input);
        this.setState( {input: ''} );
    }

    render() {
        return(
            <div id="Input-Section">
                <form id="Input-Form" onSubmit={this.HandleSubmitButton.bind(this)}>
                    <input id="Input-Bar"
                        type="text"
                        placeholder="How can I help?"
                        value={this.state.input}
                        onChange={this.HandleInputBarChange.bind(this)}
                    />
                    <button id="Input-Send-Button" type="submit">send</button>
                </form>
            </div>
        );
    }
}

export default InputSection;