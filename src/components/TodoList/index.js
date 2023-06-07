import {
  Col,
  Row,
  Input,
  Button,
  Select,
  Tag
} from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllTodosThunk,
  addTodoThunk,
} from './todoSlice'
import {
  useState,
  useEffect
} from 'react'
import todoSelectors from '../../redux/selectors';

export default function TodoList() {
  const dispatch = useDispatch()
  const todoLists = useSelector(todoSelectors)
  const [todo, setTodo] = useState({
    id: null,
    name: '',
    priority: 'Medium',
    completed: false
  })

  useEffect(() => {
    dispatch(getAllTodosThunk())
  }, [])

  const handleAddTodo = () => {
    dispatch(addTodoThunk({
      ...todo,
      id: Math.floor(Math.random() * 1000000)
    }))
    setTodo(prev => ({
      ...prev,
      name: '',
      priority: 'Medium',
      id: null
    }))
  }

  const handleChangeName = e => {
    setTodo(prev => ({
      ...prev,
      name: e.target.value
    }))
  }

  const handleChangePrio = value => {
    setTodo(prev => ({
      ...prev,
      priority: value
    }))
  }


  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoLists.map((todo, index) =>
          <Todo
            key={index}
            name={todo.name}
            priority={todo.priority}
            completed={todo.completed}
            id={todo.id}
          />
        )}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input
            value={todo.name}
            onChange={handleChangeName}
          />
          <Select
            defaultValue="Medium"
            value={todo.priority}
            onChange={handleChangePrio}
          >
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
