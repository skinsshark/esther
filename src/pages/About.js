import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';
import dribbble from './images/dribbble.svg';
import instagram from './images/instagram.svg';
import sundes from './images/sundes.svg';
import vimeo from './images/vimeo.svg';
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
    if (!this.state.about[0]) {
      return null;
    }

    const about = this.state.about[0];

    return (
      <section className="about">
        <article className="face">
          <ImageLoader
            alt={about.fields.photo.fields.title}
            src={about.fields.photo.fields.file.url}
            fields={about.fields}
            type='about'
          />
        </article>
        <article className="bio">
          <div className="links">
            <ul>
              {about.fields.instagram &&
                <li>
                  <a href={about.fields.instagram} target="_blank" rel='noreferrer noopener'>
                    <img src={instagram} alt="instagram" />
                  </a>
                </li>
              }
              {about.fields.vimeo &&
                <li>
                  <a href={about.vimeo} target="_blank" rel='noreferrer noopener'>
                    <img src={vimeo} alt="vimeo" />
                  </a>
                </li>
              }
              {about.fields.dribbble &&
                <li>
                  <a href={about.fields.dribbble} target="_blank" rel='noreferrer noopener'>
                    <img src={dribbble} alt="dribbble" />
                  </a>
                </li>
              }
              {about.fields.sundayDesert &&
                <li>
                  <a href={about.fields.sundayDesert} target="_blank" rel='noreferrer noopener'>
                    <img src={sundes} alt="sunday desert" />
                  </a>
                </li>
              }
            </ul>
            <p className="email"><a className="colorDef" href={`mailto:${about.fields.email}`}>{about.fields.email}</a></p>
          </div>
          <p className="desc">{about.fields.bio}</p>
        </article>
      </section>
    );
  }
}

export default About;
