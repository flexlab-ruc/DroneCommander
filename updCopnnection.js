var dateFormat = require('dateformat');
var player = require('play-sound')(opts = {})
 
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const field = document.getElementById("sendmsg");
const ip = "192.168.10.1";
const port = 8889;
 

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  addToLog(msg, "reply");
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(port);
//Prints: server listening 0.0.0.0:41234


function sendfunction(sendmessage, icon){ 
    const message = Buffer.from(sendmessage);
    server.send(message, port, ip, (err) => {
        //client.close();
        addToLog(message, icon);
      });
    field.value = "";
    field.focus();
    field.select();
}

function addToLog(msg, icon)
{
  //<li class="collection-item">
  //  <div>Alvin
  //    <a href="#!" class="secondary-content">
  //      <i class="material-icons">
  //        send
  //      </i>
  //    </a>
  //  </div>
  //</li>
  var htmlmsg = document.createElement("li");
  htmlmsg.classList.add("collection-item");
  
  var div = document.createElement("div");
  var person = document.createElement("i");
  person.classList.add("material-icons");
  person.innerText = "person";

  //plop sound
  player.play('161628__crazyfrog249__blop.wav', function(err){
    if (err) throw err
  });

  div.innerText = " " + msg;

  div.prepend(person);
  
  var span = document.createElement("span");
  span.classList.add("secondary-content");
  
  var i = document.createElement("i");
  i.classList.add("material-icons");
  i.innerText = icon;

  i.onclick = function() {sendfunction(msg, "person")};

  htmlmsg.appendChild(div);

  div.appendChild(span);

  span.appendChild(i);

  document.getElementById("netmsg").appendChild(htmlmsg);  

/*
    var htmlmsg = document.createElement("div");
    var spantime = document.createElement("span");
    var d = new Date();
    spantime.innerText = dateFormat(d, "h:MM:ss l")
    spantime.classList.add("spantime");
    var spanmsg = document.createElement("span");
    spanmsg.innerText = msg;
    spanmsg.classList.add("spanmsg");
    htmlmsg.appendChild(spantime);
    htmlmsg.appendChild(spanmsg);
    document.getElementById("netmsg").appendChild(htmlmsg);
*/
  }

document.getElementById("btn").addEventListener("click", sendfunction(field.value, "person"));
document.getElementById("sendmsg").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        sendfunction(field.value, "person");
    }
});

//place curose in input field
field.focus();
field.select();

