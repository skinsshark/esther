import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';
import './Grid.css';
import './Proj.css';

class Proj extends Component {
  state = {
    projects: [],
    curr: {}
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts).then(this.setCurrent);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'project'});

  setPosts = response => {
    this.setState({
      projects: response.items
    });
  };

  setCurrent = () => {
    const curr = this.state.projects.find(p => (
      p.fields.title.toLowerCase().split(' ').join('-') === this.props.match.params.projectName
    ));

    this.setState({ curr: curr.fields });
  }

  render() {
    if (!this.state.projects[0]) {
      return null;
    } else if (
      !this.state.curr ||
      !this.state.curr.banner ||
      !this.state.curr.images
    ) {
      return null;
    }

    const { curr } = this.state;
    return (
      <section className="proj">
        <div className="banner frame">
          <ImageLoader
            src={curr.banner.fields.file.url}
          />
        </div>
        <div className="text">
          <h3>{curr.title}</h3>
          <hr />
          <p>
            {curr.role && `${curr.role}`}
            {curr.role && curr.company && `, `}
            {curr.company && `${curr.company}`}
            {curr.client && `, ${curr.client}`}
          </p>
          <p>{curr.description}</p>
        </div>
        <article className="grid">
          {curr.images.map((image, i) => (
            <ImageLoader
              src={image.fields.file.url}
              alt={image.fields.title}
              key={`proj_${this.props.match.params.projectName}_${i}`}
            />
          ))}
        </article>
      </section>
    );
  }
}

export default Proj;
