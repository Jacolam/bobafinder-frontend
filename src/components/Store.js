import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Store extends React.Component{
  state={
    like: false,
    like:this.props.favorite,
    visited: false
  }

  // componentDidMount(){
    // if this.props.visited {
    //   this.setState({
    //     visited:true
    //   })
    // }
    // this.props.favorited

  // }

  handleClickLike = (e) => {
    console.log(e.target.id)

    this.setState({
      like: !this.state.like
    })

    fetch('http://localhost:3000/favorite',{
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({store_id:e.target.id})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  handleClickVisited = (e) => {
    console.log(e.target.id)

    this.setState({
      visited: !this.state.visited
    })

    fetch('http://localhost:3000/visit',{
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({store_id:e.target.id})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  }

  // RENDER STORE IMG CONDITIONALLY
  storeImage = () => {
    if (this.props.store.name === 'Kung Fu Tea 功夫茶') {
      return <img src="data:image/jpeg;base64,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" alt="Kungfu Tea" />
    } else if(this.props.store.name === 'Gong Cha'){ return (
      <img src="data:image/jpeg;base64,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" alt="gong cha" />)
    } else if(this.props.store.name === 'Vivi Bubble Tea'){ return(
      <img src="https://duyt4h9nfnj50.cloudfront.net/resized/e6a414d5418d3494722bc4081e0c1200-w2880-6e.jpg" alt="vivi bubble tea" />)
    } else if(this.props.store.name === 'CoCo Fresh Tea & Juice'){ return(
      <img src="https://s3-media4.fl.yelpcdn.com/bphoto/49DAYwa9ylr8h0yxWBbhYw/l.jpg" alt="coco bubble tea" />)
    } else if(this.props.store.name === 'Boba Guys'){ return(
      <img src="https://www.godairyfree.org/wp-content/uploads/2018/03/27983429_1614603391966193_228545958204489517_o.jpg" alt="boba guys" />)
    } else {
      return(<img src="https://www.organicfacts.net/wp-content/uploads/bubbletea-1.jpg" alt="bubble tea" />)
    }
  }

  render(){
    console.log('Store Props', this.props)

    return (
      <Row className="store-container justify-content-md-center">
        <Col></Col>
        <Col md={10} sm={10} xs={12} className="store-conts">
          <div className="store-photo">

            {this.storeImage()}

          </div>
          <div className="store-detail">
            <h4>{this.props.store.name}</h4>
            <p>{this.props.store.address}</p>
            <div className="like" onClick={this.handleClickLike} id={this.props.store.id}>
              { this.state.like ?

                  (<img src="https://img.icons8.com/color/26/000000/filled-like.png" alt="full heart" id={this.props.store.id}/>) : (<img src="https://img.icons8.com/material-outlined/26/000000/filled-like.png" alt="empty heart" id={this.props.store.id} />) }
            </div>
            <div className="visited" onClick={this.handleClickVisited}>
            { this.state.visited ?
                <img src="https://img.icons8.com/color/32/000000/ok.png" alt="full checked" id={this.props.store.id}/> : <img src="https://img.icons8.com/material-outlined/32/000000/ok.png" alt="empty checked mark" id={this.props.store.id} /> }

            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}
export default Store;
