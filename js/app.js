var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on type 'inc' or 'exp'
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into data structure
      data.allItems[type].push(newItem);

      // Return new item
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };

})();


var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // console.log(fields);

      // var fieldsArr = Array.prototype.slice.call(fields);

      // fieldsArr.forEach(function(curr) {
      //   curr.value = '';
      // });

      // fieldsArr[0].focus();

      fields.forEach(function(curr) {
        curr.value = '';
      });

      fields[0].focus();
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();


var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      } 
    });
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // Get input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add item to UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fields
      UICtrl.clearFields();
    };
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();


