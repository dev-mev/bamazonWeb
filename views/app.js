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
    const chosenItem = parseInt($("#product-id-input").val());
    const quantityRequested = parseInt($("#quantity").val());

    $.ajax("/api/products/" + chosenItem, {
      type: "PUT",
      data: [{
        stock_quantity: quantityAfterPurchase,
        product_sales: totalProductSales
      },
      {
        item_id: chosenItem
      }]
    }).then(
      // TODO: 
      );
});
