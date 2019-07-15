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
    }

    componentWillReceiveProps(props) {
        const snapshots = props.snapshots
        const onClick = props.onClick
        const snapshotSVG = d3.select("#snapshot")
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
            .data(snapshotLinkData)
        snapshotLink.exit().remove()
        snapshotLink
            .enter()
            .append("line")
            .attr("x1", d => xScale(d[0][0]))
            .attr("x2", d => xScale(d[1][0]))
            .attr("y1", d => yScale(d[0][1]))
            .attr("y2", d => yScale(d[1][1]))
            .attr("stroke", "#d9dde2")
            .attr("stroke-width", 2)

        const pointsData = snapshots.map(snpst => snpst.vector)
        // // console.log('pointsData = ', pointsData);
        // const pointsLength = pointsData.length;
        // // console.log('pointsLength = ', pointsLength);

        const colorMap = d3.interpolateRgb(
            d3.rgb("#f7fbff"),
            d3.rgb("#4292c6")
        )

        let count = 0
        let thispoint
        let prevpoint

        const points = snapshotSVG.selectAll("circle").data(pointsData)
        points.exit().remove()
        points
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 4)
            // .attr("fill", (d, i) => this.color[ Math.floor(parseInt(i) * this.color.length / parseInt(pointsLength)) ])
            .attr("fill", (d)=> {return colorMap(d[0]/30)})
            .attr("stroke", "#6e6e6e")
            .attr("stroke-width", 0.5)
            .on("click", function(d, i) {
                //  console.log(d, i)
                onClick(i);
                count++
                if (count === 1) {
                    thispoint = d3.select(this)
                    thispoint.attr("stroke", "#db3030")
                             .attr("stroke-width", 2)
                }
                else
                {
                    prevpoint = thispoint
                    prevpoint.attr("stroke", "#d9dde2")
                    thispoint = d3.select(this)
                    thispoint.attr("stroke", "#db3030")
                             .attr("stroke-width", 2)
                }
            })
    }
    render() {
        return <svg id="snapshot" />
    }
}

export default Snapshots
