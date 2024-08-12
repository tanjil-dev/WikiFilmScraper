var base_url = "https://tanjiljp.pythonanywhere.com";
var table;
function deleteData() {
    if (confirm("Are you sure you want to delete all data?")) {
        var url = `${base_url}/api/v1/film-api/delete/`;
        showOverlay();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                hideOverlay();
                table.ajax.reload();
            })
            .catch(error => {
                hideOverlay();
                document.getElementById('alert').innerHTML = 'An error occurred while deleting data.';
                setTimeout(function () { document.getElementById('alert').innerHTML = ''; }, 5000);
            });
    }
}
function fetchData() {
    if (confirm("Are you sure you want to fetch all data?")) {
        showOverlay();
        var url = `${base_url}/api/v1/film-api/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                hideOverlay();
                table.ajax.reload();
            })
            .catch(error => {
                hideOverlay();
                document.getElementById('alert').innerHTML = 'An error occurred while fetching data.';
                setTimeout(function () { document.getElementById('alert').innerHTML = ''; }, 5000);
            });
    }
}
const overlay = document.getElementById('overlay');
function showOverlay() {
    overlay.style.display = 'flex';
}
function hideOverlay() {
    overlay.style.display = 'none';
}

$(document).ready(function () {
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

    table = $('#myTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                text: 'Copy to Clipboard',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excelHtml5',
                text: 'Export to Excel',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'pdfHtml5',
                text: 'Export to PDF',
                orientation: 'landscape',
                pageSize: 'A4',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'print',
                text: 'Print Table',
                orientation: 'landscape',
                pageSize: 'A4',
                exportOptions: {
                    columns: [0, 1, 2]
                }
            }
        ],
        columnDefs: [
        { "width": "10%", "targets": 0 }
    ],
        autoWidth: false,
        scrollX: true,
        pageLength: 10,
        ajax: `${base_url}/api/v1/film-api/list_create/`,
        columns: [
            { data: 'movie_name', orderable: false },
            {
                data: 'movie_link', orderable: false,
                render: function (data, type, row) {
                    return `<a class="btn btn-sm btn-secondary" href="${data}" target="_blank">${data}</a>`;
                },
            },
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
    });

    var selectedRowData;
    var deleteRowData;
    updateButtons();
    $('#myTable tbody').on('click', 'button.edit-btn', function () {
        selectedRowData = table.row($(this).parents('tr')).data();
        $('#movieName').val(selectedRowData.movie_name);
        $('#movieLink').val(selectedRowData.movie_link);
        $('#details').val(selectedRowData.details);
        $('#editModal').modal('show');
    });

    $('#saveChangesBtn').on('click', function () {
        var newMovieName = $('#movieName').val();
        var newMovieLink = $('#movieLink').val();
        var newDetails = $('#details').val();

        if (newMovieName && newMovieLink && newDetails) {
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
                    table.ajax.reload();
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
        deleteRowData = table.row($(this).parents('tr')).data();
        $('#deleteModal').modal('show');
    });

    $('#confirmDeleteBtn').on('click', function () {
        if (deleteRowData) {
            $.ajax({
                url: `${base_url}/api/v1/film-api/retrieve_update_delete/${deleteRowData.id}/`,
                type: 'DELETE',
                headers: { 'X-CSRFToken': csrftoken },
                success: function () {
                    table.ajax.reload();
                    $('#deleteModal').modal('hide');
                },
                error: function (error) {
                    console.error('Error deleting data:', error);
                }
            });
        }
    });


    function updateButtons() {
        if (table.data().any()) {
            $('#buttonContainer').html('<button type="button" class="btn btn-dark" onclick="deleteData()">Delete Data</button>');
        } else {
            $('#buttonContainer').html('<button type="button" class="btn btn-secondary" onclick="fetchData()">Fetch Data</button>');
        }
    }

    updateButtons();

    table.on('draw', function () {
        updateButtons();
    });

});