import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import {StyleSheet} from 'react-native';



//_onDelete = () => {
//    this.props.Delete(this.props.id)
//}
//const styles = StyleSheet.create({
 //   card_style_test1 : {
//        
//
//    }
//});
 


export default class PostView extends Component {

    _onDelete = () => {
    this.props.handlingDelete(this.props.id)
}

    render() {
       const card_style_test = {
           margin : "2rem",
           padding : "2rem",
       }
             
        //const {id,title,content} = this.props
        
        return (
            <div>
                <Card style = {card_style_test}>
                <CardContent>
                    <Typography padding = "5rem" color="textSecondary" gutterBottom >
                    게시글 : {this.props.id}                   
                               
                    </Typography>
                    <Typography variant="h5" component="h2" padding-bottom = "4rem">
                        게시글 제목 : {this.props.title}

                    </Typography>

                    <Typography color = "textSecondary" padding-bottom = "4rem"> 
                        게시글 내용 : {this.props.content}
                    </Typography>
                  </CardContent> 
                  <CardActions>
                    <Button size = "small" onClick = {this._onDelete}>삭제합니다.</Button>
                  </CardActions> 
                </Card> 
            
                
            </div>  
                 //elements요소를 넣어줘야한다. jsx계열의 에러를 없애기위해서 필요, value값을 확인하기위해서 
               // 컴파일 과정에서 valuse값이 사라지기때문에 함수로 만들어 바꿔주는 것이 좋다.
              ) 
        
    }
}
