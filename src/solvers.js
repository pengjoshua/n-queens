/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      if (j === i) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for (var i = 1; i <= n; i++) {
    solutionCount = solutionCount * i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutions = [];
  var queens = [];
  var conflicts = true;
  var solutionCount = 0;
  var queensMatrix = [];
  var board = new Board({n: n});

  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }

  var convertToMatrix = function(queensArray) {
    var newMatrix = [];
    for (var i = 0; i < queensArray.length; i++) {
      newMatrix.push(new Array(n).fill(0));

      for (var j = 0; j < newMatrix[i].length; j++) {
        if (j === queensArray[i]) {
          newMatrix[i][j] = 1;
        } 
      }
    }

    return newMatrix;
  };

  var placeQueen = function() {
    if (queens.length === n) {
      queensMatrix = convertToMatrix(queens);
      solutions.push(queensMatrix);
      solutionCount++;
    }

    for (var i = 0; i < n; i++) {
      conflicts = false;
      if (queens.indexOf(i) === -1) {
        queens.push(i);

        for (var j = 0; j < queens.length - 1; j++) {
          //Looking for diagonal conflicts
          if (Math.abs(queens[j] - i) === Math.abs(j - queens.indexOf(i))) {
            conflicts = true;
            break;
          }
          conflicts = false;
        }

        if (conflicts === false) {
          placeQueen();
        }
        queens.pop();
      }
    }
  };

  //invoking recursion
  placeQueen();
  var solution = solutions[0];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutions = [];
  var queens = [];
  var conflicts = true;
  var solutionCount = 0;
  var queensMatrix = [];
  var board = new Board({n: n});

  if (n === 2 || n === 3) {
    return 0;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  var convertToMatrix = function(queensArray) {
    var newMatrix = [];
    for (var i = 0; i < queensArray.length; i++) {
      newMatrix.push(new Array(n).fill(0));

      for (var j = 0; j < newMatrix[i].length; j++) {
        if (j === queensArray[i]) {
          newMatrix[i][j] = 1;
        } 
      }
    }

    return newMatrix;
  };

  var placeQueen = function() {
    if (queens.length === n) {
      queensMatrix = convertToMatrix(queens);
      solutions.push(queensMatrix);
      solutionCount++;
    }

    for (var i = 0; i < n; i++) {
      conflicts = false;
      if (queens.indexOf(i) === -1) {
        queens.push(i);

        for (var j = 0; j < queens.length - 1; j++) {
          //Looking for diagonal conflicts
          if (Math.abs(queens[j] - i) === Math.abs(j - queens.indexOf(i))) {
            conflicts = true;
            break;
          }
          conflicts = false;
        }

        if (conflicts === false) {
          placeQueen();
        }
        queens.pop();
      }
    }
  };

  //invoking recursion
  placeQueen();
  var solution = solutions[0];

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
