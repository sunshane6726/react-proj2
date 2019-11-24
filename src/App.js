import React from 'react';
//import logo from './logo.svg';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      title: "",
      content: "",
      results : [],
    }
  }

  hanglingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handlingSubmit = async (event) => { //함수 앞에 비동기를 적어야 하다.
    event.preventDefault() // event의 기본적인 기능을 사용 안함
    let result = await api.createPost(
      {
        title: this.state.title,
        content: this.state.content,
      }
    )
    console.log("작성 완료!", result)
  }

  componentDidMount(){
    this.getPosts()

  }

  async getPosts(){
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data}) //_보틍 파라미터일때 _result등의 내용들을선언한다.

  }

    render(){
    return (
      <div className="App">
        <div className = "PostingSection">
          <h2>대나무 숲 글 작성하기</h2>
          <form onSubmit = {this.handlingSubmit}>
            <input
            name="title"
            value = {this.state.title}
            onChange= {this.hanglingChange}/>
            <br /><br />
            <textarea
            name="content"
            value = {this.state.content}
            onChange= {this.hanglingChange}/>

            <br/>
            <button type = "submit">제출하기</button>

          </form>
         
        </div>
        <div className = "ViewSection">
          {
            this.state.results.map(
              (post) => <PostView
              key = {post.id}
              title ={post.title}
              content = {post.content}/>
            )

          }
          

        </div>
      
      </div>
    );
  }
}

export default App;
