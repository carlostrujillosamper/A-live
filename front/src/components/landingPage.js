import React, { Component } from 'react'

export default class landingPage extends Component {
    render() {
        return (
            <div className='landing-page'>
            <div className='landing-page-image'>
            <img src='https://res.cloudinary.com/dpi75nntc/image/upload/v1583938549/image_dy3xlr.png'></img>
            <div className='copy-img-container'>
            <img src='https://res.cloudinary.com/dpi75nntc/image/upload/v1583941616/Group_2_dgzpo6.png'></img>
            </div>
            
            <div className='half-bottom-container'>
            <img src='https://res.cloudinary.com/dpi75nntc/image/upload/v1583942747/I_m_afraid_concerts_spoil_people_for_everyday_life._pfnv73.png'></img>

            <a href={`${process.env.REACT_APP_URL}/login/spotify`} >
                <img src='https://res.cloudinary.com/dpi75nntc/image/upload/v1583941925/Group_3_qsrqae.png'></img>
            </a>
            </div>
            </div>
            </div>
        )
    }
}
