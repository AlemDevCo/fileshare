document.addEventListener('DOMContentLoaded', function () {
    const repoOwner = 'AlemDevCo';
    const repoName = 'fileshare';
    const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;

    const fileList = document.getElementById('file-list');

// Function to create a file item and add it to the list
function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.textContent = `${file.name} (${file.type})`;

    fileItem.addEventListener('click', function () {
        // Open the file using the custom domain
        window.open(`https://fileshare.alemdev.org/${file.name}`, '_blank');
    });

    fileList.appendChild(fileItem);
}


    // Function to handle errors
    function handleError(error) {
        console.error('Error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'An error occurred while fetching files. Please try again later.';
        fileList.appendChild(errorDiv);
    }

    // Function to show loading indicator
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-message';
        loadingDiv.textContent = 'Loading files...';
        fileList.appendChild(loadingDiv);
    }

    // Fetch the list of files from the GitHub API
    showLoading();
    fetch(repoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(files => {
            // Remove loading indicator
            const loadingDiv = document.querySelector('.loading-message');
            if (loadingDiv) {
                fileList.removeChild(loadingDiv);
            }

            // Create file items
            files.forEach(file => {
                if (file.type === 'file') {
                    createFileItem(file);
                }
            });
        })
        .catch(error => handleError(error));
});
