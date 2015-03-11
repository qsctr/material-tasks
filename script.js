//FUNCTIONS

//function for fab adding
var addprocess = function(project){
  var number = prompt("Number of "+project+" tasks today: (integer)");
    var askloop = 0;
    while(askloop<number){
      askloop++
      var task = prompt(project+" task #"+askloop+":");
      //replace with insert later
      console.log(project+askloop+task);
      //log tasks
    }
}

//function for saving tasks
var save = function(){
  var total = document.getElementById("tasks").getElementsByTagName("input").length;
  var count = 0
  while(count < total){
    var saveinput = function(number){
      //save value of input
      var note = document.getElementById("tasks").getElementsByTagName("input")[number].value;
      localStorage.setItem(number, note);
      document.getElementById("tasks").getElementsByTagName("input")[number].addEventListener("input", function(){
        var note = this.value;
        localStorage.setItem(number, note);
      });
    }
    saveinput(count);

    //save project name
    var countproject = count + "project";
    var projectofcount = document.getElementById("tasks").getElementsByTagName("input")[count].className;
    localStorage.setItem(countproject, projectofcount);

    count++
  }
  //save total number of tasks
  localStorage.setItem("total", total);
}

//MAIN SCRIPT

//wait for page and polymer to load
window.addEventListener("polymer-ready", function(){

  //retrive old tasks from local storage
  var oldtotal = localStorage.getItem("total");
  var count2 = 0;
  while(count2 < oldtotal){
    var oldnote = localStorage.getItem(count2);

    var countproject2 = count2 + "project";
    var oldproject = localStorage.getItem(countproject2)

    //add to task list
    var adder = document.createElement("paper-input-decorator");
    adder.setAttribute("floatingLabel", "");
    adder.setAttribute("label", oldproject);
    var adder2 = document.createElement("input");
    adder2.setAttribute("is", "core-input");
    adder2.setAttribute("type", "text");
    adder2.value = oldnote;
    adder2.className = oldproject;
    adder.appendChild(adder2);
    document.getElementById("tasks").appendChild(adder);

    count2++
  }

  //when coreadd button is clicked, start interactive adding dialog
  document.getElementById("coreadd").addEventListener("click", function(){
    addprocess("P1");
    addprocess("P2");
    addprocess("P3");
    addprocess("P4");
  });

  //when addone button is clicked, toggle the collapse and other stuff
  var open = 1;
  document.getElementById("addone").addEventListener("click", function(){
    document.getElementById("collapse").toggle();
    open++
    if(open % 2 === 0){ //if action is open//
      document.getElementById("bigheader").innerHTML = "Add new task";
      document.getElementById("addone").setAttribute("icon", "clear");
    }
    else{ //if action is close//
      document.getElementById("bigheader").innerHTML = "Material Tasks";
      document.getElementById("addone").setAttribute("icon", "add");
      //reset dropdown and input
      document.getElementById("projectchooser").setAttribute("selected", "0")
      document.getElementById("projectchooser").setAttribute("selected", "null");
      document.getElementById("addbox").value = "";
    }
  });

  //when ok button is clicked, add new task and clear input
  document.getElementById("okbutton").addEventListener("click", function(){
    var newvalue = document.getElementById("addbox").value;
    var newproject1 = document.getElementById("collapse").getElementsByClassName("core-selected");
    var newproject2 = newproject1[0].innerHTML;

    //add to task list
    var adder = document.createElement("paper-input-decorator");
    adder.setAttribute("floatingLabel", "");
    adder.setAttribute("label", newproject2);
    var adder2 = document.createElement("input");
    adder2.setAttribute("is", "core-input");
    adder2.setAttribute("type", "text");
    adder2.value = newvalue;
    adder2.className = newproject2;
    adder.appendChild(adder2);
    var tasks = document.getElementById("tasks");
    tasks.insertBefore(adder, tasks.childNodes[0]);

    //reset dropdown and input
    document.getElementById("projectchooser").setAttribute("selected", "0");
    document.getElementById("projectchooser").setAttribute("selected", "null");
    document.getElementById("addbox").value = "";

    //save for newly added tasks
    save();
  });

  //save
  save();

  //for testing
  document.getElementById("fortesting").addEventListener("click", function(){
    localStorage.clear();
    console.log("cleared");
  });
});