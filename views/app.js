$("#add-product-card").hide();

// shorthand for $(document).ready(...)
$(function () {
  $.ajax("/api/products", {
    type: "GET",
    contentType: "application/json; charset=utf-8"
  }).then(
    function (resp) {
      resp.forEach(function (el) {
        // Create the new row
        const newRow = $("<tr>").append(
          $("<td>").text(el.item_id),
          $("<td>").text(el.product_name),
          $("<td>").text(el.department_name),
          $("<td>").text(el.price),
        );

        // Append the new row to the table
        $("#product-table > tbody").append(newRow);
      });
    }
  );

  $("#purchase").on("click", function () {
    $.ajax("/api/products/" + parseInt($("#product-id-input").val()), {
      type: "PUT",
      data: {
        quantityRequested: parseInt($("#quantity").val())
      }
    }).then(
      // TODO:
      function (resp) {
        $(".purchase-modal-body").empty();
        console.log("------------------------");
        console.log(resp[0].price);
        if (resp[0].stock_quantity >= $("#quantity").val()) {
          $(".purchase-modal-body").text("Your total is $" + resp[0].price * parseInt($("#quantity").val()) + ". ")
            .append("We will ship your item '"
              + resp[0].product_name + "' (quantity: "
              + $("#quantity").val() + ") within three business days.");
        } else {
          $(".purchase-modal-body").text("Sorry, we only have " + resp[0].stock_quantity + " available.");
        }
        $("#purchase-complete-modal").show();
      }
    );
  });

  $(".close").on("click", function () {
    $("#purchase-complete-modal").hide();
  });
});
