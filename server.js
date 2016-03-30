// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
   var searchTodo = req.query.q;
   var matchedTodos = [];
   todos.forEach(function compare(thisTodo) {
     if(searchTodo === thisTodo.task) {
       matchedTodos.push(thisTodo);
     }
   });
   res.send({todos:matchedTodos});
 });

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos:todos});
});

app.post('/api/todos', function create(req, res) {
   /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  var id = todos.length + 1;
  var task = req.body.task;
  var desc = req.body.description;
  var newTask = { _id: id, task: task, description: desc };
  todos.push(newTask);
  res.json(newTask);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = parseInt(req.params.id);
   console.log(typeof id);
   var foundTodo;
   todos.forEach(function (thisTodo) {
     if (thisTodo._id === id) {
       foundTodo = thisTodo;
     }
   });
   res.json(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  // get todo id from url params (`req.params`)
  var id = parseInt(req.params.id);

  // find todo to update by its id
  var todoToUpdate;
  todos.forEach(function (thisTodo) {
    if (thisTodo._id === id) {
      todoToUpdate = thisTodo;
    }
  });

  // update the todo's task
  todoToUpdate.task = req.body.task;

  // update the todo's description
  todoToUpdate.description = req.body.description;

  // send back updated todo
  res.json(todoToUpdate);
});




app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var id = parseInt(req.params.id);
   var todoToDelete;
   todos.forEach(function (thisTodo) {
     if (thisTodo._id === id) {
       todoToDelete = thisTodo;
     }
   });
   res.send(todoToDelete);
   todos.splice(todos.indexOf(todoToDelete), 1);


});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
