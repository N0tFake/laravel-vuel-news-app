import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from 'vue-toast-notification';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [],
    loading: false,
    error: null,
  }),

  actions: {

    async getNews(){

      this.loading = true;

      try {
        const response = await axios.get('/news');
        this.news = response.data.news;

      } catch (error) {
        this.error = error;

      } finally {
        this.loading = false;

      }
    },

    async createNews(data){
      try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.content);

        if (data.image) {
          formData.append('image', data.image);
        }

        console.log("data", formData);

        const response = await axios.post('/news', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("response", response);

      } catch (error) {
        this.error = error;

      }
    },

    async updateNews(data){
      // Possivel solucao: Mudar o metodo para POST pq o php n lida com update de arquivo
      // OU nao permitir update de imagem
      try {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.content);

        // if (data.image) {
        //   formData.append('image', data.image);
        // }


        const response = await axios.put(`/news/${data.id}`, formData);

        console.log("response", response);
        this.getNews();

      } catch (error) {
        this.error = error;
      }
    },

    async deleteNews(id){
      try {
        await axios.delete(`/news/${id}`);
        this.getNews();
      } catch (error) {
        this.error = error;
      }
    }
  }
});