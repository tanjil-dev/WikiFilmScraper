$(document).ready(function() {
        const overlay = document.getElementById('overlay');
        const dataContainer = document.getElementById('data-container');

        function showOverlay() {
            overlay.style.display = 'flex';
        }

        function hideOverlay() {
            overlay.style.display = 'none';
        }

        function fetchData() {
            showOverlay();
            url = `${base_url}/api/v1/film-api/`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    hideOverlay();
//                    window.location.reload();
                    table.ajax.reload();
                })
                .catch(error => {
                    hideOverlay();
                    dataContainer.innerHTML = 'An error occurred while fetching all data.';
                });
        }

        function deleteData() {
            url = `${base_url}/api/v1/film-api/delete/`;
            showOverlay();
            console.log(url);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    hideOverlay();
                    table.ajax.reload();
                })
                .catch(error => {
                    hideOverlay();
                    dataContainer.innerHTML = 'An error occurred while deleting all data.';
                });
        }


// CSRF token setup
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
var base_url = "http://0.0.0.0:8080";

var table = $('#myTable').DataTable({
        scrollX: true,
        pageLength: 10,
        ajax: `${base_url}/api/v1/film-api/list_create/`,
        columns: [
            { data: 'movie_name', orderable: false },
            { data: 'movie_link', orderable: false },
            { data: 'details', orderable: false },
            {
                data: null,
                className: "center",
                defaultContent: '<div class="btn-group">' +
                    '<button class="btn btn-sm btn-secondary edit-btn">Update</button>' +
                    '<button class="btn btn-sm btn-dark delete-btn">Delete</button>' +
                    '</div>',
                orderable: false,
            }
        ],
        initComplete: function() {
            this.api().columns([0, 1, 2]).every(function() {
                var column = this;
                var input = document.createElement("input");
                input.placeholder = 'Search ';
//                console.log($(column.title()).text());
                $(input).appendTo($(column.header()).empty())
                    .on('keyup change', function() {
                        if (column.search() !== this.value) {
                            column.search(this.value).draw();
                        }
                    });
            });
        }
    });

function updateButtons() {
        if (table.data().any()) {  // Check if there's any data in the DataTable
            $('#buttonContainer').html('<button type="button" class="btn btn-dark" onclick="deleteData()">Delete Data</button>');
        } else {
            $('#buttonContainer').html('<button type="button" class="btn btn-secondary" onclick="fetchData()">Fetch Data</button>');
        }
    }

    // Call the function after the table is initialized
    updateButtons();

    // Optionally, call this function after data is loaded via Ajax or other methods
    table.on('draw', function() {
        updateButtons();
    });

var selectedRowData;
var deleteRowData;

$('#myTable tbody').on('click', 'button.edit-btn', function () {
    // Get the selected row data
    selectedRowData = table.row($(this).parents('tr')).data();

    // Populate the modal fields with the selected row data
    $('#movieName').val(selectedRowData.movie_name);
    $('#movieLink').val(selectedRowData.movie_link);
    $('#details').val(selectedRowData.details);

    // Show the modal
    $('#editModal').modal('show');
});

$('#saveChangesBtn').on('click', function () {
    // Get the new values from the modal inputs
    var newMovieName = $('#movieName').val();
    var newMovieLink = $('#movieLink').val();
    var newDetails = $('#details').val();

    if (newMovieName && newMovieLink && newDetails) {
        // Make the AJAX call to update the data
        $.ajax({
            url: `${base_url}/api/v1/film-api/retrieve_update_delete/${selectedRowData.id}/`,
            type: 'PUT',
            headers: { 'X-CSRFToken': csrftoken },
            contentType: 'application/json',
            data: JSON.stringify({
                movie_name: newMovieName,
                movie_link: newMovieLink,
                details: newDetails
            }),
            success: function () {
                // Reload the table data after successful update
                table.ajax.reload();

                // Hide the modal
                $('#editModal').modal('hide');
            },
            error: function (error) {
                console.error('Error updating data:', error);
            }
        });
    } else {
        alert("Please fill out all fields before saving.");
    }
});


$('#myTable tbody').on('click', 'button.delete-btn', function () {
    // Get the data for the row to be deleted
    deleteRowData = table.row($(this).parents('tr')).data();

    // Show the confirmation modal
    $('#deleteModal').modal('show');
});

// Handle confirm delete button click
$('#confirmDeleteBtn').on('click', function () {
    if (deleteRowData) {
        // Make the AJAX call to delete the data
        $.ajax({
            url: `${base_url}/api/v1/film-api/retrieve_update_delete/${deleteRowData.id}/`,
            type: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            success: function () {
                // Reload the table data after successful deletion
                table.ajax.reload();

                // Hide the confirmation modal
                $('#deleteModal').modal('hide');
            },
            error: function (error) {
                console.error('Error deleting data:', error);
            }
        });
    }
});
});