import {
  Col,
  Row,
  Input,
  Typography,
  Radio,
  Select,
  Tag
} from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  search,
  status,
  priorities
} from './filterSlice'

export default function Filters() {
  const { Search } = Input
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [statusText, setStatusText] = useState('All')

  const handleChangeSearch = e => {
    setSearchText(e.target.value)
    dispatch(search(e.target.value))
  }

  const handleChangeStatus = e => {
    setStatusText(e.target.value)
    dispatch(status(e.target.value))
  }

  const handleChangePriorities = value => {
    dispatch(priorities(value))
  } 


  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search
          placeholder='Input search text'
          value={searchText}
          onChange={handleChangeSearch}
        />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={statusText} onChange={handleChangeStatus}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          onChange={handleChangePriorities}
        >
          <Select.Option value='High' label='High' >
            <Tag color='red'>High</Tag>
          </Select.Option>
          <Select.Option value='Medium' label='Medium'>
            <Tag color='blue'>Medium</Tag>
          </Select.Option>
          <Select.Option value='Low' label='Low'>
            <Tag color='gray'>Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  )
}
