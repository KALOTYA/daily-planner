
$(function () {

  //Assigned elements for work hours and current hours
  var workHours = 9;
  var endHour = 17;
  //get the current hour of the day using Day.js
  var currentHour = dayjs().hour();
  var container = $(".container-fluid")

  //Loop through each hour from work hours to end hours
  for (var i = workHours; i <= endHour; i++) {
    //convert hours to AM/PM format
    var hour = i < 12 ? i + "AM" : i === 12 ? "12PM" : (i - 12) + "PM";
    //generate id for the time block
    var id = "hour-" + i;
    //determine if time block is in 'past', 'present', or 'future'
    var pastClass = i < currentHour ? " past" : "";
    var presentClass = i === currentHour ? " present" : "";
    var futureClass = i > currentHour ? " future" : "";

    //Add an html elemnt for the time blocks
    var timeBlock = `
      <div id="${id}" class="row time-block${pastClass}${presentClass}${futureClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`;

      //append time blocks to the container
    container.append(timeBlock);  
  }

  //fucntion to update the color of the time blocks
  function updateTimeBlocks() {
    //getting the curren thour using day.js
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      //get hour from timeblock ID
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      
      $(this).removeClass('past present future');

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }



  //function to load users input to local storage
  function loadUserInput() {
    $(".time-block").each(function () {

      var blockId = $(this).attr("id");
      //retrive user input from local storage.
      var userInput = localStorage.getItem(blockId);
      //Set the value of the textarea to the retrieved user input
      $(this).find("textarea").val(userInput);

    });
  }

  //Set the text of the current day and center it
  $("#currentDay").text(dayjs().format("dddd, MMMM D")).addClass("text-center");

  //Call the functions to update time blocks, load user input, and set interval to update time block
  updateTimeBlocks();
  loadUserInput();

  setInterval(updateTimeBlocks, 60000);
  //Event handler for saving user input to localStorage
  $(".saveBtn").on("click", function () {
    //Get the description from the textarea
    var description = $(this).siblings("textarea").val();
    //Get the ID of the parent time block
    var blockId = $(this).parent().attr("id");
    //Save the description to localStorage with the time block ID as key
    localStorage.setItem(blockId, description);
    console.log("Event has been saved")
  });  

});


