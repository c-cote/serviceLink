var categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6"
];


// helper function to move elements in array
// courtesy of w3resource
function move(arr, old_index, new_index) {
  while (old_index < 0) {
      old_index += arr.length;
  }
  while (new_index < 0) {
      new_index += arr.length;
  }
  if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
          arr.push(undefined);
      }
  }
   arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
 return arr;
}


// make table sortable
$('tbody').sortable({
  start: function(event, ui) {
    // set initial index of element
    var start_pos = ui.item.index();
    ui.item.data('start_pos', start_pos);
  },
  update: function(event, ui) {
    // get initial index of element
    var start_pos = ui.item.data('start_pos');
    // set updated index of element
    var end_pos = ui.item.index();
    // move element in array and call renderTable
    move(categories, start_pos, end_pos);
    renderTable();
  }
});


// render table elements
function renderTable() {
   // enable add category link again
   $("#addCategoryInactive").replaceWith(`
   <a href="#" id="addCategory">+ ADD CATEGORY</a>
   `);

  // clear existing elements
  $("#categoryTable").empty();

  // append row for each element in array
  var i;
  for (i = 0; i < categories.length; i++) {
    $("#categoryTable").append(`              
<tr class="d-flex" id="categorySelected">
<td class="col-1">
  <span style="color: #afbec3;">
    <i class="fas fa-bars fa-xs"></i>
  </span>
</td>
<td class="col-4">${categories[i]}</td>
<td class="col-5"><span class="badge badge-sequence">${i + 1}</span></td>
<td class="col-2">
  <div class="category-delete">
    <button type="button" class="btn btn-delete btn-circle btn-sm" id=${i}>
      <i class="fas fa-times" id="${i}"></i>
    </button>
  </div>  
</td>
</tr>`);
  }
}


// add category
$(".category-add").on("click", "#addCategory", function() {
  // disable add category link
  $("#addCategory").replaceWith(`
    <span class="inactive" id="addCategoryInactive">+ ADD CATEGORY</span>
  `);
  // append add category element to table 
  $("#categoryTable").append(`              
  <tr class="d-flex">
  <td class="col-1">
  <td class="col-4">
      <input type="text" class="input-add" id="newCategory" placeholder="Category Name">
  </td>
  <td class="col-5"><span class="badge badge-sequence">${categories.length + 1}</span></td>
  <td class="col-2">
    <div class="category-save">
      <a href="#" id="saveCategory">SAVE</a>
    </div>
  </td>
</tr>
  `);
});


// click save button to add category to array
$("#categoryTable").on("click", "#saveCategory", (function() {
  // add category to array
  // render table again
  categories.push($("#newCategory").val());
  renderTable();
}));


// delete category
$("#categoryTable").on("click", ".btn-delete", function(e) {
  // remove category from array
  // render table again
  categories.splice(e.target.id, 1);
  renderTable();
});


// render table 
$("document").ready(function() {
  renderTable();
});
