/*
Controller -  The controller is the Orchestrator.  It manages workflow for the event that happened.  
It is the go between for the View and the Model.  Views and Models should not talk to each other.  
When the view has an event occur, it wraps up the event and data needed and calls a method in the 
controller to handle it.  The controller will then do its work, call other services if needed, and 
change the Model state.  Then it will return the data to the view to update it.

So the Flow of the application should look like:

View -> Event Occurs (Like a button click) -> Calls a Controller method -> Controller Executes method->  
Calls services to get more data or work -> Calls Method on Model to update Model data -> Model Executes 
called method and stores state -> Gets new state information from method and returns new state to 
Controller ->  Controller may do some more code and then calls a method on the View to handle the 
new state -> View executes the method and updates the HTML and DOM with the new state.

*/
