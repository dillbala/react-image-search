import React from 'react';
import Spinner from './Spinner';

const PreviewImage = (props) => {
    return(
        <div className="overlay" onClick={props.onCloseRequest}>
            <div className="overlayInner">
                    <img src={props.src} alt="" onLoad={props.handleImageLoaded}/>
                <div>
                    <a href={props.src} download><button>DOWNLOAD</button></a>
                </div>
            </div>
            <div className="overlayInner">
            {
                !props.imageStatus &&
                <Spinner />
            }
            </div>
        </div>
    )
}

export default PreviewImage;