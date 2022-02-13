const { ipcRenderer } = require('electron');
const { shutdown } = require('electron-shutdown-command');
const info = document.querySelector('#info-time')
const remaining = document.querySelector('#time-remaining')
const noti = document.querySelector('#noti')




function getInfo() {
  ipcRenderer.send('ping-data')
  ipcRenderer.on('send-data', (event, arg) => {
      info.textContent ="Use computer from " + arg[0].slice(1) + " to " + arg[1].slice(1) ;
      
      to = arg[1].match(/\d./g).map( e => parseInt(e) );
      endMinutes = to[0]*60 + to[1];
      let date = new Date();
      now = date.getHours() * 60 + date.getMinutes();
      let x = (endMinutes - now)

      remaining.textContent = "Time remaining: " + Math.floor(x/60) + ":" + x%60;
      x = 1;
      if (x == 1) {
        noti.textContent = "You only have one minute left."
      }
      if (x <= 0) {
        // shutdown()
      }
  })
}

(() => {
    getInfo()
    setInterval(getInfo, 60000)
})();