"use strict";


var VERSION = '0.6';


function createItem(content, counters) {
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
      counters.danger++;
    }
    else if (daysDiff < config.duedate.warning) {
      issueClass = " date-warning";
      counters.warning++;
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

  var splittingDetails = contentHtml.split(" | ");

  if (splittingDetails.length > 1) {
    return linkifyHtml("<li><details><summary>"+tagsHtml+duedateHtml+splittingDetails[0]+"</summary><div class=\"detail\">"+splittingDetails[1]+"</div></details></li>");
  } else {
    return linkifyHtml("<li>"+tagsHtml+duedateHtml+contentHtml+"</li>");
  }
}


// ##############################################################


function createLane(title, color, items, counters) {
  var itemsHtml = "";

  items.forEach(element => {
    itemsHtml+= createItem(element, counters);
  });

  var styleTxt = "";

  if (color) {
    styleTxt = " style='background-color: "+color+";'";
  }

  var laneHtml = "<div class='col lane'><h1"+styleTxt+">"+title+"</h1><ul>"+itemsHtml+"</ul></div>";
  return laneHtml;
}


// ##############################################################


function buildSingleBoard(parent,tasks,index) {

  let counters = {
    "warning" : 0,
    "danger" : 0
  }

  let tasksDiv = document.createElement("div");
  tasksDiv.className = "row";
  tasksDiv.classList.add("tasks");
  tasksDiv.id = `tasks-${index}`;
  parent.appendChild(tasksDiv);

  tasks.forEach(lane => {
    tasksDiv.innerHTML += createLane(lane.title,lane.color,lane.items,counters);
  });

  if (counters.danger)
  {
    let pill = document.getElementById(`pill-danger-${index}`);
    pill.innerHTML = counters.danger;
    pill.style.display = "inline-block";
  }

  if (counters.warning)
  {
    let pill = document.getElementById(`pill-warning-${index}`);
    pill.innerHTML = counters.warning;
    pill.style.display = "inline-block";
  }
}


// ##############################################################


function buildMultipleBoard(parent,multipleTasks) {

  // tab header
  let tabUl = document.createElement("ul");
  tabUl.id = "tabheader";
  tabUl.className = "nav";
  tabUl.classList.add("nav-tabs");
  tabUl.setAttribute("role","tablist");
  parent.appendChild(tabUl);

  // tab content
  let contentDiv = document.createElement("div");
  contentDiv.id = "content";
  contentDiv.className = "tab-content";
  parent.appendChild(contentDiv);

  let index = 0;
  multipleTasks.forEach(tasksTab => {

    // add entry in tab header
    let tabLi = document.createElement("li");
    tabLi.class = "nav-item";
    tabLi.setAttribute("role","presentation");
    tabUl.appendChild(tabLi);

    // set link in tab header entry
    let tabLiAnc = document.createElement("a");
    tabLiAnc.id = `tabanchor-${index}`;
    tabLiAnc.className = "nav-link";
    tabLiAnc.dataset.toggle = "tab"
    tabLiAnc.href = `#pane-${index}`
    tabLiAnc.setAttribute("role","tab");
    tabLiAnc.setAttribute("aria-controls",`pane-${index}`);
    if (!index ) {
      tabLiAnc.classList.add("active");
      tabLiAnc.setAttribute("aria-selected","true");
    } else {
      tabLiAnc.setAttribute("aria-selected","false");
    }
    tabLiAnc.innerHTML = tasksTab.title;
    tabLiAnc.innerHTML += `&nbsp;<span id='pill-danger-${index}' class='badge badge-pill pill-danger' style='display:none;'>0</span>&nbsp;<span id='pill-warning-${index}' class='badge badge-pill pill-warning' style='display:none;'>0</span>`
    tabLi.appendChild(tabLiAnc);

    // add entry in tab content
    let paneDiv = document.createElement("div");
    paneDiv.id = `pane-${index}`;
    paneDiv.className = "tab-pane";
    paneDiv.classList.add("fade");
    if (!index ) {
      paneDiv.classList.add("show");
      paneDiv.classList.add("active");
    }
    paneDiv.setAttribute("role","tabpanel");
    paneDiv.setAttribute("aria-labelledby",`tabanchor-${index}`);
    contentDiv.appendChild(paneDiv);

    // create board in tab content
    buildSingleBoard(paneDiv,tasksTab.tasks,index);

    index++;
  });
}


// ##############################################################


function buildFullBoard() {

  let boardDiv = document.getElementById("board");

  if (typeof(tasks) === 'undefined' ||
      !Array.isArray(tasks) ||
      tasks.length == 0 ) {
    // process wrong data
    let noDataDiv = document.createElement("div");
    noDataDiv.className = "p-5";
    noDataDiv.id="nodata";
    noDataDiv.innerHTML = "<p class='text-center'>No task found!<br/><span style='font-size : 200%'>🏖</span><br/><br/>Check your <tt>board-tasks.js</tt> file</p>";
    boardDiv.appendChild(noDataDiv);
  } else {
    if (!tasks[0].hasOwnProperty("tasks")) {
      // go for single board
      let pillw = document.getElementById("pill-warning-x");
      pillw.id = "pill-warning-0";
      let pilld = document.getElementById("pill-danger-x");
      pilld.id = "pill-danger-0";
      buildSingleBoard(boardDiv,tasks,0);
    } else {
      // go for multiple board
      buildMultipleBoard(boardDiv,tasks);
    }
  }
}


// ##############################################################
// ##############################################################


// prepare configuration
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

// document title
document.title  = config.title;
if (config.user.initials != "") {
  document.title += " | " + config.user.initials;
}

// auto-refresh enable/disable
if (config["refresh"] > 0) {
  document.getElementById("refresh-auto").style.display = "inline-block";
  window.setTimeout(function () {
    window.location.reload();
  }, config["refresh"]*1000);
}


// prepare header
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

// current version in footer
document.getElementById("version").innerHTML = VERSION;


buildFullBoard();
