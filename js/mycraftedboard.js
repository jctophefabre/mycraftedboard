"use strict";


var VERSION = '0.4';


function createItem(content) {
  var tags = [];
  const tagRegex = /\[([^\]]*)\]/gm;
  var m;
  do {
     m = tagRegex.exec(content);
    if (m) {
      tags.push(m[1]);
    }
  } while (m);

  var duedate = "";
  const ddRegex = /!(\d\d\d\d-\d\d-\d\d)/gm;
  do {
    m = ddRegex.exec(content);
    if (m) {
      duedate = m[1];
    }
  } while (m);

  content = content.replace(tagRegex,"");
  var contentHtml = content.replace(ddRegex,"");
  contentHtml = contentHtml.trim();

  var duedateHtml = "";
  if (duedate) {
    var ddDate = moment(duedate);
    var curDate = moment();
    var daysDiff = Math.ceil(moment.duration(ddDate-curDate).asDays());

    var ddStr = ddDate.format(config.duedate.format);

    var issueClass = "";

    if (daysDiff < config.duedate.danger) {
      issueClass = " date-danger";
      dangerCount++;
    }
    else if (daysDiff < config.duedate.warning) {
      issueClass = " date-warning";
      warningCount++;
    }

    duedateHtml += "<span class='date"+ issueClass +"'>" + ddStr + "</span>";
  }

  var tagsHtml = "";
  tags.forEach(element => {
    let tagParts = element.split(":");
    let tagKey = tagParts[0];
    if (tagKey in config.tags) {
      let tagInfo = config.tags[tagKey];
      let tagText = tagInfo.text;
      if (tagParts.length > 1) {
        tagText = tagParts.slice(1,tagParts.length).join("");
      }
      tagsHtml += "<span class='tag' style='background: "+tagInfo.color+"'>"+tagText+"</span>";
    }
  });
  return linkifyHtml("<li>"+tagsHtml+duedateHtml+contentHtml+"</li>");
}


// ##############################################################


function createLane(title, color, items) {
  var itemsHtml = "";

  items.forEach(element => {
    itemsHtml+= createItem(element);
  });

  var styleTxt = "";

  if (color) {
    styleTxt = " style='background-color: "+color+";'";
  }

  var laneHtml = "<div class='col lane'><h1"+styleTxt+">"+title+"</h1><ul>"+itemsHtml+"</ul></div>";
  return laneHtml;
}


// ##############################################################
// ##############################################################


var warningCount = 0;
var dangerCount = 0;

if (typeof(config) === 'undefined') {
  var config = {};
}

config = _.merge(
  {
    "title" : "myCraftedBoard",
    "refresh" : 300,
    "user" : {
      "name" : "myCraftedUser",
      "avatar" : "",
      "initials" : "MY"
    },
    "duedate" : {
      "warning" : 4,
      "danger" : 2,
      "format" : "DD/MM"
    },
    "tags" : {}
  },
  config
)


document.title  = config.title;
if (config.user.initials != "") {
  document.title += " | " + config.user.initials;
}

if (config["refresh"] > 0) {
  document.getElementById("refresh-auto").style.display = "inline-block";
  window.setTimeout(function () {
    window.location.reload();
  }, config["refresh"]*1000);
}

document.getElementById("version").innerHTML = VERSION;

document.getElementById("navbar-title").innerHTML = config.title;
document.getElementById("user-name").innerHTML = config.user.name;

var userElem = document.getElementById("user-info");
var avatarElem = document.getElementById("user-avatar");
var initialsElem = document.getElementById("user-initials");
if (config.user.avatar != "") {
  avatarElem.innerHTML = "<img src='"+config.user.avatar+"'/>";
  avatarElem.style.display = "";
  userElem.removeChild(initialsElem);
} else if (config.user.initials != "") {
  initialsElem.innerHTML = config.user.initials;
  initialsElem.style.display = "";
  userElem.removeChild(avatarElem);
} else {
  userElem.removeChild(avatarElem);
  userElem.removeChild(initialsElem);
}

tasks.forEach(lane => {
  document.getElementById("tasks").innerHTML += createLane(lane.title,lane.color,lane.items);
});

if (dangerCount)
{
  let pill = document.getElementById("pill-danger");
  pill.innerHTML = dangerCount;
  pill.style.display = "inline-block";
}

if (warningCount)
{
  let pill = document.getElementById("pill-warning");
  pill.innerHTML = warningCount;
  pill.style.display = "inline-block";
}
