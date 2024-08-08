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
                    window.location.reload();

                })
                .catch(error => {
                    hideOverlay();
                    dataContainer.innerHTML = 'An error occurred while fetching data.';
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
                    window.location.reload();

                })
                .catch(error => {
                    hideOverlay();
                    dataContainer.innerHTML = 'An error occurred while fetching data.';
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

// Initialize DataTable
var table = $('#myTable').DataTable({
scrollX: true, // Enable horizontal scrolling
    deferRender: true,
    pageLength: 10,
    ajax: {
        url: `${base_url}/api/v1/film-api/list_create/`,
        dataSrc: 'data' // This tells DataTables to look for data inside the 'data' key of the JSON response
    },
    columns: [
        { data: 'movie_name' },
        { data: 'movie_link' },
        { data: 'details' },
        {
            data: null,
            className: "center",
            defaultContent: '<button class="edit-btn btn btn-primary">Edit</button> <button class="delete-btn btn btn-danger">Delete</button>'
        }
    ]
});


// Handle Edit Button Click
$('#myTable tbody').on('click', 'button.edit-btn', function () {
    var data = table.row($(this).parents('tr')).data();
    console.log(data);
    var new_movie_name = prompt("Edit Movie Name:", data.movie_name);
    var new_movie_link = prompt("Edit Movie Link:", data.movie_link);
    var new_details = prompt("Edit Details:", data.details);
    if (new_movie_name !== null && new_movie_link !== null && new_details !== null) {
        $.ajax({
            url: `${base_url}/api/v1/film-api/retrieve_update_delete/${data.id}/`,
            type: 'PUT',
            headers: { 'X-CSRFToken': csrftoken },
            contentType: 'application/json',
            data: JSON.stringify({ movie_name: new_movie_name, movie_link: new_movie_link ,details: new_details }),
            success: function () {
                table.ajax.reload();
            },
            error: function (error) {
                console.error('Error updating data:', error);
            }
        });
    }
    else{
        prompt("Please insert a value to edit!");
    }
});

// Handle Delete Button Click
$('#myTable tbody').on('click', 'button.delete-btn', function () {
    var data = table.row($(this).parents('tr')).data();
    if (confirm("Are you sure you want to delete this record?")) {
        $.ajax({
            url: `${base_url}/api/v1/film-api/retrieve_update_delete/${data.id}/`,
            type: 'DELETE',
            headers: { 'X-CSRFToken': csrftoken },
            success: function () {
                table.ajax.reload();
            },
            error: function (error) {
                console.error('Error deleting data:', error);
            }
        });
    }
});
