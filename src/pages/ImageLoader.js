import * as contentful from 'contentful';
import lozad from 'lozad';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ImageLoader.css';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
class ImageLoader extends Component {
  constructor(props) {
    super(props);
    if (!isSafari) {
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
    } else {
      console.log('safari')
    }

    this.state = {
      colors: [],
      hover: this.props.hover || false,
      smallWindowWidth: window.innerWidth < 768
    }
  }

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    if (!isSafari) {
      this.observer.observe();
    }
    this.fetchColors().then(this.setColors);

    window.addEventListener('resize', () => {
      if ((window.innerWidth < 768 && !this.state.smallWindowWidth)
      || (window.innerWidth >= 768 && this.state.smallWindowWidth)) {
        this.setState({
          smallWindowWidth: window.innerWidth < 768
        })
      }
    })
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
        case 'photography':
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
      const isVertPhoto = this.props.type === 'photography' && this.props.fields.isVertical;
      if (source.details.image) {
        width = source.details.image.width;
        height = source.details.image.height;
        buffer = isVertPhoto && !this.state.smallWindowWidth ? `${height/width*40}%` : `${height/width*GRID_WIDTH}%`; // *grid_width
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
              className={isSafari ? "saf" : "lozad ready"}
              src={source.url}
              data-src={source.url}
              alt={this.props.alt}
            />
          </div>
        );
      } else {
        res = (
          <React.Fragment>
            <div className={
              isVertPhoto ?
              "image-wrapper vert-photography" : "image-wrapper"
            } style={{
              paddingBottom: buffer,
              marginBottom: 30}}>
              <img
                className={isSafari ? "saf" : "lozad ready"}
                src={source.url}
                data-src={source.url}
                alt={this.props.alt}
              />
            </div>
            {this.props.type === 'photography' &&
             this.props.fields.caption != null
             ? <Caption caption={this.props.fields.caption}/>
             : null}
          </React.Fragment>
        );
      }

    } else {
      const url = this.props.fields.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-');
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
              className={isSafari ? "saf" : "lozad ready"}
              src={this.props.fields.coverPhoto.fields.file.url}
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

function Caption(props) {
  return <div className={props.caption.length > 0 ? `caption-wrapper` : ''}>{props.caption}</div>
}


export default ImageLoader;
