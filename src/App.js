import React from 'react';
//import logo from './logo.svg';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
//import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import { string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    
      title: "",
      content: "",
      results : [],
    }
  }



  SimpleBottomNavigation = (event) => {
  const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
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

  
  handlingDelete = async (id) => {
    await api.deletePost(id) //비동기적으로해야됨 동기적으로하면 읽어버리는 중간에 화면에 표시되어 오작동한다.
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
              //key = {this.state.id} 존재 x
              id="outlined-basic"
              label="title"
              name = "title"
              //className={classes.textField}
              value={this.state.title}
              onChange={this.handlingChange}
              margin= "normal"
              variant="outlined"             
              />

              <TextField
              
              label="content"
              name = "content"
              multiline
              rows="10"
              //className={classes.textField}
              value={this.state.content}
              onChange={this.handlingChange}
              margin="normal"
              variant="outlined"
              />      
              
              <Button type = "submit" variant="outlined" color="primary" >제출하기</Button>

            
            </form>

            <BottomNavigation>
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
          

            </Paper>
          
          </div> 
          <div className = "ViewSection"> 
            {
              this.state.results.map((post)=>
                <div>
                  <PostView key = {post.id} id = {post.id} title ={post.title} content ={post.content} handlingDelete = {this.handlingChange} />

                </div>
                  
                 //elements요소를 넣어줘야한다. jsx계열의 에러를 없애기위해서 필요, value값을 확인하기위해서 
               // 컴파일 과정에서 valuse값이 사라지기때문에 함수로 만들어 바꿔주는 것이 좋다.
              ) 

            }
            
          
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
