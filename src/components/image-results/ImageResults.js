import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {
  state = { 
    // open is a prop that toggles from 'true' to 'false' for Dialog material-ui component
    open: false,
    // prop that contains url for enlarged image in the Dialog component
    currentImg: ''
  }

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    let imageListContent;
    // pulls images out of this.props so I don't have to use 'this.'
    const { images } = this.props;

    if (images) {
      imageListContent = (
        // setting columns to 3
        <GridList cols={3}>
          {/*mapping through images array and using api props in GridTile material-ui
            components*/}
          {images.map(img => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                // set url of currentImg prop of state to largeImageURL prop of img from api
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white"/>
                </IconButton>
              }
            >
              <img src={img.largeImageURL}/>
            </GridTile>
          ))}
        </GridList>
      )
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose}/>
    ]

    return <div>
      {imageListContent}
      <Dialog
        // insertig FlatButton material-ui component equal to actions
        actions={actions}
        modal={false}
        // sets open prop to open prop value of state
        open={this.state.open}
        // uses function to change open prop in state to false, closing the window
        onRequestClose={this.handleClose}>
        {/*assigns img src to currentImg prop's url*/}
        <img src={this.state.currentImg} alt="" style={{ width: '100%' }}/>
      </Dialog>
    </div>
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
}

export default ImageResults;
