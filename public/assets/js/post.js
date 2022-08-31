// CREATE POST -------------------------------------------------------------------------------
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const createPostBtn = document.getElementById('createPostBtn');

createPostBtn?.addEventListener('click', async (event) => {
    event.preventDefault();

    if(titleInput.value.trim().length === 0 || contentInput.value.trim().length === 0){
        alert('post cannot have empty fields');
        return;
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: titleInput.value,
                content: contentInput.value,
            })
        });

        await response.json();
        window.location.reload();
    } catch (error) {
        alert({error});
    }
});

// EDIT AND DELETE BUTTONS ------------------------------------------------------------------
// const editBtn = document.querySelector('.editBtn');
const deleteBtn = document.querySelector('.deleteBtn');

// editBtn?.addEventListener('click', async (event) => {
//     // fetch method PUT
// });

deleteBtn?.addEventListener('click', async (event) => {
    // fetch method DELETE
    try {
        const response = await fetch(`/api/posts/${event.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await response.json();
        window.location.reload();
    } catch (error) {
        alert(error);
    }
});

// COMMENT -----------------------------------------------------------------------------------
const commentBtns = document.querySelectorAll('.commentBtn');

commentBtns.forEach(commentBtn => {
    commentBtn?.addEventListener('click', async (event) => {
        event.preventDefault();
        const commentInput = event.target.previousElementSibling.value;

        try {
            const response = await fetch(`/api/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: commentInput,
                    postId: event.target.id,
                })
            });
    
            await response.json();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    });
});


