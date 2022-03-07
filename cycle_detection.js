let graphComponentMatrix = [];
// Storage
for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
        row.push([]);
    }
    graphComponentMatrix.push(row)
}
// True denotes cyclic graph and vice-versa 
function isGraphCyclic(graphComponentMatrix) {
    let visited = [];
    let dfs_visited = [];


    for (let i = 0; i < rows; i++) {
        let visited_row = [];
        let dfs_visited_row = [];
        for (let j = 0; j < cols; j++) {
            visited_row.push(false);
            dfs_visited_row.push(false);
        }
        visited.push(visited_row)
        dfs_visited.push(dfs_visited_row)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] == false) {
                let response = dfs_cycleDetection(graphComponentMatrix, i, j, visited, dfs_visited);
                if (response == true)
                    return true;
            }
        }
    }
    return false;
}
// if(visited[i][j] == true -> indicates already visited path , no need to go again)
// if (visited[i][j] == true && dfs_visited[i][j] == true) -> cycle detected.
function dfs_cycleDetection(graphComponentMatrix, sr, sc, visited, dfs_visited) {
    visited[sr][sc] = true;
    dfs_visited[sr][sc] = true;
    for (let i = 0; i < graphComponentMatrix[sr][sc].length; i++) {
        let [crid, ccid] = graphComponentMatrix[sr][sc][i];
        if (visited[crid][ccid] === false) {
            let response = dfs_cycleDetection(graphComponentMatrix, crid, ccid, visited, dfs_visited)
            if (response === true) {
                return true; // Cycle detected
            }
        } else if (visited[crid][ccid] === true && dfs_visited[crid][ccid] === true) {
            //cycle detected.
            return true;
        }
    }
    dfs_visited[sr][sc] = false;
    return false;
}