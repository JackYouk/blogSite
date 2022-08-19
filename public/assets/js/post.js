const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const createPostBtn = document.getElementById('createPostBtn');

const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

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

editBtn?.addEventListener('click', async (event) => {
    // fetch method PUT
});

deleteBtn?.addEventListener('click', async (event) => {
    const postId = 0;

    // fetch method DELETE
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await response.json();
        window.location.reload();
    } catch (error) {
        alert({error});
    }
});

