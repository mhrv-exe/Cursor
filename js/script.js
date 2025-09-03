(function(){
  const feedList = document.getElementById('feed');
  const postInput = document.getElementById('post-input');
  const postBtn = document.getElementById('post-btn');

  function createPostElement({ id, authorName, authorAvatar, text, mediaUrl }){
    const li = document.createElement('li');
    li.className = 'post card';
    li.dataset.postId = String(id);
    li.innerHTML = `
      <div class="post__head">
        <img class="avatar" src="${authorAvatar}" alt="${authorName}" />
        <div>
          <div class="post__author">${authorName}</div>
          <div class="post__meta">just now · Friends</div>
        </div>
        <button class="icon-btn more">⋯</button>
      </div>
      <div class="post__text"></div>
      ${mediaUrl ? `<img class="post__media" src="${mediaUrl}" alt="" />` : ''}
      <div class="post__actions">
        <button class="like-btn" aria-pressed="false">👍 Like</button>
        <button class="comment-btn">💬 Comment</button>
        <button class="share-btn">↗ Share</button>
      </div>
      <div class="post__comments">
        <ul class="comments"></ul>
        <div class="comment-composer">
          <input type="text" placeholder="Write a comment..." />
          <button class="btn add-comment">Send</button>
        </div>
      </div>
    `;
    li.querySelector('.post__text').textContent = text;
    return li;
  }

  function handleLike(button){
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!isPressed));
    button.textContent = !isPressed ? '💙 Liked' : '👍 Like';
    button.style.background = !isPressed ? 'rgba(46,137,255,0.15)' : '';
    button.style.borderColor = !isPressed ? '#2e89ff' : '';
    button.style.color = !isPressed ? '#94c2ff' : '';
  }

  function addComment(root, text){
    const ul = root.querySelector('.comments');
    const li = document.createElement('li');
    li.className = 'comment';
    li.innerHTML = `
      <img class="avatar" src="https://i.pravatar.cc/32?img=1" alt="You" />
      <div class="bubble">
        <strong>You</strong><br/>
        <span></span>
      </div>
    `;
    li.querySelector('span').textContent = text;
    ul.appendChild(li);
  }

  function wirePostInteractions(postEl){
    const likeBtn = postEl.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => handleLike(likeBtn));

    const addCommentBtn = postEl.querySelector('.add-comment');
    const input = postEl.querySelector('.comment-composer input');
    const submit = () => {
      const value = input.value.trim();
      if(!value) return;
      addComment(postEl, value);
      input.value = '';
    };
    addCommentBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ e.preventDefault(); submit(); }
    });
  }

  function wireExistingPosts(){
    document.querySelectorAll('.post').forEach(wirePostInteractions);
  }

  function initComposer(){
    if(!postBtn || !postInput || !feedList) return;
    const create = () => {
      const text = postInput.value.trim();
      if(!text) return;
      const newPost = createPostElement({
        id: Date.now(),
        authorName: 'You',
        authorAvatar: 'https://i.pravatar.cc/40?img=1',
        text,
        mediaUrl: ''
      });
      feedList.prepend(newPost);
      wirePostInteractions(newPost);
      postInput.value = '';
    };
    postBtn.addEventListener('click', create);
    postInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ e.preventDefault(); create(); }
    });
  }

  wireExistingPosts();
  initComposer();
})();