const path = require("path");
var fs = require("fs");

let fileContent = fs.readFileSync(path.join(__dirname, "sync/history/keylogger.txt")).toString();

const history = document.getElementById("history");

arr = fileContent.split("\n");
for (i in arr) {
  var tag = document.createElement("p");
  var text = document.createTextNode(arr[i]);
  tag.appendChild(text);
  history.appendChild(tag);
}
