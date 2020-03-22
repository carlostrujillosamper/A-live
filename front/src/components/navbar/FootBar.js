import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class FootBar extends Component {
    constructor(){
        super()
        this.state = {
            myArtists : false,
            myEvents : false,
            feed : false,
            search : false
        }

         
    }
    pressIcon = (e) => {
      console.log(e.target.name)
      Object.keys(this.state).forEach(key=>{
        key !== e.target.name?
        this.setState({
          [key]:false
      }):this.setState({
        [e.target.name]:true
      })
      })

    }
  render() {
      console.log(this.state)
      
    return (
        <div className="foot-bar">
            <Link to='/topartists'>
          <div className="my-artists-icon"  onClick={(e) => this.pressIcon(e)}>
              {!this.state.myArtists?
            <img name='myArtists' src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584019106/Group_5_bw1n61.png"></img>
            :<img name='myArtists' src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584019758/Group_9_gmuybh.png"></img>}
          </div>
          </Link>
          <Link to='/my-events'>
          <div className="my-events-icon" onClick={(e) => this.pressIcon(e)}>
            {!this.state.myEvents?
          <img name='myEvents' src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584019331/Group_6_zdjuqf.png"></img>
          :<img name='myEvents' src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584031736/Group_11_klxg67.png"></img>}
          </div>
          </Link>
          <Link to='/discover'>
          <div className="feed-icon" onClick={(e) => this.pressIcon(e)}>
            {!this.state.feed?
          <img name="feed" src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584873525/Group_15_vgvlvu.png"></img>
          :<img name="feed" src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584873542/Group_15_r7k2oe.png"></img>}
          </div>
          </Link >
          <Link to='/search'>
          <div className="search" onClick={(e) => this.pressIcon(e)}>
            {!this.state.search?
          <img name="search" src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584019468/Group_8_aht93z.png"></img>
          :<img name="search" src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584031767/Group_12_lrrh23.png"></img>}

          </div>
          </Link>
        </div>
    );
  }
}
