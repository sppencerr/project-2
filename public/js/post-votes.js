async function showVotesHandler(e) {
    e.preventDefault();
    // select grandparent as post meta
    const postMetaEl = e.target.parentElement.parentElement;
    // select second child as vote el
    const voteEl = postMetaEl.querySelector('.post-votes');

    if (voteEl.style.display === 'block') {
        voteEl.style.display = 'none';
    } else {
        voteEl.style.display = 'block';
    }
};

const voteDataBtns = document.querySelectorAll('.btn-vote-count')
voteDataBtns.forEach(button => {
    button.addEventListener('click', showVotesHandler);
});