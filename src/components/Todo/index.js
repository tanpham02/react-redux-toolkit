import { Row, Tag, Checkbox } from 'antd'
import { useState } from 'react'
import { toggleTodoThunk } from '../TodoList/todoSlice'
import { useDispatch } from 'react-redux'

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
}

export default function Todo({ name, priority, completed, id, aaa, checkId }) {
  const [checked, setChecked] = useState(completed)
  const dispatch = useDispatch()


  const toggleCheckbox = () => {
    setChecked(!checked)
    dispatch(toggleTodoThunk(id))
    aaa(id)
  }

  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={completed} onClick={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  )
}
