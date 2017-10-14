import React from 'react';
import Pagination from "react-js-pagination";
import ImageListItem from './ImageListItem';
import ImageNotFound from './ImagesNotFound';
import Spinner from './Spinner';


const ImageList = (props) =>{
    let imageItems;
    if(!props.isLoading){
        if(props.images !== null && props.images.length > 0){
            imageItems = props.images.map((image) =>
                <ImageListItem url = {image.urls.small} key = {image.id} regular = {image.urls.regular} {...props}/>
            )
        }
        else if(props.images !== null && props.images.length === 0){
            imageItems = <ImageNotFound/>
        }
    }
    else{
        imageItems = <Spinner />
    }
    return(
        <div className="listOfImages">
        <ul>
            {imageItems}
        </ul>
        {props.images !== null && props.images.length > 0 && !props.isLoading &&
        <Pagination
            activePage={props.activePage}
            itemsCountPerPage={21}
            totalItemsCount={props.total}
            pageRangeDisplayed={10}
            onChange={props.handlePageChange}
        />
        }
        </div>
    )
}


export default ImageList;