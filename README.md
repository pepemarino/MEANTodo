# My TODO List with MongoDB, Express, Angular and Node

The MEANTodo list attempts to introduce the audience to the use of MongoDB in the context of a 
Resource-Oriented Architecture (ROA) application. The main objective is to use MongoDB as a document 
database where TODOs are stored and managed via CRUD operations through a REST service built using Node.js 
and Express. This presentation will also introduce the audience to Mongoose, an ODM which provides 
MongoDB base systems with an abstraction layer used to build a data model through a schema and schema 
validation for data consistency.

## This is MEAN baby!
This TODO implementation is a learning tool to illustrate some MongoDB with Mongoose features.  The project 
will be used as discussion reference at a meetign organized by the Vancouver, British Columbia, Canada, MongoDB 
User Group (VanMUG).  This README contains some of the highligts of the project and presentation.

### Mongoose
One of the advantages of a JSON document style data store such as MongoDB, besides its scalability and sharding 
which makes it so convenient for big data, is the fact that MongoDB is a schemaless.  This allows the storage of 
documents with different sets of fields, with different types for these fields.  This might be convenint for must scenarios
providing great flexibility because the documents managed by this database become very dynamic in its nature.  However, MongoDB does provide some structure.  For example the system namespace contains an explicit list of our collections and indexes.

This great freedom comes with great responsibility and in the case that a business case calls for the need of a structured model which needs to meet certain validation rules and criterias then our solution needs to come up with a set of metadata rules to describe and validate the data.  It would be convenient if we could use in our solution the help of a framework to help us add schema and data validation so we could concentrate on our business solution.

Such help comes from Mongoose.  Mongoose provides a straight-forward, schema-based solution to model our application data. It includes built-in type casting, built-in and cyustom validation, query building, etc.

In this project Mongoose is used to provide a Todo schema model, data validation, custom-data validation.  There are other ways to validate data by subscribing to Mongoose pre-save events but this technique is not used in this project

### Mongoose Events
When creating a connection to the MongoDB database using Mongoose this project register to events such as "error", "connected", and "disconnected".  We register to these events in server.js.  The disconnected event handler uses sokect.io to notify registered clients that TODOs cannot be process.  Clients are also notified when the connection is restablished or the first time Mongoose connects to MongoDB.

On the client side an Angular sockectFactory registers to a socket.io event and in the case that the connection has been lost then all page elements are disabled.  These elements are enabled as soon as the client is notified, via sokect.io, that the TODO processing can continue. 

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
