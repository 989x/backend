import React from 'react'
import "./singlePost.css"

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img 
                    src="https://imgv3.fotor.com/images/homepage-feature-card/Fotor-photo-effects.jpg" 
                    alt="" 
                    className="singlePostImg" 
                />

                <h1 className="singlePostTitle">
                    Lorem ipsum dolor sit amet.
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"></i>
                        <i className="singlePostIcon far fa-trash-alt"></i>
                    </div>
                </h1>

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <b>Safak</b>
                    </span>
                    <span className="singlePostDate">1 hour ago</span>
                </div>

                <p className="singlePostDesc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque facilis 
                    architecto illum molestiae, a in consectetur nihil dolore dicta tenetur 
                    molestias voluptas harum, id officia corrupti, nulla rerum nostrum fugiat?

                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque facilis 
                    architecto illum molestiae, a in consectetur nihil dolore dicta tenetur 
                    molestias voluptas harum, id officia corrupti, nulla rerum nostrum fugiat?
                    
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque facilis 
                    architecto illum molestiae, a in consectetur nihil dolore dicta tenetur 
                    molestias voluptas harum, id officia corrupti, nulla rerum nostrum fugiat?

                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque facilis 
                    architecto illum molestiae, a in consectetur nihil dolore dicta tenetur 
                    molestias voluptas harum, id officia corrupti, nulla rerum nostrum fugiat?
                </p>
            </div>
        </div>
    )
}
