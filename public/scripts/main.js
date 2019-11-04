jQuery('#datetimepicker').datetimepicker();

$(document).ready(function(){
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable .row").filter(function() {
        if($(this).hasClass("visible")){
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        }
      });
    });
});

$(document).ready(function(){
  $("#typeReservation").change(function(){
      var type = $(this).val();
      var currentDate = new Date();

      if(type === "Incoming"){
        $("#myTable .row").filter(function(){
          if(new Date($("#end", this).text()) < currentDate){
            $(this).hide().removeClass("visible");
          }
        });
      }
      else if(type === "All"){
        $("#myTable .row").show().addClass("visible");
      }
  });
});

$(document).ready(function(){
  $("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(document).ready(function(){
  $("#reset").click(function(){
    $("input").not(":input[type=button], :input[type=submit], :input[type=reset]").val("");
  });
});