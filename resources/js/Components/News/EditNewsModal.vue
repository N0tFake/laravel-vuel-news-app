<script setup>
  import { ref, watch } from 'vue';
  import { useNewsStore } from '../../Stores/NewsStores';
  import { useToast } from 'vue-toast-notification';

  const toast = useToast();

  const props = defineProps({
    visible: Boolean,
    newsItem: Object
  });

  const emit = defineEmits(['update', 'close']);
  const store = useNewsStore();

  const form = ref({
    id: null,
    title: '',
    content: '',
    image: null
  });

  watch(() => props.newsItem, (newVal) => {
    if (newVal) {
      form.value.id = newVal.id;
      form.value.title = newVal.title;
      form.value.content = newVal.content;
      form.value.image = null;
    }
  }, { immediate: true });

  const handleFileUpload = (event) => {
    form.value.image = event.target.files[0];
  };

  const submitForm = async () => {
    emit('update', form.value);
  };

  const closeModal = () => {
    emit('close');
  };
  </script>

<template>
  <div v-if="visible" class="edit-modal">
    <div class="modal-content">
      <h2>Edit News</h2>
      <form @submit.prevent="submitForm" class="container-inputs">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" id="title" v-model="form.title" class="form-control input-title" required>
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <textarea id="content" v-model="form.content" class="form-control input-content" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <button type="button" @click="closeModal" class="btn btn-secondary">Close</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }


  h2 {
    margin-top: 0;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-control {
    width: 95%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .input-content {
    height: 150px;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    margin-right: 0.5rem;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
</style>