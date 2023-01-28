import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const ModalOverlay = (props) =>{
    return (
        <div className={classes.modal}>
            {/* !!!!! */}
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const Backdrop = (props) =>{
    return (
        <div className={classes.backdrop} onClick={props.onClick_}></div>
    )
}

function Modal (props) {
    const portalId = document.getElementById('overlays');
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalId)}
            {ReactDOM.createPortal(<Backdrop onClick_={props.onCloseCART}></Backdrop>, portalId)}
        </React.Fragment>

    )
}

export default Modal;