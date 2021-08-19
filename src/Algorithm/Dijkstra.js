//https://www.npmjs.com/package/heap-js

import Heap from 'heap-js';
import {HEIGHT,WIDTH} from '../constants';

const customComparator = (a,b) => a.distance - b.distance

const itrRow = [-1,+1,0,0];
const itrCol = [0,0,+1,-1];


function isOutOfBound(r,c)
{
    return r<0 || r>HEIGHT || c<0 || c>WIDTH;
}

export function Dijkstra(grid,start,finish,height,WIDTH){

    
    if(!start || !finish || start === finish)
    {
        return false;
    }
   
    start.distance = 0;
    start.previous = null;
    
   
    const pq = new Heap(customComparator);//min heap 
    const pathInOrder = [];
    
    pq.init([start]);

    while(!pq.isEmpty())
    {
        const currNode = pq.pop();
        if(currNode.isWall) continue;

        pathInOrder.push(currNode)
       

        if(currNode === finish)
        {
            return pathInOrder;
        }
        const currRow = currNode.row;
        const currCol = currNode.col;
        
        const currDistance = currNode.distance;
        for(let i=0;i<4;i++)
        {
            const nextRow = currRow+itrRow[i];
            const nextCol = currCol+itrCol[i];
            if(!isOutOfBound(nextRow,nextCol) )
            {
               
                let altDis =  currDistance+1;
                if(altDis < grid[nextRow][nextCol].distance)
                {
                    grid[nextRow][nextCol].previous = currNode
                    grid[nextRow][nextCol].distance = altDis;
                    pq.push(grid[nextRow][nextCol]);
                    
                }
            }
        }

    }
    return pathInOrder;
}

export function getShortestPath(grid,finish)
{
    const shortestPath=[];
    while(finish!=null)
    {
        shortestPath.unshift(finish);
       // console.log(finish);
        finish = finish.previous;
        
    }
    return shortestPath
}
