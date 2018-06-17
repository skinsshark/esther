import React, { Component } from 'react';
import './ImageLoader.css';

class ImageLoader extends Component {
  state = {
    loaded: false
  }

  onLoad = () => {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <img
        className={this.state.loaded ? 'image-loader loaded' : 'image-loader'}
        onLoad={this.onLoad}
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}

export default ImageLoader;
