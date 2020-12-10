tasks = [
  { // definition of the "backlog" lane 
    "title" : "backlog",
    "items" : [
      "[projectx] Improve documentation",
    ]
  },
  { // definition of the "To Do" lane 
    "title" : "To Do",
    "color" : "red", // background color of the lane header
    "items" : [ 
      "[team]!2020-03-20 Prepare sprint review",  // definition of a task, tagged with "team" and due to March 3rd of 2020
      "[personal]!2025-04-05 Buy gift for Lucia's birthday",
      "Have a beer with coworkers 🍻",
      "[projectx][dev] Fix bug #42"
    ]
  },
  {
    "title" : "Doing",
    "color" : "orange",
    "items" : [
      "[dev] Improve code of https://github.com/jctophefabre/mycraftedboard",
    ]
  },
  {
    "title" : "Done 😃",
    "color" : "green",
    "items" : [
      "[projectx] Release version 2.2"
    ]
  }
]
