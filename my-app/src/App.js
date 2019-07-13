import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import './App.css'
import { Col, Row } from "antd"
import Snapshots from './snapshots'
import Graph from './graph'

let keyword;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      snapshots: [],
      graph: {}
    }
  }

  handleClick(i) {
    const snapshots = this.state.snapshots
    keyword = i;
    
    this.setState({
      snapshots: snapshots, 
      graph: snapshots[i].graph
    })
  }

  componentDidMount() {
    d3.json('./test_data.json').then(snapshots => {
      this.setState({
        snapshots: snapshots, 
        graph: snapshots[0].graph
      })
    })
  }

  render() {
    const snapshots = this.state.snapshots
    const graph = this.state.graph

    return (
      <div className="App">
        <Row>
          <Col span={12}>
            <Snapshots 
              snapshots={snapshots} 
              onClick={i => this.handleClick(i)}
            />
          </Col>
          <Col span={12}>
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

