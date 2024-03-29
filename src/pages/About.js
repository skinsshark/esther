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

  render() {
    if (!this.state.about[0]) {
      return null;
    }

    const about = this.state.about[0];

    return (
      <React.Fragment>
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
                    <a href={about.fields.vimeo} target="_blank" rel='noreferrer noopener'>
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
            <p className="email but-really-this-is-cv">
              <a rel="noopener noreferrer" target="_blank" className="colorDef" href={about.fields.resume.fields.file.url}>CV</a>
            </p>
          </article>
        </section>


        <footer className="visible">
          website by <a className="colorDef" href={about.fields.sharon} target="_blank" rel='noreferrer noopener'>sharon zheng</a>
        </footer>
      </React.Fragment>
    );
  }
}

export default About;
