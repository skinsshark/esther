import * as contentful from 'contentful';
import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import dribbble from './images/dribbble.svg';
import instagram from './images/instagram.svg';
import vimeo from './images/vimeo.svg';
import sundes from './images/sundes.svg';
import './About.css';

class About extends Component {
  state = {
    about: []
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
    this.showCredit();
  }

  componentWillUnmount() {
    const el = document.getElementsByTagName('footer')[0];
    el.classList.remove('visible');
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'about'});

  setPosts = response => {
    this.setState({
      about: response.items
    });
  };

  showCredit = () => {
    const el = document.getElementsByTagName('footer')[0];
    el.classList.add('visible');
  }

  render() {
    let about;

    if (!this.state.about[0]) {
      return null;
    } else {
      if (!this.state.about[0].fields.photo.fields) {
        return null;
      }
      about = this.state.about[0].fields;
    }

    return (
      <section className="about">
        <article className="face">
          <ImageLoader
            alt={about.photo.fields.title}
            src={about.photo.fields.file.url}
          />
        </article>
        <article className="bio">
          <div className="links">
            <ul>
              {about.instagram &&
                <li>
                  <a href={about.instagram} target="_blank" rel='noreferrer noopener'>
                    <img src={instagram} alt="instagram" />
                  </a>
                </li>
              }
              {about.vimeo &&
                <li>
                  <a href={about.vimeo} target="_blank" rel='noreferrer noopener'>
                    <img src={vimeo} alt="vimeo" />
                  </a>
                </li>
              }
              {about.dribbble &&
                <li>
                  <a href={about.dribbble} target="_blank" rel='noreferrer noopener'>
                    <img src={dribbble} alt="dribbble" />
                  </a>
                </li>
              }
              {about.sundayDesert &&
                <li>
                  <a href={about.sundayDesert} target="_blank" rel='noreferrer noopener'>
                    <img src={sundes} alt="sunday desert" />
                  </a>
                </li>
              }
            </ul>
            <p className="email"><a href={`mailto:${about.email}`}>{about.email}</a></p>
          </div>
          <p className="desc">{about.bio}</p>
        </article>
      </section>
    );
  }
}

export default About;
