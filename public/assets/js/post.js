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
                titleInput: titleInput.value,
                contentInput: contentInput.value,
            })
        });

        await response.json();
        window.location.reload();
    } catch (error) {
        alert({error});
    }
});