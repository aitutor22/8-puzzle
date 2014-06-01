function NodeList(searchType, initialLayout, goalLayout) {
  if (goalLayout) this.goalNode = new Node(goalLayout);

  //for bfs, we use a queue to model the frontier (FIFO)
  if (searchType === 'bfs') {
    this.strategy = new BfsStrategy(new Node(initialLayout));
  } else {
    this.strategy = new AStarStrategy(new Node(initialLayout), this.goalNode);
  }
  
  this.counter = 0;
  console.log(this.solve());
}


function BfsStrategy(initialNode) {
  var explored = [],
    frontier = [];

  frontier.push(initialNode);

  return {
    frontierEmpty: function() {
      return frontier.length === 0;
    },
    findsNextNode: function() {
      //takes the node first into the queue, removes it from frontier, and adds it to explored
      var nextNode = frontier.shift();
      explored.push(nextNode);
      return nextNode;
    },
    addToFrontier: function(node) {
      frontier.push(node);
    },
    getExplored: function() {
      return explored;
    }
  }
};

function AStarStrategy(initialNode, goalNode) {
  var explored = [],
    frontier = new Heap();

  initialNode.h = initialNode.calculateManhattanDistance(goalNode);
  initialNode.g = 0;
  frontier.insert(initialNode);

  return {
    frontierEmpty: function() {
      return frontier.items.length === 0;
    },
    findsNextNode: function() {
      //takes the node first into the queue, removes it from frontier, and adds it to explored
      var nextNode = frontier.remove();
      explored.push(nextNode);
      return nextNode;
    },
    addToFrontier: function(node, prevNode) {
      node.h = node.calculateManhattanDistance(goalNode);
      node.g = prevNode.g + 1;
      //we want to find the smallest f, so we use negative
      node.f = -1 * (node.g + node.h);
      frontier.insert(node);
    },
    getExplored: function() {
      return explored;
    }
  }
};

NodeList.prototype.solve = function() {
  while (!this.strategy.frontierEmpty() & this.counter < 20000) {
    console.log('running')
    var nextNode = this.strategy.findsNextNode();

    // console.log(nextNode)
    var result = this.generateAndCheckSuccessors(nextNode);

    if (result) {
      console.log('result found');
      break;
    }
    this.counter++
  }

  if (!result) {
    console.log('Unable to find solution within 20k iterations... perhaps you should try a smarter algorithm')
  }

  return result;
}

NodeList.prototype.generateAndCheckSuccessors = function(node) {

  if (this.compareNodes(node, this.goalNode)) {
    console.log('Reached goal');
    return node;
  }

  var potentialSuccessors = node.generateSuccessors(),
    that = this;

  _.each(potentialSuccessors, function(potentialNode) {
    //if it has not been explored, add to frontier
    if (!that.alreadyExplored(potentialNode)) {
      that.strategy.addToFrontier(potentialNode, node);
    };
  });
}

//returns true if already explored
NodeList.prototype.alreadyExplored = function(node) {
  var explored = this.strategy.getExplored();
  for (var i = 0; i < explored.length; i++) {
    if (this.compareNodes(explored[i], node)) {
      return true;
    }
  };
  return false;
};

//return true if both nodes contain the same state, otherwise return false
NodeList.prototype.compareNodes = function(nodeA, nodeB) {
  var stateA = nodeA.state,
    stateB = nodeB.state;

  //checks that length of the both states are the same
  if (stateA.length !== stateB.length) return false;

  for (var i = 0; i < stateA.length; i++) {  
    if (stateA[i] !== stateB[i]) return false;
  };
  return true;
};

