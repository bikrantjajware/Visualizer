import { Component } from "react";
import './node.css';

class Node extends Component{

  


    render()
    {
      
        

        var nodeClass = "Node ";
        
        if(this.props.isStart)
        {
          nodeClass = nodeClass + "Start ";
        }
        else if(this.props.isFinish)
        {
          nodeClass = nodeClass + "Finish ";
        }
        if(this.props.isWall)
          {nodeClass = nodeClass+ "Wall "; }
      
        
          const row = this.props.row;
          const col = this.props.col;
        return  ( <div 

        className={nodeClass}  id = {`node ${row}-${col}`}
        onMouseDown = { () => this.props.onMouseDown(row,col)}
        onMouseEnter = { () => this.props.onMouseEnter(row,col) }
        onMouseUp = {() => this.props.onMouseUp(row,col) }
        
        ></div>);
    }
}



export default Node;