import React from 'react';
//import logo from './logo.svg';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
//import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

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
    this.setState({title:'',content:''})
    this.getPosts()
  }

  componentDidMount(){
    this.getPosts()

  }

  async getPosts(){
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data}) //_보틍 파라미터일때 _result등의 내용들을선언한다.

  }

  
  handlingDelete = async (event) => {
    await api.deletePost(event.target.value) //비동기적으로해야됨 동기적으로하면 읽어버리는 중간에 화면에 표시되어 오작동한다.
    this.getPosts() // 추가해야지 삭제기능을 시전할수가 있다.
  }


    render(){
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className = "PostingSection">
            <Paper className='PostingPaper'>
            <h2>대나무 숲 글 작성하기</h2>
            <form className = "PostingForm" onSubmit = {this.handlingSubmit}>
              
              <TextField
              id="outlined-name"
              label="title"
              name = "title"
              //className={classes.textField}
              value={this.state.title}
              onChange={this.handlingChange}
              margin="normal"
              variant="outlined"
              />

              <TextField
              id="standard-multiline-flexible"
              label="content"
              name = "content"
              multiline
              rowsMax="4"
              //className={classes.textField}
              value={this.state.content}
              onChange={this.handlingChange}
              margin="normal"
              variant="outlined"
              />      
              
              <Button type = "submit" variant="outlined" color="secondary">제출하기</Button>
            
            </form>
            </Paper>
          
          </div> 
          <div className = "ViewSection"> 
            {
              this.state.results.map(
                (post) => 
                <> 
                <PostView
                key = {post.id} 
                title ={post.title}
                content = {post.content}/>
                <button value={post.id} onClick={this.handlingDelete}>삭제하기</button> 
                </> // elements요소를 넣어줘야한다. jsx계열의 에러를 없애기위해서 필요, value값을 확인하기위해서
              ) // 

            }
            
          
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
