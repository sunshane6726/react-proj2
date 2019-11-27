import React, { Component } from 'react'



//_onDelete = () => {
//    this.props.Delete(this.props.id)
//}


export default class PostView extends Component {
    render() {
        const {id,title,content} = this.props
        
        return (
            <div>
                <h3> 게시글 번호 : {id}</h3>
                <h5> 게시글 제목: {title}</h5>
                <p> 게시글 내용 :{content}</p>
            
                
            </div>
        )
    }
}
