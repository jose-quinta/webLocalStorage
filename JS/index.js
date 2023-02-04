let container = document.querySelector('#posts-container');
let title = document.querySelector('.modal-title');
let content = document.querySelector('.modal-body');
let posts = getArrayItems('posts');

const openModal = (data) => {
    let text = getItem(data[2]).join(',');
    title.innerText = data[1];
    content.children[0].innerText = text;
};

const createPostsCards = () => {
    let maxPosts = 0;
    for (let i = posts.length - 1; i >= 0; i--) {
        if (posts[i][4] !== 'No' && maxPosts < 6) {
            let text = getItem(posts[i][2]).join(',');

            container.innerHTML += `<div class="card col-md-4 p-2">
                        <div class="card-body">
                            <h5 class="card-title"> ${posts[i][1]} </h5>
                            <p class="card-text"> ${text.substring(0, 200)} </p>
                            <p class="card-text text-end">
                                <button type="button" id="openModal_${i}" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Open post
                                </button>
                            </p>
                        </div>
                    </div>`;
            maxPosts += 1;
        }
    }
};

const giveFunctionButtonsModals = () => {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i][4] !== 'No') {
            button = '#openModal_' + String(i);
            document.querySelector(button).addEventListener('click', () => {
                openModal(posts[i]);
            }, false);
        }
    }
};

window.addEventListener('load', () => {
    createPostsCards();
    giveFunctionButtonsModals();
}, false);