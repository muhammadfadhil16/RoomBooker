//start datetimepicker
jQuery('#datetimepickerStart').datetimepicker({
  step: 30
});
jQuery('#datetimepickerEnd').datetimepicker({
  step: 30
});


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

    //type of reservations
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

    //search for users/rooms
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tbody tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });

    //reset button
    $("#reset").click(function(){
      $("input").not(":input[type=button], :input[type=submit], :input[type=reset]").val("");
    });

    $(".errorMessage").delay(5000).fadeOut(10);
});
