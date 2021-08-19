import {HEIGHT,WIDTH} from '../constants';
const itrRow = [-1,+1,0,0];
const itrCol = [0,0,+1,-1];


function isOutOfBound(r,c)
{
    return r<0 || r>HEIGHT || c<0 || c>WIDTH;
}


export function DFS(grid,start,finish){

    if(start === finish)
        return [];
  const visitedPath = [];
    DFSHelper(grid,start,finish,visitedPath);
    return visitedPath;
}

function DFSHelper ( grid,start,finish,visitedPath)
{
    if(start === finish || start.isVisited === true)
        return true;

        start.isVisited=true;
        visitedPath.push(start);
        for(let i=3;i>=0;i--)
        {
            
            const nextRow = start.row + itrRow[i];
            const nextCol = start.col + itrCol[i];
            if(!isOutOfBound(nextRow,nextCol) &&  grid[nextRow][nextCol].isVisited !==true )
            {

                const nextNode = grid[nextRow][nextCol];
                const findfinal = DFSHelper(grid,nextNode,finish,visitedPath);
                if(findfinal===true)
                {
                    return true;
                }
            }
        }

}