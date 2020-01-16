import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {

  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = ApiContext;

  handleBack = () => {
    this.props.history.push('/')
  }

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.handleBack(note.noteId)}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Main
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            <Link to={`/folder/${note.folderId}`}>{folder.name}</Link>
          </h3>
        )}
      </div>
    )
  }
}
