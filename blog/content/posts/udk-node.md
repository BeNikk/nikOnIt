---
title: "Node.JS"
date: "2025-10-30"
excerpt: "Do we really know Node?"
---

Javascript was meant to run inside the browser. Node.js is, like everyone says, a way to run Node on the server. 
It is a javascript runtime environment. Nodejs allows JS to be run outside of the browser. 

Node is made of primarily 2 major components :- 
- V8 engine  
- LibUV 

V8 is an engine that actually runs the JS code. 
LibUV is a library that implements event loop and the thread pool, which implements all the asynchronous things, like file i/o, timers etc.

Think of node as a combination of these 2 things

Whenever we run a .js file, and run it, it first create a single node process. This is called the main thread. Since nodejs/js is 
single threaded, all our code will run on this single thread. 
What happens inside the main thread - 

- The project is initialised and all the top level code, i.e code that is their outside of a function, like a script.
- Then all the modules are required, event callbacks are registered (like socket.on etc, only registered)
- Then the event pool is started. Note that all this happens inside the main thread. 
- Simultaneously, a thread pool is initialised as well. This pool is used for running CPU intensive tasks/long running tasks, like FS task etc. 
- Now the main thread, through event loop, passes all these CPU intensive tasks to the thread pool. Thread pool by default has 4 threads and can scale to 128 threads as well. 

Let us look at how the event loop runs our task 
- First the event loop check for fns like setTimeout(), setInterval(), and these codes are run. 
- Then fns that asynchronously reads/writes file are executed. 
- setImmediate callbacks are run 
- If close callbacks, like socket.close or anything similar are pending, then the event loop runs again. otherwise it just exits. 
- Whenever event loop face transitions, then promise resolves are executed
See the code for better understanding 

``` /* 
  */
const fs = require("fs");

/*
setTimeout(() => {
  console.log("TImer");
}, 0);
setImmediate(() => console.log("from immediate function 1"));
console.log("hello from top level code");
*/


//expected output -  hello from top level code and then timer should be printed followed  by from immediate function 1 .

// what if we remove the console.log here? then the output should be, just the timer and from immediate function 1 but in 
// actuality the output is from immediate functon 1 followed by the timer, this is wrong as per our understanding of event loop

setTimeout(() => {
  console.log("Timer");
}, 0);
setImmediate(() => console.log("from immediate function 1"));
// there is a reason of this, if the script that we wrote is not within the main thread, like this, 
// then the output is non deterministic,as it is bound by the performance of the process - nodejs official explaination 
fs.readFile("a.txt", 'utf-8', () => {
  console.log("file reading");
  setTimeout(() => { console.log("timer 2") }, 0);
  setTimeout(() => { console.log("timer 3") }, 2 * 1000);
  setImmediate(() => { console.log("immediate inside file read") });
})
console.log("hello world") // expected output -> file reading, immediate inside file read, timer 2 and then timer 3
```

The cpu intensive tasks like cryptography etc are handled by threads, so threads should be in use whenever there is 
a long running intensive task. 
By default 4 threads are there for handling task, and therefore if we run 5 same cpu intensive tasks, 4 are almost done in the same
time, but 5th process will have to wait for one function to finish .

We can do so by process.env.UV_THREADPOOL_SIZE  = 5 


How Node is different from other programming languages that are multi threaded 

Let us say we create a server , and that server is handling requests, now all these requests are handled by this 
that event loop is running on a single server. In case we of cpu intensive thing, it can offload the tasks to other thread. 

The thread can be controlled by us. 
In other languages, there is no concept of event loop. Each request is served by a separate thread.


Basics (in case we forget)
We have an event queue where each request is pushed in the queue.
Event loop keeps a watch on the event queue, and it takes the requests from the queue. 

The request might be of two types
- Blocking
- Non blocking 

If the request is non blocking, it will just resolve the request and return the response. 
In case the request is a blocking operation, we go to the thread pool, make the worker perform. 
It processes the request and returns it back 

