<template>
  <div class="create-news-container">
    <h1>Create News</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="form.title" required>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="form.content" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNewsStore } from '../../Stores/NewsStores';
import axios from 'axios';

const newsStore = useNewsStore();

const form = ref({
  title: '',
  content: '',
  image: null
});

const handleFileUpload = (event) => {
  form.value.image = event.target.files[0];
};

const submitForm = async () => {
  newsStore.createNews(form.value);
  resetForm();
}

const resetForm = () => {
  form.value = {
    title: '',
    content: '',
    image: null
  };
}

</script>

<style scoped>
.create-news-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #34495e;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}
</style>
