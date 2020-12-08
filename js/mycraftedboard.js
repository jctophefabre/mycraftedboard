function createItem(content) {
  var tags = [];
  const tagregex = /\[([^\]]*)\]/gm;
  do {
    var m = tagregex.exec(content);
    if (m) {
      tags.push(m[1]);
    }
  } while (m);

  var deadline = "";
  const dlregex = /\!(\d\d\d\d-\d\d-\d\d)/gm;
  do {
    var m = dlregex.exec(content);
    if (m) {
      deadline = m[1];
    }
  } while (m);

  var content = content.replace(tagregex,"");
  var contentHtml = content.replace(dlregex,"");
  contentHtml = contentHtml.trim();

  var deadlineHtml = "";
  if (deadline) {
    var dlDate = moment(deadline);
    var curDate = moment();
    var daysDiff = Math.ceil(moment.duration(dlDate-curDate).asDays());

    var dlStr = dlDate.format('DD/MM');

    var issueclass = "";

    if (daysDiff < config.daysbefore.danger) {
      issueclass = " date-danger";
      dangercount++;
    }
    else if (daysDiff < config.daysbefore.warning) {
      issueclass = " date-warning";
      warningcount++;
    }

    deadlineHtml += "<span class='date"+ issueclass +"'>" + dlStr + "</span>";
  }

  var tagsHtml = "";
  for (var l in tags) {
    var lparts = tags[l].split(':');
    var lid = lparts[0];
    if (lid in config.tags) {
      var tagInfo = config.tags[lid];
      var ltext = tagInfo.text;
      if (lparts.length > 1) {
        var ltext = lparts.slice(1,lparts.length).join('');
      }
      tagsHtml += "<span class='tag' style='background: "+tagInfo.color+"'>"+ltext+"</span>";
    }
  }
  return linkifyHtml("<li>"+tagsHtml+deadlineHtml+contentHtml+"</li>");
}

// =========================

function createLane(title, color, items) {
  var itemsHtml = "";
  for (i in items) {
    itemsHtml+= createItem(items[i]);
  }

  var styleTxt = "";

  if (color) {
    styleTxt = " style='background-color: "+color+";'";
  }

  var laneHtml = "<div class='col lane'><h1"+styleTxt+">"+title+"</h1><ul>"+itemsHtml+"</ul></div>";
  return laneHtml;
}


// =========================
// =========================


var warningcount = 0;
var dangercount = 0;


document.title  = config.title + " | " + config.user.nickname;


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

for (var i in tasks) {
  var lane = tasks[i];
  document.getElementById("tasks").innerHTML += createLane(lane.title,lane.color,lane.items);
}

if (dangercount)
{
  var pill = document.getElementById("pill-danger");
  pill.innerHTML = dangercount;
  pill.style.display = "inline-block";
}

if (warningcount)
{
  var pill = document.getElementById("pill-warning");
  pill.innerHTML = warningcount;
  pill.style.display = "inline-block";
}
