let currentPage = 1;
const perPage = 10; 

function searchUser() {
    const username = document.getElementById('username').value;
    const reposList = document.getElementById('reposList');
    const loader = document.getElementById('loader');

    loader.style.display = 'block';

    reposList.innerHTML = '';

    fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`)
        .then(response => response.json())
        .then(repos => {
            loader.style.display = 'none';

            repos.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.innerHTML = `<div class="repository">
                                         <p><strong>${repo.name}</strong>: ${repo.description}</p>
                                         ${repo.topics ? `<p class="topics">Topics: ${repo.topics.join(', ')}</p>` : ''}
                                     </div>`;
                reposList.appendChild(repoItem);
            });

            addPaginationButtons(repos);
        })

        .catch(error => {
            loader.style.display = 'none';
            console.error('Error fetching data:', error);
            reposList.innerHTML = '<p>Error fetching data. Please try again.</p>';
        });


}

function addPaginationButtons(repos) {
    const totalPages = Math.ceil(100 / perPage);
    console.log('Repositories:', repos);

    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            searchUser();
        }
    });

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            searchUser();
        }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    reposList.appendChild(paginationContainer);
}