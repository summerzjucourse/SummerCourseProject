import React, { Component } from "react"
import * as d3 from "d3"

class Snapshots extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(props) {
    // this.color = ['#d9d9d9', 
    //     '#bdbdbd', 
    //     '#969696', 
    //     '#737373', 
    //     '#525252']
    const snapshotSVG = d3.select("#snapshot")
    const width = snapshotSVG.node().parentNode.clientWidth
    snapshotSVG.attr("width", width).attr("height", width)
    const strokeWidth = 2;
    snapshotSVG.append('rect')
      .attr('x', strokeWidth)
      .attr('y', strokeWidth + 1)
      .attr('width', width - 2 * strokeWidth)
      .attr('height', width - 1 - 2 * strokeWidth)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', strokeWidth)
    const defLiner = snapshotSVG.append('defs')
      .append('linearGradient')
      .attr('id', 'grad1')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%')
    // let colorMoodMap = {
    //     'BLUE': ['#f7fbff', '#4292c6'], 
    //     'RED': ['#fee0d2', '#ef3b2c'], 
    //     'PURPLE': ['#dadaeb', '#807dba'], 
    // }
    console.log("initcolor: ", this.props.colorMood)
    if (this.props.colorMood === 'BLUE') {
      defLiner.append('stop')
        .attr('class', 'startColor')
        .attr('offset', '0%')
        .attr('style', 'stop-color:' + '#f7fbff' + ';stop-opacity:1')
      defLiner.append('stop')
        .attr('class', 'endColor')
        .attr('offset', '100%')
        .attr('style', 'stop-color:' + '#4292c6' + ';stop-opacity:1')
    } else if (this.props.colorMood === 'RED') {
      defLiner.append('stop')
        .attr('class', 'startColor')
        .attr('offset', '0%')
        .attr('style', 'stop-color:' + '#fee0d2' + ';stop-opacity:1')
      defLiner.append('stop')
        .attr('class', 'endColor')
        .attr('offset', '100%')
        .attr('style', 'stop-color:' + '#ef3b2c' + ';stop-opacity:1')
    } else {
      defLiner.append('stop')
        .attr('class', 'startColor')
        .attr('offset', '0%')
        .attr('style', 'stop-color:' + '#dadaeb' + ';stop-opacity:1')
      defLiner.append('stop')
        .attr('class', 'endColor')
        .attr('offset', '100%')
        .attr('style', 'stop-color:' + '#807dba' + ';stop-opacity:1')
    }
    const rectWidth = 100;
    snapshotSVG.append('rect')
      .attr('className', 'colorTap')
      .attr('width', rectWidth)
      .attr('height', 10)
      .attr('x', width - rectWidth - 10)
      .attr('y', strokeWidth + 1 + 10)
      .attr('fill', 'url(#grad1)')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    snapshotSVG.append('text')
      .attr('x', width - rectWidth - 10)
      .attr('y', strokeWidth + 1 + 30)
      .attr('style', 'text-anchor: start')
      .text('early')
      .attr('font-size', 10)
    snapshotSVG.append('text')
      .attr('x', width - 10)
      .attr('y', strokeWidth + 1 + 30)
      .attr('style', 'text-anchor: end')
      .text('late')
      .attr('font-size', 10)

  }

  componentWillReceiveProps(props) {
    // console.log(props.snapshots)
    const snapshots = props.snapshots
    const onClick = props.onClick
    const snapshotSVG = d3.select("#snapshot")

    const defLiner = snapshotSVG.select('defs')
      .select('#grad1')
    // console.log(defLiner.select('.startColor'))
    if (props.colorMood === 'BLUE') {
      defLiner.select('.startColor')
        .attr('style', 'stop-color:' + '#f7fbff' + ';stop-opacity:1')
      defLiner.select('.endColor')
        .attr('style', 'stop-color:' + '#4292c6' + ';stop-opacity:1')
    } else if (props.colorMood === 'RED') {
      defLiner.select('.startColor')
        .attr('style', 'stop-color:' + '#fee0d2' + ';stop-opacity:1')
      defLiner.select('.endColor')
        .attr('style', 'stop-color:' + '#ef3b2c' + ';stop-opacity:1')
    } else {
      defLiner.select('.startColor')
        .attr('style', 'stop-color:' + '#dadaeb' + ';stop-opacity:1')
      defLiner.select('.endColor')
        .attr('style', 'stop-color:' + '#807dba' + ';stop-opacity:1')
    }
    snapshotSVG.select('.colorTap')
      .attr('fill', 'url(#grad1)')

    const padding = 100
    const width = snapshotSVG.node().parentNode.clientWidth
    snapshotSVG.attr("width", width).attr("height", width)
    const max = {}
    const min = {}
    max.x = d3.max(snapshots, snpst => snpst.vector[0])
    max.y = d3.max(snapshots, snpst => snpst.vector[1])
    min.x = d3.min(snapshots, snpst => snpst.vector[0])
    min.y = d3.min(snapshots, snpst => snpst.vector[1])
    const xScale = d3
      .scaleLinear()
      .domain([min.x, max.x])
      .range([padding, width - padding])
    const yScale = d3
      .scaleLinear()
      .domain([min.y, max.y])
      .range([padding, width - padding])

    const snapshotLinkData = []
    for (let i = 0; i < snapshots.length - 1; i++) {
      snapshotLinkData.push([
        snapshots[i].vector,
        snapshots[i + 1].vector
      ])
    }
    const snapshotLink = snapshotSVG
      .selectAll("line")
      .data(snapshotLinkData, (d, i) => i)
    // console.log('enter: ', snapshotLink.enter())
    // console.log('exit: ', snapshotLink.exit())
    snapshotLink.exit().remove()
    snapshotLink
      .enter()
      .append("line")
      .attr("stroke", "#d9dde2")
      .attr("stroke-width", 2)
    snapshotSVG.selectAll("line")
      .attr("x1", d => xScale(d[0][0]))
      .attr("x2", d => xScale(d[1][0]))
      .attr("y1", d => yScale(d[0][1]))
      .attr("y2", d => yScale(d[1][1]))

    const pointsData = snapshots.map(snpst => snpst.vector)
    // const colorMoodMap = {
    //     'BLUE': ['#f7fbff', '#4292c6'], 
    //     'RED': ['#fee0d2', '#ef3b2c'], 
    //     'PURPLE': ['#dadaeb', '#807dba']
    // }
    // 
    // const colorMap = 0;
    if (props.colorMood === 'BLUE') {
      var colorMap = d3.interpolateRgb(
        d3.rgb("#f7fbff"),
        d3.rgb("#4292c6")
      )
    } else if (props.colorMood === 'RED') {
      var colorMap = d3.interpolateRgb(
        d3.rgb("#fee0d2"),
        d3.rgb("#ef3b2c")
      )
    } else {
      var colorMap = d3.interpolateRgb(
        d3.rgb("#dadaeb"),
        d3.rgb("#807dba")
      )
    }
    // const colorMap = d3.interpolateRgb(
    //     d3.rgb('#f7fbff'), 
    //     d3.rgb('#4292c6')
    // )
    // console.log("color: ", colorMap);

    let count = 0
    let thispoint
    let prevpoint

    const points = snapshotSVG.selectAll("circle").data(pointsData, (d, i) => i)
    points.exit().remove()
    points
      .enter()
      .append("circle")

      .attr("r", 4)
      // .attr("fill", (d, i) => this.color[ Math.floor(parseInt(i) * this.color.length / parseInt(pointsLength)) ])

      .attr("stroke", "#6e6e6e")
      .attr("stroke-width", 0.5)
      .on("click", function (d, i) {
        //  console.log(d, i)
        onClick(i);
        count++
        if (count === 1) {
          thispoint = d3.select(this)
          thispoint.attr("stroke", "#db3030")
            .attr("stroke-width", 2)
        }
        else {
          prevpoint = thispoint
          prevpoint.attr("stroke", "#6e6e6e")
            .attr("stroke-width", 0.5)
          thispoint = d3.select(this)
          thispoint.attr("stroke", "#db3030")
            .attr("stroke-width", 2)
        }
      })
    snapshotSVG.selectAll("circle")
      .attr("fill", (d) => { return colorMap(d[0] / 30) })
    snapshotSVG.selectAll("circle")
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
  }
  render() {
    return <svg id="snapshot" />
  }
}

export default Snapshots
