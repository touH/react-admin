import React, { Component, Fragment } from "react";


const fakeAccounts = [
  {
    id: 1,
    name: "One",
    email: "fake.email@example.com"
  },
  {
    id: 2,
    name: "Two",
    email: "fake.email@example.com"
  }
];

class AccountsList extends Component {
  state = {
    selectedIndex: 0
  };

  render() {
    const { accounts } = this.props;
    const { selectedIndex } = this.state;
    const selectedAccount = accounts[selectedIndex];
    return (
      <Fragment>
        <UncontrolledEmailInput
          key={selectedAccount.id}
          defaultEmail={selectedAccount.email}
        />
        <p>
          {this.props.accounts.map((account, index) => (
            <label key={account.id}>
              <input
                type="radio"
                name="account"
                checked={selectedIndex === index}
                onChange={() => this.setState({ selectedIndex: index })}
              />{" "}
              {account.name}
            </label>
          ))}
        </p>
      </Fragment>
    );
  }
}

class UncontrolledEmailInput extends Component {
  // Default the "draft" email to the value passed in via props.
  state = {
    email: this.props.defaultEmail
  };

  componentDidMount() {
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return (
      <label>
        Email: <input onChange={this.handleChange} value={this.state.email} />
      </label>
    );
  }
}


export default (props) => {
  return <div>
    <AccountsList accounts={fakeAccounts} />,
  </div>
}
