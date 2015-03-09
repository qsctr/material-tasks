//FUNCTIONS
//==============================================================================

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
var save = function(){
  //get total number of tasks, then add event listener for
  //existing tasks and project name to save to local storage
  var total = document.getElementById("tasks").getElementsByTagName("input").length;
  console.log(total);
  var count = 0
  while(count < total){
    console.log(count);

    var saveinput = function(number){
      //save value of input
      var note = document.getElementById("tasks").getElementsByTagName("input")[number].value;
      console.log(note);
      localStorage.setItem(number, note);
      console.log(number);
      console.log("set");
      document.getElementById("tasks").getElementsByTagName("input")[number].addEventListener("input", function(){
        var note = this.value;
        console.log(note);
        localStorage.setItem(number, note);
        console.log(number);
        console.log("set");
      });
      console.log("new eventlistener added");
    }
    saveinput(count);

    //save project name
    var countproject = count + "project";
    var projectofcount = document.getElementById("tasks").getElementsByTagName("input")[count].className;
    localStorage.setItem(countproject, projectofcount);
    console.log(countproject);
    console.log(projectofcount);

    count++
  }
  //save total
  localStorage.setItem("total", total);
}

//==============================================================================
//MAIN SCRIPT
//==============================================================================

//wait for page and polymer to load
window.addEventListener("polymer-ready", function(){
  console.log("ready");

  //retrive old tasks from local storage
  var oldtotal = localStorage.getItem("total");
  var count2 = 0;
  while(count2 < oldtotal){
    var oldnote = localStorage.getItem(count2);
    console.log(oldnote);

    var countproject2 = count2 + "project";
    var oldproject = localStorage.getItem(countproject2)
    console.log(oldproject);

    //add to task list
    //make the decorator
    var adder = document.createElement("paper-input-decorator");
    //make label float
    adder.setAttribute("floatingLabel", "");
    //set label to project name
    adder.setAttribute("label", oldproject);
    //make the actual input
    var adder2 = document.createElement("input");
    //make the input a core-input
    adder2.setAttribute("is", "core-input");
    //set the input type
    adder2.setAttribute("type", "text");
    //set the input value to what is in the box
    adder2.value = oldnote;
    //set class of input
    adder2.className = oldproject;
    //append the input to the decorator
    adder.appendChild(adder2);

    console.log(adder);
    console.log(adder2);

    document.getElementById("tasks").appendChild(adder);

    count2++
  }

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
    //make the decorator
    var adder = document.createElement("paper-input-decorator");
    //make label float
    adder.setAttribute("floatingLabel", "");
    //set label to project name
    adder.setAttribute("label", newproject2);
    //make the actual input
    var adder2 = document.createElement("input");
    //make the input a core-input
    adder2.setAttribute("is", "core-input");
    //set the input type
    adder2.setAttribute("type", "text");
    //set the input value to what is in the box
    adder2.value = newvalue;
    //set class of input
    adder2.className = newproject2;
    //append the input to the decorator
    adder.appendChild(adder2);

    console.log(adder);
    console.log(adder2);

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

  /* for testing */
  document.getElementById("fortesting").addEventListener("click", function(){
    localStorage.clear();
    console.log("cleared");
  });
});