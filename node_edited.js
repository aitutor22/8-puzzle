function Node(layout) {
  //represent layout in a 2d array
  this.state = [];
  this.path = [];
  this.f = 0;

  if (!layout || layout.length !== 9) {
    throw new Error('Invalid initial configuration for Node passed');
  }

  this.state = layout;
};

//creates a copy of arr, with a and b counters swapped
function swap(arr, a, b) {
  var result = arr.slice();
  
  var temp = result[a];
  result[a] = result[b];
  result[b] = temp;

  return result;
}

Node.prototype.valueOf = function() {
  return this.f;
}

Node.prototype.generateSuccessors = function() {

  //find the index for the space, denoted by 0
  var spaceIndex = this.state.indexOf(0),
    resultingStates = [],
    temp;

  //check if space can swap with an element above it
  if (spaceIndex > 2) {
    // console.log('swap upwards');
    temp = new Node(swap(this.state, spaceIndex, spaceIndex - 3));
    temp.path = this.path.slice();
    temp.path.push('up')
    resultingStates.push(temp);
  }

  //check if space can swap with an element below it
  if (spaceIndex < 6) {
    // console.log('swap downwards');
    temp = new Node(swap(this.state, spaceIndex, spaceIndex + 3));
    temp.path = this.path.slice();
    temp.path.push('down')
    resultingStates.push(temp);
  }

  //check if space can swap with an element to the left of it
  if (spaceIndex % 3 > 0) {
    // console.log('swap leftwards');
    temp = new Node(swap(this.state, spaceIndex, spaceIndex - 1));
    temp.path = this.path.slice();
    temp.path.push('left')
    resultingStates.push(temp);
  }

  //check if space can swap with an element to the right of it
  if ((spaceIndex + 1) % 3 > 0) {
    // console.log('swap rightwards');
    temp = new Node(swap(this.state, spaceIndex, spaceIndex + 1));
    temp.path = this.path.slice();
    temp.path.push('right')
    resultingStates.push(temp);
  }

  return resultingStates;
};

Node.prototype.calculateManhattanDistance = function(goalNode) {
  var sum = 0;

  function calculateManhattanDistanceHelper(indexA, indexB) {
    var xDist = Math.abs((indexA % 3)  - (indexB % 3)),
      yDist = Math.abs(Math.floor(indexA / 3) - Math.floor(indexB / 3));

    return xDist + yDist;  
  }; //end calculateManhattanDistanceHelper

  for (var i = 0; i < this.state.length; i++) {
    //manhattan distance only for the 8 numbers, if it's a space (marked as 0), do not calculate
    if (this.state[i] === 0) continue;
    var indexInGoalState = goalNode.state.indexOf(this.state[i]);
    
    sum += calculateManhattanDistanceHelper(i, indexInGoalState);
  }

  return sum;
};