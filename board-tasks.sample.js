
tasks = [

  // ---- First board : Work
    {
      "title" : "Work",
      "tasks" : [
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
            "[team]!2020-03-20 Prepare sprint review for all relevant members | Topics: tasks done, issues, feedback on progress and planning",  // definition of a task, tagged with "team" and due to March 3rd of 2020
            "Have a beer with coworkers 🍻",
            "[projectx][dev] Fix bug #42 | Check interaction with feature #21"
          ]
        },
        {
          "title" : "Work in progress",
          "color" : "orange",
          "items" : [
            "[dev] Improve code of https://github.com/jctophefabre/mycraftedboard",
          ]
        },
        {
          "title" : "Done",
          "color" : "green",
          "items" : [
            "[projectx] Release version 2.2"
          ]
        }
      ]
    },
  
  // ---- Second board :Home
    {
      "title" : "Home",
      "tasks" : [
        { // definition of the "To Do" lane
          "title" : "To Do",
          "color" : "purple", // background color of the lane header
          "items" : [ 
            "[kids]!2025-04-05 Buy gift for Lucia's birthday",
            "[kids]!2025-04-05 Prepare cake for Lucia's birthday",
          ]
        },
        {
          "title" : "Doing",
          "color" : "pink",
          "items" : [
            "[house] Repaint the garden gate",
          ]
        },
        {
          "title" : "😃",
          "color" : "mediumaquamarine",
          "items" : [
            "Go shopping",
          ]
        }
      ]
    }
  ]

