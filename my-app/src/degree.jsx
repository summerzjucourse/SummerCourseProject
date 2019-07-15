import React, { Component } from "react"
import * as d3 from "d3"

class Degree extends React.Component {
    componentWillReceiveProps(props) {
        const degree = props.degree
        const countDegree = []
        const dataset = []
        for(let i = 0; i < 100000; ++i) {
            countDegree[i] = 0;
        }
        for (let i in degree) {
            const element = degree[i];
            countDegree[element] = countDegree[element] + 1;
            // console.log(countDegree[element])
        }

        for(let i in countDegree) {
            if(countDegree[i] != 0) {
                // console.log(countDegree[i])
                dataset.push([parseInt(i), countDegree[i]])
            }
        }

        // console.log(dataset);

        const maxy = d3.max(dataset, d => d[1])
        const miny = d3.min(dataset, d => d[1])
        const minx = d3.min(dataset, d => d[0])
        const maxx = d3.max(dataset, d => d[0])
        const degreeSVG = d3.select('#degree')
        const width = degreeSVG.node().parentNode.clientWidth
        const height = degreeSVG.node().parentNode.clientWidth
        const padding = { top: width / 12, right: width / 12, bottom: width / 12, left: width / 8 };

        const xScale = d3.scaleLinear()
              .domain([0, maxx])
              .range([0, width - padding.left - padding.right]);
        // console.log(maxx)
        const yScale = d3.scaleLinear()
              .domain([0, maxy])
              .range([height - padding.top - padding.bottom, 0]);

        // const formatPercent = d3.format("0f");
        
        degreeSVG.attr('width', width)
            .attr('height', height);
        const xAxis = d3.axisBottom().ticks(maxx).tickFormat(d3.format(".0d"))
                    .scale(xScale);
        const yAxis = d3.axisLeft().ticks(maxy / 5).tickFormat(d3.format(".0d"))
                    .scale(yScale);

        degreeSVG.select('.axisx')
        .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
        .call(xAxis);
        degreeSVG.select('.axisy')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis);

        var linePath = d3.line()
                .x(function(d){ return xScale(d[0]) })
                .y(function(d){ return yScale(d[1]) });

        degreeSVG.select('.lpath')
            .select('.line-path')
            .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
            .attr('d', linePath(dataset))
            .attr('fill', 'none')
            .attr('stroke-width', 3)
            .attr('stroke', 'green');
        const cir = degreeSVG.select('.gcircle')
            .selectAll('circle')
            .data(dataset, (circle) => circle.id)
            .attr('transform', function(d){
                return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
            })
        cir.exit().remove()
        cir.enter()
            .append('circle')
            .attr('r', 5)
            .attr('transform', function(d){
                return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
            })
            .attr('fill', 'green');
    }

    render() {
        return (
            <svg id="degree" >
                <g className="axisx"></g>
                <g className="axisy"></g>
                <g className="lpath">
                    <path className="line-path"></path>
                </g>
                <g className="gcircle">

                </g>
            </svg>
        )
    }
}

export default Degree