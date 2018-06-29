import lozad from 'lozad';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ImageLoader.css';


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
    let res, buffer, imageSrc;
    const GRID_WIDTH = 100;

    if (!this.state.hover) { //not a Project
      switch(this.props.type) {
        case 'about':
          imageSrc = this.props.fields.photo.fields.file;
          break;
        case 'banner':
          imageSrc = this.props.fields.banner.fields.file;
          break;
        case 'more':
          imageSrc = this.props.fields.file;
          break;
        default:
          imageSrc = this.props.fields.image.fields.file;
      }

      const { width, height } = imageSrc.details.image;
      buffer = `${height/width*GRID_WIDTH}%`; // *grid_width

      res = (
        <div className="image-wrapper" style={{paddingBottom: buffer}}>
          <img
            className="lozad ready"
            data-src={imageSrc.url}
            alt={this.props.alt}
          />
        </div>
      );
    } else {
      const url = this.props.fields.title.toLowerCase().split(' ').join('-');
      const { width, height } = this.props.fields.coverPhoto.fields.file.details.image;
      buffer = `${height/width*GRID_WIDTH}%`; // *grid_width

      res = (
        <div className="image-wrapper"
          style={{paddingBottom: buffer}}
          onMouseEnter={() => this.onHoverEnter(url)}
          onMouseLeave={() => this.onHoverLeave(url)}
          onTouchStart={() => this.onHoverEnter(url)}
          onTouchEnd={() => this.onHoverLeave(url)}
        >
          <Link
            to={`/p/${url}`}
            className="image-info"
            id={url}
          >
            <img
              className="lozad ready"
              data-src={this.props.fields.coverPhoto.fields.file.url}
              alt={this.props.alt}
            />
            <article>
              <div>
                <p>{this.props.fields.title}</p>
                <hr/>
                <p>{this.props.fields.client}</p>
              </div>
            </article>
          </Link>
        </div>
      );
    }

    return res;
  }
}

export default ImageLoader;
