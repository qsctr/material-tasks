//FUNCTIONS
//==============================================================================

//function for retrieving old tasks
var oldget = function(project){
  if (localStorage.getItem(project) === null) {
    //leave it blank, it is a new input
  }
  else{
    var old = localStorage.getItem(project);
    document.getElementById(project).value = old;
  }
}

//function for adding
var addprocess = function(project){
  //ask number of tasks
  var number = prompt("Number of "+project+" tasks today: (integer)");
    var askloop = 0;
    while(askloop<number){
      askloop++
      //ask what is task a number of times (depending on number of tasks)
      var task = prompt(project+" task #"+askloop+":");
      //replace with insert later
      console.log(project+askloop+task);
      //log tasks
    }
}

//function for saving tasks
var save = function(project){
  document.getElementById(project).addEventListener("input", function(){
    var note = document.getElementById(project).value;
    localStorage.setItem(project, note);
  });
}

//==============================================================================
//MAIN SCRIPT
//==============================================================================

//wait for page and polymer to load
window.addEventListener("polymer-ready", function(){
  console.log("ready");

  //retrieve old tasks from local storage for task list using OLDGET
  oldget("P1");
  oldget("P2");
  oldget("P3");
  oldget("P4");

  //when coreadd button is clicked, start interactive adding dialog
  document.getElementById("coreadd").addEventListener("click", function(){
    //adds for 4 projects using ADDPROCESS
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
    }
    else{ //if action is close//
      document.getElementById("bigheader").innerHTML = "Material Tasks";
      //reset dropdown and input
      document.getElementById("projectchooser").setAttribute("selected", "0")
      document.getElementById("projectchooser").setAttribute("selected", "null");
      document.getElementById("addbox").value = "";
    }
  });

  //when ok button is clicked, add new task and clear input
  document.getElementById("okbutton").addEventListener("click", function(){
    var newvalue = document.getElementById("addbox").value;
    console.log(newvalue);
    var newproject1 = document.getElementById("collapse").getElementsByClassName("core-selected");
    var newproject2 = newproject1[0].innerHTML;
    console.log(newproject2);

    //add to task list
    var adder = document.createElement("paper-input-decorator");
    adder.setAttribute("floatingLabel", "");
    adder.setAttribute("label", newproject2);
    var adder2 = document.createElement("input");
    adder2.setAttribute("is", "core-input");
    adder2.setAttribute("type", "text");
    //add some sort of identification (class/id) to adder2 so it can be saved (using core-menu selected)
    adder2.value = newvalue;
    adder.appendChild(adder2);
    var tasks = document.getElementById("tasks");
    tasks.insertBefore(adder, tasks.childNodes[0]);

    //reset dropdown and input
    document.getElementById("projectchooser").setAttribute("selected", "0");
    document.getElementById("projectchooser").setAttribute("selected", "null");
    document.getElementById("addbox").value = "";
  });
  //when input changes, save to local storage using SAVE
  save("P1");
  save("P2");
  save("P3");
  save("P4");
});