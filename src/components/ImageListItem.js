import React from 'react';

const ImageListItem = (props) =>{
        return(
                <li>
                    <img src={props.url} data-image={props.regular} alt="" onClick={props.handleClick}/>
                </li>  
        );
}


export default ImageListItem;