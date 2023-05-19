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
import { addTodo, toogleTodo } from './todoSlice'
import { useState, useCallback, useEffect } from 'react'
import todoSelectors from '../../redux/selectors';

export default function TodoList() {
  const dispatch = useDispatch()
  const todoLists = useSelector(todoSelectors)
  const [todo, setTodo] = useState({
    name: '',
    prioriry: 'Medium',
    completed: false
  })
  const [toggle, setToogle] = useState([])

  const handleAddTodo = () => {
    dispatch(addTodo(todo))
    setTodo(prev => ({
      ...prev,
      name: '',
      prioriry: 'Medium'
    }))

    const newTodoList = JSON.parse(localStorage.getItem('todoListsStorage')) ?? []
    newTodoList.push({
      name: todo.name,
      prioriry: todo.prioriry,
      completed: todo.completed
    })
    localStorage.setItem('todoListsStorage', JSON.stringify(newTodoList))
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
      prioriry: value
    }))
  }

  const handleToogleTodo = useCallback((id) => {
    const checked = toggle.includes(id)
    setToogle(prev => {
      if (checked) {
        return toggle.filter(togg => togg !== id)
      }
      return [...prev, id]
    })
  }, [toggle])

  useEffect(() => {
    dispatch(toogleTodo(toggle))
  }, [toggle])


  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoLists.map((todo, index) =>
          <Todo
            key={index}
            name={todo.name}
            prioriry={todo.prioriry}
            completed={todo.completed}
            id={index}
            onToogleTodo={handleToogleTodo}
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
            value={todo.prioriry}
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
