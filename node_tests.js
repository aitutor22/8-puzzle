// //testing compareNode function
// var nodeList = new NodeList();
// console.log(nodeList.compareNodes(new Node([1, 2, 3, 4, 5, 6, 7, 8, 0]), new Node([1, 2, 3, 4, 5, 6, 7, 8, 0])));
// console.log(!nodeList.compareNodes(new Node([1, 2, 3, 4, 5, 6, 7, 8, 0]), new Node([1, 2, 3, 4, 5, 2, 7, 8, 0])));

// // //testing constructor
// var nodeList2 = new NodeList('bfs', [1, 2, 3, 4, 5, 6, 7, 8, 0], [1, 2, 6, 4, 5, 3, 7, 8, 0]);
// console.log(nodeList2.searchType === 'bfs');
// console.log(nodeList2.compareNodes(nodeList2.goalNode, new Node([1, 2, 6, 4, 5, 3, 7, 8, 0])));

// console.log(new Node([1, 2, 3, 4, 5, 6, 7, 8, 0]).generateSuccessors());

// var nodeList3 = new NodeList('bfs', [6, 1, 3, 8, 0, 4, 5, 2, 7], [1, 2, 3, 4, 5, 6, 7, 8, 0]);

//easy
// var easy = new NodeList('astar', [1, 3, 4, 8, 6, 2, 7, 0, 5], [1, 2, 3, 8, 0, 4, 7, 6, 5]);

//hard
// var hard = new NodeList('bfs', [2, 8, 1, 4, 6, 3, 0, 7, 5], [1, 2, 3, 8, 0, 4, 7, 6, 5]);

//worst
// var worst = new NodeList('astar', [5, 6, 7, 4, 0, 8, 3, 2, 1], [1, 2, 3, 8, 0, 4, 7, 6, 5]);
var worst2 = new NodeList('astar', [7, 1, 0, 6, 5, 8, 4, 2, 3], [1, 2, 3, 4, 5, 6, 7, 8, 0]);