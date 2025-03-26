import React, { useState, useEffect } from 'react';
import { Post } from './types/interface';
import { api } from './services/api';
import './App.scss';

function App() {
  const [posts, setPosts] = useState<Post[]>([]); // Explicitly define state variable as array
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await api.getPosts();
    setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refreshing
    await api.createPost(title, content);
    setTitle('');
    setContent('');
    loadPosts();
  }

  return (
    <div className="App">
      <h1>龍 Blog</h1>

      {/* Post creation form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
        />
        <button type="submit">Create Post</button>
      </form>

      {/* Posts list */}
      <div className='posts'>
        {posts.map(post => (
          <div key={post.id} className='post'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>(new Date(post.created_at).toLocaleDateString)</small>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
