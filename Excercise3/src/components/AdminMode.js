import React, { Component } from 'react'

class AdminMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }

    render() {
        return (
            <div>
                <h1>Welcome To Admin Mode</h1>
                <button onClick={ this.props.disableAdminMode }>Disable admin mode</button>
            </div>
        )
    }
}

export default AdminMode;