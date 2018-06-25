import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import lozad from 'lozad';
import './ImageLoader.css';

import before from './images/empty.png';


class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.observer = lozad(
      '.lozad', {
        load: (el) => {
            el.src = el.dataset.src;
            el.onload = () => {
              el.classList.remove('ready');
                el.classList.add('loaded');
            }
        }
    });
    this.state = {
      hover: this.props.hover
    }
  }

  componentDidMount() {
    this.observer.observe();
  }

  onHoverEnter = url => {
    const el = document.getElementById(url);
    el.classList.add('hovered');
  }

  onHoverLeave = url => {
    const el = document.getElementById(url);
    el.classList.remove('hovered');
  }

  render() {
    // console.log(this.state.height)
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
            className='lozad image-loader ready'
            data-src={this.props.src}
            src={before}
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
            className='lozad image-loader ready'
            data-src={this.props.src}
            src={before}
            alt={this.props.alt}
          />
        </div>
      );

    return imageComponent;
  }
}

export default ImageLoader;
