const { ipcRenderer } = require("electron");

ipcRenderer.send("render-new-window", "control");
