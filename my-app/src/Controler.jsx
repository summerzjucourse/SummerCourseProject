import React, { Component } from "react"
import * as d3 from "d3"
import { Button, Radio, Icon } from 'antd';

class Controler extends React.Component {
	state = {
		size: 'large',
	};

	handleSizeChange = e => {
		this.setState({ size: e.target.value });
	};

	render() {
		const { size } = this.state;
		const changeDataMoodPCA = this.props.changeDataMoodPCA
		const changeDataMoodTSNE = this.props.changeDataMoodTSNE
		const changeColorMoodBLUE = this.props.changeColorMoodBLUE
		const changeColorMoodRED = this.props.changeColorMoodRED
		const changeColorMoodPURPLE = this.props.changeColorMoodPURPLE

		return (
			<div>
				<h3>数据降维算法</h3>
				<Radio.Group value={size} onChange={this.handleSizeChange}>
					<Radio.Button value="PCA" onClick={changeDataMoodPCA}>PCA</Radio.Button>
					{/* <Radio.Button value="PCA" onClick={() => {console.log('aaa')}}>PCA</Radio.Button> */}
				  <Radio.Button value="t-SNE" onClick={changeDataMoodTSNE}>t-SNE</Radio.Button>
				</Radio.Group>

				<h3>Snapshots配色方案</h3>
				<Radio.Group value={size} onChange={this.handleSizeChange}>
					<Radio.Button value="blue" onClick={changeColorMoodBLUE}>蓝色</Radio.Button>
					<Radio.Button value="red" onClick={changeColorMoodRED}>红色</Radio.Button>
					<Radio.Button value="purple" onClick={changeColorMoodPURPLE}>紫色</Radio.Button>
				</Radio.Group>


			</div>
		);
	}
}

export default Controler