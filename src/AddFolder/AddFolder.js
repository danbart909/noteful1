import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
import config from '../config'
import ApiContext from '../ApiContext'
import './AddFolder.css'

export default class AddFolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      }
    };
  }

  static contextType = ApiContext;

  newFolder = (newFolderName) => {
    this.setState({
      name: {
        value: newFolderName,
        touched: true
      }
    })
  }

  generateErrorMessage = () => {
    const newFolderName = this.state.name.value.replace(/[\s-]/g, '');
    if (!/^[a-zA-Z0-9]*$/gm.test(newFolderName) && this.state.name.touched) {
      return 'Folder names must be alphanumeric!'
    } else if (newFolderName.length >= 20) {
      return 'Please use less than 20 characters!'
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target[0].value
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name}),
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then((data) => {
      this.context.addFolder(data)
      this.props.history.push(`/folder/${data.id}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        {/* <NotefulForm> */}
        <form className="Noteful-form" onSubmit={(e) => {this.handleSubmit(e)}}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' onChange={(e) => {this.newFolder(e.target.value)}} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
          {this.generateErrorMessage() ? <p>{this.generateErrorMessage()}</p> : ''}
        </form>
        {/* </NotefulForm> */}
      </section>
    )
  }
}
