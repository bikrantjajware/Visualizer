import { Component } from "react";
import Node from './Node/node';
import './PathFindingVisualiser.css';
import {Dijkstra,getShortestPath} from './Algorithm/Dijkstra';
import {HEIGHT,WIDTH,START_ROW,START_COL,END_ROW,END_COL} from './constants';

console.log(`${HEIGHT},${WIDTH}`);





class PathFindingVisualiser extends Component {

    state = {
        nodes : [],
        mouseIsPressed:false
    }
    getNodesList = () => {
        const node_list = [];
        for(let row=0;row<=HEIGHT;row++)
        {
            
            const currentRow = [];
            for(let col = 0 ;col<=WIDTH;col++)
            {
                const node = {
                    row,
                    col,  
                    isStart : row === START_ROW && col === START_COL,
                    isFinish : row === END_ROW && col === END_COL,
                    distance: Infinity,
                    isVisited: false,
                    isShortestPath : false,
                    isWall: false,
                    isFront: false,
                };
                currentRow.push(node);
                
            }
            node_list.push(currentRow);
        }
        return node_list;
    }
    componentDidMount()
    {
        
        const node_list = this.getNodesList();
        // const newNodes = 
        this.setState({nodes:node_list});
        
    }
    animateDijkstra(visitedPath,shortestPath)
    {
        
        for(let i=0;i<visitedPath.length;i++)
        {
           
            setTimeout( ()=> {
                if(i===visitedPath.length-1)
                {
                    this.animateShortestPath(shortestPath);
                }
                const node = visitedPath[i];
                const visNode = document.getElementById(`node ${node.row}-${node.col}`);
                visNode.className += visNode.isStart ? " Start": "";
                visNode.className += visNode.isFinish ? " Finish": "";
                visNode.className += " Visited";
                visNode.className += " Front";
                
                if(i>0)
                {
                    const prev_node = visitedPath[i-1];
                    const prev_visNode = document.getElementById(`node ${prev_node.row}-${prev_node.col}`);
                    prev_visNode.className = "Node Visited";
                }
            },20*i)
            
        }
        
        
    }
    animateShortestPath = (shortestPath) => {
        
        for(let i=0;i<shortestPath.length;i++)
        {
            setTimeout( ()=> {
                const node = shortestPath[i];
                const shortestPathNode = document.getElementById(`node ${node.row}-${node.col}`);
                
                shortestPathNode.className="Node Short";
                console.log(shortestPathNode);

            },20*i);
        }
    }

    visualiseDijkstra = () => {

        const grid = this.state.nodes;
        const start = grid[START_ROW][START_COL];
        const finish = grid[END_ROW][END_COL];
        const visitedPath = Dijkstra(grid,start,finish);
        const shortestPath = getShortestPath(grid,finish);
        
        if(!!visitedPath)
        {
            visitedPath.forEach( e => e.isVisited=false);
            this.animateDijkstra(visitedPath,shortestPath);
           
        }
    }
    mouseDownHandler  = (row,col) => {
        const newNodes = getNewGrid(this.state.nodes,row,col);
        this.setState({nodes:newNodes,mouseIsPressed:true});
        console.log("down");
    }

    mouseEnterHandler = (row,col) => {
        if(!this.state.mouseIsPressed) return;
        const newNodes = getNewGrid(this.state.nodes,row,col);
        this.setState({nodes:newNodes});
        console.log("enter");
    }

    mouseUpHandler = (row,col) => {
        this.setState({mouseIsPressed:false});
        console.log("up");
    }
    clear = () => {
        const node_list = this.getNodesList();
        this.setState({
            nodes : node_list,
            mouseIsPressed:false
        })
    }
    render()
    {
        const nodes = this.state.nodes;
        // console.log(nodes);

     

        return <div className="grid">
            
            <button className="Visualise" onClick={this.visualiseDijkstra}>Visualise</button><br/>
            <button className="clear" onClick={this.clear}>Clear</button>
            {
                nodes.map( (row,rowIdx) => {
                    return <div className="nodes" key={rowIdx}> 
                        {row.map( (node,nodeIdx) => 
                        <Node 
                        key={nodeIdx}
                        row={node.row}
                        col={node.col}
                        isStart={node.isStart}
                        isFinish = {node.isFinish}
                        isWall = {node.isWall}
                        onMouseDown = {this.mouseDownHandler}
                        onMouseEnter = {this.mouseEnterHandler}
                        onMouseUp = {this.mouseUpHandler}
                        ></Node>)}
                    </div>
                })
            } 
        </div>
    }
}

function getNewGrid (nodes,row,col) {
    const newNodes = nodes.slice()
    const node = nodes[row][col];
    const newNode = {
        ...node,
        isWall : !node.isWall
    }
    newNodes[row][col]=newNode;
    return newNodes;
}

export default PathFindingVisualiser;