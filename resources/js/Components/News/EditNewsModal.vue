<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    visible: Boolean,
    newsItem: Object
  });

  const emit = defineEmits(['update', 'close']);

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

  const submitForm = () => {
    console.log('form', form.value);
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
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" id="title" v-model="form.title" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content</label>
          <textarea id="content" v-model="form.content" class="form-control" required></textarea>
        </div>
        <!-- <div class="mb-3">
          <label for="image" class="form-label">Image</label>
          <input type="file" id="image" @change="handleFileUpload" class="form-control">
        </div> -->
        <button type="submit" class="btn btn-primary">Update</button>
        <button type="button" @click="closeModal" class="btn btn-secondary">Close</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .edit-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .btn {
    margin-right: 10px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  </style>