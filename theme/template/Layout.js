import React from 'react'


class Layout extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Header</h2>
                {this.props.children}
                <h4>Footer</h4>
            </div>
        )
    }
}


export default Layout