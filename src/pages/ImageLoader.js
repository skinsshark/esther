import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ImageLoader.css';

class ImageLoader extends Component {
  state = {
    loaded: false,
    hover: this.props.hover
  }

  onHoverEnter = url => {
    const el = document.getElementById(url);
    el.classList.add('hovered');
  }

  onHoverLeave = url => {
    const el = document.getElementById(url);
    el.classList.remove('hovered');
  }

  onLoad = () => {
    this.setState({ loaded: true });
  }

  render() {
    const url = this.props.title ? this.props.title.toLowerCase().split(' ').join('-') : 'good-question';
    const imageComponent = this.state.hover ? (
      <div className="image-wrapper"
        onMouseEnter={() => this.onHoverEnter(url)}
        onMouseLeave={() => this.onHoverLeave(url)}
        onTouchStart={() => this.onHoverEnter(url)}
        onTouchEnd={() => this.onHoverLeave(url)}
      >
        <Link to={`/p/${url}`} className="image-info" id={url}>
          <img
            className={this.state.loaded ? 'image-loader loaded' : 'image-loader'}
            onLoad={this.onLoad}
            src={this.props.src}
            alt={this.props.alt}
            onClick={this.props.onClick}
          />
          <article>
            <div>
              <p>{this.props.title}</p>
              <hr/>
              <p>{this.props.client}</p>
            </div>
          </article>
        </Link>
      </div>)
      : (
        <div className="image-wrapper">
          <img
            className={this.state.loaded ? 'image-loader loaded' : 'image-loader'}
            onLoad={this.onLoad}
            src={this.props.src}
            alt={this.props.alt}
          />
        </div>
      );

    return imageComponent;
  }
}

export default ImageLoader;
