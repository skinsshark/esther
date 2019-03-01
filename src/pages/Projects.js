import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';
import './Grid.css';
import './Projects.css';

class Projects extends Component {
  state = {
    projects: []
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'project'});

  setPosts = response => {
    this.setState({
      projects: response.items
    });
  };

  render() {
    if (!this.state.projects[0]) {
      return null;
    }

    return (
      <section className="grid project">
        {this.state.projects.map((proj, i) => (
            <ImageLoader
              alt={proj.fields.title}
              fields={proj.fields}
              hover={true}
              key={`proj_${i}`}
            />
          )
        )}
      </section>
    );
  }
}

export default Projects;
