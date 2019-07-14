import React, { Component } from "react"
import * as d3 from "d3"

class Graph extends React.Component {
    componentDidMount() {
        this.colo = {}
        d3.json('./class.json').then(id => {
            for (var key in id) {
            if (id[key] == 'MP*1') {
                this.colo[key] = '#1b9e77'
            } else if (id[key] == 'PC*') {
                this.colo[key] = '#d95f02'
            } else if (id[key] == 'PC') {
                this.colo[key] = '#7570b3'
            } else if (id[key] == 'PSI*') {
                this.colo[key] = '#e7298a'
            } else {
                this.colo[key] = '#66a61e'
            }}
        })
    }

    componentWillReceiveProps(props) {
        // console.log('graph componentwillreceiveprops')
        const graph = props.graph
        const graphSVG = d3.select("#graph")
        const padding = 100
        const width = graphSVG.node().parentNode.clientWidth
        graphSVG.attr("width", width).attr("height", width)
        const simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3.forceLink().id(function(d) {
                    return d.id
                })
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, width / 2))

        simulation.nodes(graph.nodes).on("tick", ticked)
        console.log(graph)
        simulation.force("link").links(graph.links)
        const link = graphSVG
            .select(".links")
            .selectAll("line")
            .data(graph.links, (link) => link.id)
        link.exit().remove()
        link.enter()
            .append("line")
            .attr("stroke", "#828282")
            .attr("stroke-width", (link) => Math.sqrt(link.weight))
        
        const node = graphSVG
            .select(".nodes")
            .selectAll("circle")
            .data(graph.nodes, (node) => node.id)
        node.exit().remove()
        node.enter()
            .append("circle")
            .attr("r", 3)
            .attr("fill", (node) => this.colo[node.id])
        function ticked() {
            let max = {}
            let min = {}
            max.x = d3.max(graph.nodes, n => n.x)
            max.y = d3.max(graph.nodes, n => n.y)
            min.x = d3.min(graph.nodes, n => n.x)
            min.y = d3.min(graph.nodes, n => n.y)
            const xScale = d3
                .scaleLinear()
                .domain([min.x, max.x])
                .range([padding, width - padding])
            const yScale = d3
                .scaleLinear()
                .domain([min.y, max.y])
                .range([padding, width - padding])
            graphSVG.selectAll("line").attr("x1", function(d) {
                return xScale(d.source.x)
            })
                .attr("y1", function(d) {
                    return yScale(d.source.y)
                })
                .attr("x2", function(d) {
                    return xScale(d.target.x)
                })
                .attr("y2", function(d) {
                    return yScale(d.target.y)
                })
            graphSVG.selectAll("circle").attr("cx", function(d) {
                return xScale(d.x)
            }).attr("cy", function(d) {
                return yScale(d.y)
            })
        }
    }
    render() {
        return (
            <svg id="graph">
                <g className="links"></g>
                <g className="nodes"></g>
            </svg>
        )
    }
}

export default Graph
