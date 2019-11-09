jQuery('#datetimepickerStart').datetimepicker();
jQuery('#datetimepickerEnd').datetimepicker();


//search for reservations
$(document).ready(function(){
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#reservationsTable tbody tr").filter(function() {
        if($(this).hasClass("visible")){
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        }
      });
    });
});


//type of reservations
$(document).ready(function(){
  $("#typeReservation").change(function(){
      var type = $(this).val();
      var currentDate = new Date();

      if(type === "Incoming"){
        $("#reservationsTable tbody tr").filter(function(){
          if(new Date($("#end", this).text()) < currentDate){
            $(this).hide().removeClass("visible");
          }
        });
      }
      else if(type === "All"){
        $("#reservationsTable tbody tr").show().addClass("visible");
      }
  });
});


//search for users/rooms
$(document).ready(function(){
  $("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

//reset button
$(document).ready(function(){
  $("#reset").click(function(){
    $("input").not(":input[type=button], :input[type=submit], :input[type=reset]").val("");
  });
});