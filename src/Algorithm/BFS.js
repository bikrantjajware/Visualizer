import {HEIGHT,WIDTH} from '../constants';
const itrRow = [-1,+1,0,0];
const itrCol = [0,0,+1,-1];


function isOutOfBound(r,c)
{
    return r<0 || r>HEIGHT || c<0 || c>WIDTH;
}


export function BFS(grid,start,finish,height,WIDTH){

    if(start === finish)
        return [];
    const queue = [];
    
    const visitedPath = [];
    const finalnode = grid[finish.row][finish.col];
    queue.push(start);
    while(queue.length!==0)
    {
        const current = queue.shift();
        if(current === finalnode )
        {
            break;
        }
        current.isVisited=true;
        
        visitedPath.push(current);
        for(let i=0;i<4;i++)
        {
            
            const nextRow = current.row + itrRow[i];
            const nextCol = current.col + itrCol[i];
            if(!isOutOfBound(nextRow,nextCol) &&  grid[nextRow][nextCol].isVisited !==true )
            {

                const nextNode = grid[nextRow][nextCol];
                nextNode.isVisited = true
                queue.push(nextNode);
            }
        }

    }
    console.log(visitedPath);
    return visitedPath;
}