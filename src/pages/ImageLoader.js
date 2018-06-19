import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ImageLoader.css';

class ImageLoader extends Component {
  state = {
    loaded: false,
    hover: this.props.hover
  }

  onLoad = () => {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div className="image-wrapper">
        <img
          className={this.state.loaded ? 'image-loader loaded' : 'image-loader'}
          onLoad={this.onLoad}
          src={this.props.src}
          alt={this.props.alt}
        />
        {this.state.hover && (
          <Link to={`/p/${this.props.title.toLowerCase().split(' ').join('-')}`}>
            <div className="image-info">
              <div>
                <p>{this.props.title}</p>
                <hr/>
                <p>{this.props.client}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    );
  }
}

export default ImageLoader;
