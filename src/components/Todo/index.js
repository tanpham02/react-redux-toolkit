import { Row, Tag, Checkbox } from 'antd'
import { useState } from 'react'
import {
  toggleTodoThunk,
  editTodoThunk,
  deleteTodoThunk
} from '../TodoList/todoSlice'
import { useDispatch } from 'react-redux'

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
}

export default function Todo({
  name,
  priority,
  completed,
  id
}) {
  const [checked, setChecked] = useState(completed)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)



  const toggleCheckbox = () => {
    setChecked(!checked)
    dispatch(toggleTodoThunk(id))
  }

  const handleBlur = () => {
    setIsEditing(false)
    dispatch(editTodoThunk({
      priority,
      completed,
      id,
      name: editName
    }))
  }

  const handleShowEditText = e => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleChangeText = e => {
    setEditName(e.target.innerText)
  }

  const handleRemoveTodo = () => {
    if (window.confirm(`Bạn chắc chắn muốn xóa nhiệm vụ ${name}?`) === true) {
      dispatch(deleteTodoThunk(id))
    }
  }

  return (
    <div id='hover-show'>
      <Row
        justify='space-between'
        style={{
          marginBottom: 3,
          ...(completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
        }}
      >
        <Checkbox checked={completed} onClick={toggleCheckbox}>
          <span
            contentEditable={isEditing}
            onBlur={handleBlur}
            onContextMenu={handleShowEditText}
            onInput={handleChangeText}
          >
            {name}
          </span>

        </Checkbox>
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
      </Row>
      <div
        className='icon'
        style={{
          position: 'absolute',
          left: '75%',
          top: 0,
          padding: '0, 20px',
          cursor: 'pointer',
          visibility: 'hidden'
        }}
      >
        <i
          className="fa-solid fa-trash"
          style={{
            color: '#cf1322'
          }}
          onClick={handleRemoveTodo}
        ></i>

      </div>
    </div>
  )
}
