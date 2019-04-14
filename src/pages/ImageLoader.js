import * as contentful from 'contentful';
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
      colors: [],
      hover: this.props.hover || false
    }
  }

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.observer.observe();
    this.fetchColors().then(this.setColors);
  }

  fetchColors = () => this.client.getEntries({'content_type': 'colors'});

  setColors = response => {
    this.setState({
      colors: response.items[0].fields
    });
  };

  onHoverEnter = url => {
    const el = document.getElementById(url);
    el.classList.add('hovered');
  }

  onHoverLeave = url => {
    const el = document.getElementById(url);
    el.classList.remove('hovered');
  }

  render() {
    let res, buffer, source;
    const GRID_WIDTH = 100;

    if (!this.state.hover) { //not a Project
      switch(this.props.type) {
        case 'about':
          source = this.props.fields.photo.fields.file;
          break;
        case 'banner':
          source = this.props.fields.banner.fields.file;
          break;
        case 'more':
          source = this.props.fields.file;
          break;
        default:
          source = this.props.fields.image.fields.file;
      }

      let width, height;
      if (source.details.image) {
        width = source.details.image.width;
        height = source.details.image.height;
        buffer = `${height/width*GRID_WIDTH}%`; // *grid_width
      }

      if (!this.state.colors) {
        return null;
      }

      if (source.contentType.includes('video')) {
        res = (
          <div className="image-wrapper banner" style={{paddingBottom: buffer}}>
            <video controls={true}>
              <source src={source.url} type="video/mp4" />
              sorry, video ain't working for u
            </video>
          </div>
        );
      } else if (source.contentType.includes('text')) { // prob a vimeo video
        console.log('ya')
        const reg = /[//](.*[/])(.*)/g;
        const videoId = reg.exec(source.url)[2];
        res = (
          <div className="banner">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}?color=ff0179&title=0&byline=0`}
              title={source.fileName}
              width="3000"
              height="1750"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen="true">
            </iframe>
          </div>
        );
      } else if (this.props.type === 'banner') { // regular image banner
        res = (
          <div className="banner">
            <img
              className="lozad ready"
              data-src={source.url}
              alt={this.props.alt}
            />
          </div>
        );
      } else {
        res = (
          <div className="image-wrapper" style={{paddingBottom: buffer}}>
            <img
              className="lozad ready"
              data-src={source.url}
              alt={this.props.alt}
            />
          </div>
        );
      }

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
            <article style={{
              backgroundColor: `#${this.state.colors.projectBG}`,
              color: `#${this.state.colors.projectText}`
            }}>
              <div>
                <p>{this.props.fields.title}</p>
                <hr style={{
                  borderColor: `#${this.state.colors.projectText}`
                }}/>
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
