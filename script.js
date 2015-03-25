//TEMPLATE VARIABLES
var template = document.querySelector("#template");
template.page = "0";

//FUNCTIONS

//fab adding
var addprocess = function(project){
  var number = prompt("Number of "+project+" tasks today: (integer)");
    var askloop = 0;
    while(askloop<number){
      askloop++;
      var task = prompt(project+" task #"+askloop+":");
      //replace with insert later
      console.log(project+askloop+task);
      //log tasks
    }
};

//show adding menus, hide tabs
var showadd = function(){
  document.querySelector("#bigheader").innerHTML = "Add new task";
  document.querySelector("#addone").setAttribute("icon", "clear");
  document.querySelector("#toptabs").style.display = "none";
  document.querySelector("#cmcontainer").style.display = "inline-block";
  document.querySelector("#addboxdeco").style.display = "inline-block";
  document.querySelector("#okbutton").style.display = "inline-block";
};

//show tabs, hide adding menus
var hideadd = function(){
  document.querySelector("#bigheader").innerHTML = "Material Tasks";
  document.querySelector("#addone").setAttribute("icon", "add");
  document.querySelector("#toptabs").style.display = "inline-block";
  document.querySelector("#cmcontainer").style.display = "none";
  document.querySelector("#addboxdeco").style.display = "none";
  document.querySelector("#okbutton").style.display = "none";
};

//reset adding menus
var resetadd = function(){
  document.querySelector("#projectchooser").setAttribute("selected", "0");
  document.querySelector("#projectchooser").setAttribute("selected", "null");
  document.querySelector("#addbox").value = "";
};

//save tasks
var save = function(){
  var total = document.querySelectorAll("#tasks input").length;
  var count = 0;
  while(count < total){
    var saveinput = function(number){
      //save value of input
      var note = document.querySelectorAll("#tasks input")[number].value;
      localStorage.setItem(number, note);
      document.querySelectorAll("#tasks input")[number].addEventListener("input", function(){
        var note = this.value;
        localStorage.setItem(number, note);
      });
    }; /*ok*/
    saveinput(count);

    //save project name
    var countproject = count + "project";
    var projectofcount = document.querySelectorAll("#tasks input")[count].className;
    localStorage.setItem(countproject, projectofcount);

    count++;
  }
  //save total number of tasks
  localStorage.setItem("total", total);
};

//MAIN SCRIPT

//wait for template binding
window.addEventListener("template-bound", function(){

  //show tabs only
  hideadd();

  //retrive old tasks from local storage
  var oldtotal = localStorage.getItem("total");
  var count2 = 0;
  while(count2 < oldtotal){
    var oldvalue = localStorage.getItem(count2);

    var countproject2 = count2 + "project";
    var oldproject = localStorage.getItem(countproject2);

    //add to task list
    var adddiv = document.createElement("div");
    adddiv.setAttribute("horizontal", "");
    adddiv.setAttribute("layout", "");
    adddiv.className = "taskbox";
    var addcheck = document.createElement("paper-checkbox");
    addcheck.setAttribute("self-end", "");
    var adddecor = document.createElement("paper-input-decorator");
    adddecor.setAttribute("floatingLabel", "");
    adddecor.setAttribute("label", oldproject);
    adddecor.setAttribute("flex", "");
    adddecor.setAttribute("self-start", "");
    var addinput = document.createElement("input");
    addinput.setAttribute("is", "core-input");
    addinput.setAttribute("type", "text");
    addinput.className = oldproject;
    addinput.value = oldvalue;
    adddecor.appendChild(addinput);
    adddiv.appendChild(addcheck);
    adddiv.appendChild(adddecor);
    document.querySelector("#tasks").appendChild(adddiv);

    count2++;
  }

  //when coreadd button is clicked, start interactive adding dialog
  /*
  document.querySelector("#coreadd").addEventListener("click", function(){
    addprocess("P1");
    addprocess("P2");
    addprocess("P3");
    addprocess("P4");
  });
  */

  //when add button is clicked
  var open = 1;
  document.querySelector("#addone").addEventListener("click", function(){
    open++;
    if(open % 2 === 0){ //if action is open//
      showadd();
    }
    else{ //if action is close//
      hideadd();
      resetadd();
    }
  });

  //when ok button is clicked, add new task and clear input
  document.querySelector("#okbutton").addEventListener("click", function(){
    //get values of project and task
    var newvalue = document.querySelector("#addbox").value;
    var newproject = document.querySelector("#projectchooser .core-selected").innerHTML;

    //add to task list
    var adddiv = document.createElement("div");
    adddiv.setAttribute("horizontal", "");
    adddiv.setAttribute("layout", "");
    adddiv.className = "taskbox";
    var addcheck = document.createElement("paper-checkbox");
    addcheck.setAttribute("self-end", "");
    var adddecor = document.createElement("paper-input-decorator");
    adddecor.setAttribute("floatingLabel", "");
    adddecor.setAttribute("label", newproject);
    adddecor.setAttribute("flex", "");
    adddecor.setAttribute("self-start", "");
    var addinput = document.createElement("input");
    addinput.setAttribute("is", "core-input");
    addinput.setAttribute("type", "text");
    addinput.className = newproject;
    addinput.value = newvalue;
    adddecor.appendChild(addinput);
    adddiv.appendChild(addcheck);
    adddiv.appendChild(adddecor);
    var tasks = document.querySelector("#tasks");
    tasks.insertBefore(adddiv, tasks.childNodes[0]);

    //reset dropdown and input
    resetadd();

    //save for newly added tasks
    save();
  });

  //save
  save();

  //for testing
  document.querySelector("#fortesting").addEventListener("click", function(){
    localStorage.clear();
    console.log("cleared");
  });
});