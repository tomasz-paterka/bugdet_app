var budgetController = (function() {
  var add = function(a,b) {
    return a + b;
  }

  return {
    publicTest: function(a,b) {
      console.log(add(a,b));
    }
  }

})();