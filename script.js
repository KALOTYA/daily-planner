
$(function () {

  var workHours = 9;
  var endHour = 17;
  var currentHour = dayjs().hour();
  var container = $(".container-fluid")

  for (var i = workHours; i <= endHour; i++) {
    var hour = i < 12 ? i + "AM" : i === 12 ? "12PM" : (i - 12) + "PM";
    var id = "hour-" + i;
    var pastClass = i < currentHour ? " past" : "";
    var presentClass = i === currentHour ? " present" : "";
    var futureClass = i > currentHour ? " future" : "";

    var timeBlock = `
      <div id="${id}" class="row time-block${pastClass}${presentClass}${futureClass}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`;

    container.append(timeBlock);  
  }

  function updateTimeBlocks() {
    //getting the curren thour using day.js
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
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




  function loadUserInput() {
    $(".time-block").each(function () {

      var blockId = $(this).attr("id");

      var userInput = localStorage.getItem(blockId);

      $(this).find("textarea").val(userInput);

    });
  }


  $("#currentDay").text(dayjs().format("dddd, MMMM D")).addClass("text-center");

 
  updateTimeBlocks();
  loadUserInput();

  setInterval(updateTimeBlocks, 60000);

  $(".saveBtn").on("click", function () {
    var description = $(this).siblings("textarea").val();

    var blockId = $(this).parent().attr("id");

    localStorage.setItem(blockId, description);
    console.log("Event has been saved")
  });  

});


