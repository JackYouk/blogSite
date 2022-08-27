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
// show comments button
// const commentsBtn = document.querySelector('.commentsBtn');

// commentsBtn?.addEventListener('click', async (event) => {
//     const postId = event.target.id;
//     // document.getElementById("MyElement").classList.add('MyClass');
//     // document.getElementById("MyElement").classList.remove('MyClass');

// });


const commentForm = document.querySelector('.form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const commentText = document.querySelector('input[name="commentText"]').value.trim();

    try {
        const postId = event.target.id;
        const response = await fetch(`/api/comment/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: commentText,
            })
        });

        await response.json();
        // window.location.reload();
    } catch (error) {
        alert({error});
    }
})

// postCommentBtn?.addEventListener('click', async (event) => {
//     event.preventDefault();
//     console.log(postCommentInput.value);

//     if(postCommentInput.value.trim().length === 0){
//         alert('post cannot have empty fields');
//         return;
//     }

//     try {
//         const postId = event.target.id;
//         const response = await fetch(`/api/comment/${postId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 comment: postCommentInput.value,
//             })
//         });

//         await response.json();
//         window.location.reload();
//     } catch (error) {
//         alert({error});
//     }
// });

