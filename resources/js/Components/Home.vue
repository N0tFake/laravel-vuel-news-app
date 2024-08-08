<template>
  
  <h1>News</h1>
  <router-link to="/news/create" class="create-news-link">Criar notícia</router-link>
  
  <div class="news-container">
    <ul v-if="news.length">
      <li v-for="post in news" :key="post.id" class="news-item">
        <div class="news-content">
          <img :src="post.image" v-if="post.image" :alt="post.title">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <small>Posted {{ formatDate(post.created_at) }}</small>
        </div>
        <div class="news-actions">
          <button @click="editPost(post)" class="edit-button">Edit</button>
          <button @click="deletePost(post.id)" class="delete-button">Delete</button>
        </div>
      </li>
    </ul>
    <div v-else class="empty-news">
      <img :src="emptyImg" alt="empty">
      <p>No news available at moment. Please check back later!</p>
    </div>
  </div>

  <EditNewsModal 
    :visible="isEditing"
    :newsItem="selectNewsItem"
    @update="updateNews"
    @close="isEditing = false"
  />

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../Stores/NewsStores';
import EditNewsModal from './News/EditNewsModal.vue';
import { formatDistanceToNow, parseISO } from 'date-fns';

const { news, loading, error } = storeToRefs(useNewsStore());
const newsStore = useNewsStore();

const isEditing = ref(false);
const selectNewsItem = ref(null);

const getImgEmptyUrl = () => {
  const domain = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`
  return `${domain}/storage/img-setup/empty-box.png`;
}

const emptyImg = getImgEmptyUrl();
console.log("emptyImg", emptyImg);

// Get News
onMounted(() => newsStore.getNews());

// Format date to show the time passed since the post was created
const formatDate = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
}

const editPost = (news) => {
  selectNewsItem.value = news;
  isEditing.value = true;
}

const updateNews = async (newsData) => {
  console.log("Dados enviados para updateNews:", newsData);
  await newsStore.updateNews(newsData);
  isEditing.value = false;
}

const deletePost = async (id) => {
  console.log(`Delete post with id: ${id}`);
  await newsStore.deleteNews(id);
  // Adicionar as notificacoes com o useToast().success('Notícia deletada com sucesso!');
}

</script>

<style scoped>
  .news-container {
    position: relative;
    padding: 20px;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .create-news-link {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  .create-news-link:hover {
    background-color: #2980b9;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .news-item {
    background-color: #ecf0f1;
    margin: 20px 0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    position: relative;
  }

  .news-item:hover {
    transform: scale(1.02);
  }

  .news-content {
    display: flex;
    flex-direction: column;
  }

  .news-actions {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
  }

  .news-item:hover .news-actions {
    display: flex;
    gap: 10px;
  }

  .edit-button, .delete-button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .edit-button:hover {
    background-color: #2980b9;
  }

  .delete-button {
    background-color: #e74c3c;
  }

  .delete-button:hover {
    background-color: #c0392b;
  }

  .empty-news {
    text-align: center;
    color: #7f8c8d;
    margin-top: 20px;
  }

  h2 {
    color: #34495e;
    margin-bottom: 10px;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 10px;
  }

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 10px;
  }
</style>
