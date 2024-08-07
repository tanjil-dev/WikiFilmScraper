new DataTable('#myTable', {
            scrollX: true
        });

        //var base_url = "https://tanjil95.pythonanywhere.com"; //Prod url
        var base_url = "http://0.0.0.0:8000"; //local url

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