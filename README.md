# myCraftedBoard

myCraftedBoard is a simple kanban-like board for managing tasks. It is a HTMS+JS application which runs locally in a browser, originally written for personal needs. No server is required, no specific configuration of browser is needed.

It offers the following features

* 🔢 single or multiple tabbed boards
* 🗒 customizable board lanes
* #️⃣ customizable tagging
* 👩‍💻 customizable user/group 
* 🔗 automatic discovery of external links in tasks texts
* 📅 optional planned dates with customizable alerts 
* 🔄 optional automatic refresh
* 🏠 data is stored locally

<img src="https://github.com/jctophefabre/mycraftedboard/raw/master/assets/screenshot.png">


## Installation

To install myCraftedBoard, you may either:
* Download the [latest myCraftedBoard archive](https://github.com/jctophefabre/mycraftedboard/archive/master.zip) and uncompress it on your computer
* Clone the [myCraftedBoard git repository](https://github.com/jctophefabre/mycraftedboard) on your computer

When myCraftedBoard is installed for the first time, you may copy the configuration and tasks files to get a starting example:
* copy board-config.sample.js to board-config.js
* copy board-tasks.sample.js to board-tasks.js


## Usage

myCraftedBoard was designed to be simple and lightweight. You only have to open the index.html file in your favourite browser to access to your board.  

The management of tasks and the general configuration of the board requires manual editing of JSON data files with just a text editor.  

A configuration and a tasks list are provided as an example.


### Configuration

To set up the configuration, you have to edit the board-config.js file.  

You can configure:
* the board title
* the refresh interval
* the user name, initials and avatar
* the delays for alerts on planned tasks
* the tags which will can used to classify tasks

More detailed information on how to correctly configure the board are available in the [board-config.sample.js](https://github.com/jctophefabre/mycraftedboard/blob/master/board-config.sample.js) example file.

### Tasks

To manage the tasks, you have to edit the board-tasks.js file.  
This files allows to define lanes (such as "Todo","In progress", "Done") and tasks in lanes.  

A lane is a list of tasks.
A task is a string formatted with optional tags, an optional planned date and a text. Optionally, details can be added after ` | ` sequence to create an expandable section.
The following example defines a task tagget for "Project X" and "Development", planned to be completed on "December 8th of 2020" and detailed with message "Fix bug #42" with details "check interaction with feature #30".

```
"[projectx][dev]!2020-12-08 Fix bug #42 | check interaction with feature #30"
```
Tasks can be moved from one lane to another using copy-paste in the file editor.

More detailed information on how to manage lanes and tasks are available in the [board-tasks.sample.js](https://github.com/jctophefabre/mycraftedboard/blob/master/board-tasks.sample.js) example file.


## Tips

* To quickly access to the board-tasks.js file and edit the tasks, you can use the desktop search feature of your system or set up a shortcut on your desktop, task bar, ...
* To share a board with others people, you can store it in a network shared folder or a drive system such as Nextcloud, Dropbox, iCloud, ... as myCraftedBoard is only a matter of files!


## Development, License and acknowledgment

myCraftedBoard is written and maintained by [Jean-Christophe Fabre](https://github.com/jctophefabre).  
As myCraftedBoard was originally written for personal needs, it is available "as-is" and is not intended to be fail-safe.
In particular, wrong syntax in JSON data files may lead to unexpected functioning. 
Most of the time, it can be easily fixed by verifying the files correctness.


### License

myCraftedBoard is available under the terms of the MIT license. See [LICENSE file](https://github.com/jctophefabre/mycraftedboard/blob/master/LICENSE).

### 3rd party frameworks

myCraftedBoard relies on external frameworks which are bundled with the myCraftedBoard files:

* [Bootstrap 4.5.3](https://getbootstrap.com)
* [Lodash 4.17.15](https://lodash.com/)
* [Linkify 2.1.9](https://soapbox.github.io/linkifyjs/)
* [Moment.js 2.24](https://momentjs.com/)

All these frameworks are distributed under MIT licence and are the property of their authors.


