# My TODO List with MongoDB, Express, Angular and Node

The MEANTodo list attempts to introduce the audience to the use of MongoDB in the context of a 
Resource-Oriented Architecture (ROA) application. The main objective is to use MongoDB as a document 
database where TODOs are stored and managed via CRUD operations through a REST service built using Node.js 
and Express. This presentation will also introduce the audience to Mongoose, an ODM which provides 
MongoDB base systems with an abstraction layer used to build a data model through a schema and schema 
validation for data consistency.

## This is MEAN baby!
This TODO implementation is a learning tool to illustrate some MongoDB with Mongoose features.  The project 
will be used as discussion reference at a meeting organized by the Vancouver, British Columbia, Canada, MongoDB 
User Group (VanMUG).  This README contains some of the highlights of the project and presentation.

### Mongoose
One of the advantages of a JSON document style data store such as MongoDB, besides its scalability and sharding 
which makes it so convenient for big data, is the fact that MongoDB is a schemaless.  This allows the storage of 
documents with different sets of fields, with different types for these fields.  This might be convenient for must scenarios
providing great flexibility because the documents managed by this database become very dynamic in its nature.  However, MongoDB does provide some structure.  For example the system namespace contains an explicit list of our collections and indexes.

This great freedom comes with great responsibility and in the case that a business case calls for the need of a structured model which needs to meet certain validation rules and criteria then our solution needs to come up with a set of metadata rules to describe and validate the data.  It would be convenient if we could use in our solution the help of a framework to help us add schema and data validation so we could concentrate on our business solution.

Such help comes from Mongoose.  Mongoose provides a straight-forward, schema-based solution to model our application data. It includes built-in type casting, built-in and custom validation, query building, etc.

In this project Mongoose is used to provide a Todo schema model, data validation, custom-data validation.  There are other ways to validate data by subscribing to Mongoose pre-save events but this technique is not used in this project

### Mongoose Events
The server code registers for three Mongoose events.  These events are "connected", "error", and "disconnected".  Handlers of these event listeners notify connected users using socket.io for the client to react accordingly.  Here is the summary:

| Event          | Handler                                          |
|---------------|------------------------------------------------|
| 'error' | console log the error and socket.io emit a JSON message with dbConnection set to false  |
| 'connected'        | console log satisfactory connection and emit a JSON message with dbConnection set to true  |
| 'disconnected'        | console log error and emit JSON message with dbConnection set to false |

### Express REST
En Express route handles all REST requests. Controller functions are responsible of the especific work.  This is the summary:

| Route | Verb | Controller Action |
|-------|------|-------------------|
| route('/') | post | todoController.post  to creates a new Todo |
|            | get | todoController.get  gets all TODOs |
| route('/:todoId') | put | todoController.update currently the only update setting completed to true  |
|                |  delete | todoController.remove |
| route('/purge') | get | todoController.purge to removed all TODOs which are completed |

### todoController Mongoose Usage
This module exports the controller which returns an object with five properties which are the five operations that the controller is responsible for.  This is the summary of Mongoose calls on the Todo Schema:

| Controller Method | Todo | Comment |
|-------------------|------|---------|
| post | find(query, callback| Initially the method executes a search.  query contains the query filter. If the query does not find a match then in the callback a save is executed |
|  | save(callback) | if the item is not found then the save is called |
| get | find(query, callback) | this method attemps to get all TODOs.  Note that a query object can be passed and it the query is empty ({}) then all items are returned to the callback |
| update | findById(id, callback | We are attempting to do an update.  If the item is found then the item is passed to the callback where the item is updated and saved |
|  | save(callback) | saves updated item |
| purge | find(query, callabck) | filters the collection fo Todo for { completed: true  }.  The filtered collection is passed to the callback |
|  | remove( { _id: { $in: doneTodos }}, callback) | The $in operator selects the documents where the value of a field equals any value in the specified array of Todos which have completed ===  true then we call remove on them.  |

At this time remove is empty.

### JavaScript with Angular, and Jade View
JavaScript code is organized in two files: app.js and todoFactory.js.  app.js contains the Angular app and the controller.  The controller gets injected two factories.  These factories are todoFactory responsible for interacting with the RESTfull express service and socketFactory responsible for registering to socket.io notifications.

The view contains a fieldset container where a form and collection of TODOs are placed.  The field set is bound to a scope property which is set depending on the notification sent via socket.io.  

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

MARINO, Jose, jrmarino(at)telus.net 

## License

This project is free to use by anyone trying ot learn this technology.  It is a learning tool.  In the case that you use
this project in a classroom then provide recognition to the person(s) involved in authoring this material.
