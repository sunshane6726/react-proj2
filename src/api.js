import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default {
    // 모든 글 불러오기
    getAllPosts(){
        return axios.get('/posts/')

    },

    //글 작성하기
    createPost(data){
        return axios.post('/posts/',data)
    },

    deletePost(id){
        return axios.delete('/posts/'+String(id))
    }, // 특정 id를 삭제하는 기능을 넣었다 API 명세를 통해서
}