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

        if (response.status != 201) {
          console.log("error", response.status);
          return false;
        }

        console.log("response", response);
        return true;

      } catch (error) {
        this.error = error;
        return false;
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
        const response = await axios.put(`/news/${data.id}`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status != 200) {
          console.log("error", response.status);
          return false;
        }
        
        this.getNews();
        return true
       

      } catch (error) {
        this.error = error;

        return false;
      }
    },

    async deleteNews(id){
      try {
        await axios.delete(`/news/${id}`);
        this.getNews();
        return true;
      } catch (error) {
        this.error = error;
        commit('setError', error);
        return false;
      }
    }
  }
});