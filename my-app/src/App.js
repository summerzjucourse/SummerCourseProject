import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import './App.css'
import { Col, Row } from "antd"
import Snapshots from './snapshots'
import Graph from './graph'
import Degree from './degree'

let keyword;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      snapshots: [],
      graph: {}, 
      degree: {}
    }
  }

  handleClick(i) {
    const snapshots = this.state.snapshots
    keyword = i;
    
    this.setState({
      snapshots: snapshots, 
      graph: snapshots[i].graph, 
      degree: snapshots[i].degree
    })
  }

  componentDidMount() {
    d3.json('./data.json').then(snapshots => {
      this.setState({
        snapshots: snapshots, 
        graph: snapshots[0].graph, 
        degree: snapshots[0].degree
      })
    })
  }

  render() {
    const snapshots = this.state.snapshots
    const graph = this.state.graph
    const degree = this.state.degree

    return (
      <div className="App">
        <Row>
          <Col span={4}>
            <Degree degree={degree}/>
          </Col>
          <Col span={10}>
            <Snapshots 
              snapshots={snapshots} 
              onClick={i => this.handleClick(i)}
            />
          </Col>
          <Col span={10}>
            <Graph graph={graph} />
          </Col>
        </Row>
      </div>
    )
  }

}

// ReactDOM.render(
//   <App />, 
//   document.getElementById('root')
// )

export default App

