"use strict";

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

  var deadline = "";
  const dlRegex = /!(\d\d\d\d-\d\d-\d\d)/gm;
  do {
    m = dlRegex.exec(content);
    if (m) {
      deadline = m[1];
    }
  } while (m);

  content = content.replace(tagRegex,"");
  var contentHtml = content.replace(dlRegex,"");
  contentHtml = contentHtml.trim();

  var deadlineHtml = "";
  if (deadline) {
    var dlDate = moment(deadline);
    var curDate = moment();
    var daysDiff = Math.ceil(moment.duration(dlDate-curDate).asDays());

    var dlStr = dlDate.format('DD/MM');

    var issueClass = "";

    if (daysDiff < config.daysbefore.danger) {
      issueClass = " date-danger";
      dangerCount++;
    }
    else if (daysDiff < config.daysbefore.warning) {
      issueClass = " date-warning";
      warningCount++;
    }

    deadlineHtml += "<span class='date"+ issueClass +"'>" + dlStr + "</span>";
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
  return linkifyHtml("<li>"+tagsHtml+deadlineHtml+contentHtml+"</li>");
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


document.title  = config.title;
if ("initials" in config.user && config.user.initials != "") {
  document.title += " | " + config.user.initials;
}


if ("refresh" in config && config["refresh"] > 0) {
  document.getElementById("refresh-auto").style.display = "inline-block";
  window.setTimeout(function () {
    window.location.reload();
  }, config["refresh"]*1000);
}

document.getElementById("navbar-title").innerHTML = config.title;
document.getElementById("user-name").innerHTML = config.user.name;

var userElem = document.getElementById("user-info");
var avatarElem = document.getElementById("user-avatar");
var initialsElem = document.getElementById("user-initials");
if ("avatar" in config.user && config.user.avatar != "") {
  avatarElem.innerHTML = "<img src='"+config.user.avatar+"'/>";
  avatarElem.style.display = "";
  userElem.removeChild(initialsElem);
} else if ("initials" in config.user && config.user.initials != "") {
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
