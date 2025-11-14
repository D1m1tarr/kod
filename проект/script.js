document.addEventListener('DOMContentLoaded', function() {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const likeBtn = item.querySelector('.like-btn');
        const dislikeBtn = item.querySelector('.dislike-btn');
        const likesCount = item.querySelector('.likes');
        const dislikesCount = item.querySelector('.dislikes');
        const commentInput = item.querySelector('.comment-input');
        const commentSubmit = item.querySelector('.comment-submit');
        const commentsList = item.querySelector('.comments-list');

        likeBtn.addEventListener('click', () => {
            let currentLikes = parseInt(likesCount.textContent);
            likesCount.textContent = currentLikes + 1;
        });

        dislikeBtn.addEventListener('click', () => {
            let currentDislikes = parseInt(dislikesCount.textContent);
            dislikesCount.textContent = currentDislikes + 1;
        });

        commentSubmit.addEventListener('click', () => {
            const commentText = commentInput.value;
            if (commentText.trim() !== '') {
                const newComment = document.createElement('li');
                newComment.textContent = commentText;
                commentsList.appendChild(newComment);
                commentInput.value = '';
            }
        });
    });

    const surveyForm = document.getElementById('surveyForm');
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Ви благодариме што ја пополнивте анкетата!');
            surveyForm.reset();
        });
    }
});