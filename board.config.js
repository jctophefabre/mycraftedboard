
config = {
  "title" : "myCraftedBoard",  // title of the board
  "refresh" : 300,  // [optional] delay in seconds for auto-refresh of the page. Disabled if 0
  "user" : {
    "name" : "John Doe",  // name of the board user (person or group)
    "avatar" : "", // [optional] url of a local or remote avatar (e.g. Gravatar) 
    "initials" : "JD" // [optional] initials of the user. Not displayed if an avatar is provided
  },
  "daysbefore" : {
    "warning" : 4,
    "danger" : 2
  },
  "tags" : {  // definitions of tags that can be referenced in the tasks using their key (e.g. projectx, team, dev, ...)
    "projectx" : {
      "color" : "#54697E",  // color of the tag
      "text" : "Project X" // displayed text when the tag is used
    },
    "team" : {
      "color" : "linear-gradient(to right,darkgreen,blue)",
      "text" : "My Team"
    },
    "dev" : {
      "color" : "dodgerblue",
      "text" : "Development 🤘"
    },
    "personal" : {
      "color" : "magenta",
      "text" : "Personal"
    }
  }
}

