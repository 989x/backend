import React from 'react'
import "./post.css"

export default function Post() {
    return (
        <div className="post">
            <img 
                className="postImg"
                src="https://imgv3.fotor.com/images/homepage-feature-card/Fotor-photo-effects.jpg" 
                alt="" 
            />
            <div className="postInfo">
                <div className="postsCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Music</span>
                </div>
                <span className="postTitle">
                    Lorem ipsum dolor sit amet
                </span>
                <hr />
                <span className="postDate">1 hour ago</span>
            </div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita eaque 
                ab assumenda voluptate voluptatem pariatur eius unde, ullam facilis rerum 
                nventore ea non tenetur quis dolorem doloremque ut quam recusandae?
            </p>
        </div>
    )
}
