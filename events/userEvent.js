import { EventEmitter } from "events";

const userEvent = (user) => {
  // Initializing event emitter instances
  var eventEmitter = new EventEmitter();

  // Declaring listener userAdded to myEvent
  var userAdded = (user) => {
    console.log("New User Added: " + user);
  };

  // Listening to myEvent with userAdded
  eventEmitter.addListener("userEvent", userAdded);

  // Listing listeners
  //   console.log(eventEmitter.listeners("myEvent"));

  // Triggering myEvent
  eventEmitter.emit("userEvent", user);
};
export default userEvent;
