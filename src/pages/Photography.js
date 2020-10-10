import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';
import './Photography.css';

class Photography extends Component {
  state = {
    photography: []
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'orderedPhotography'});

  setPosts = response => {
    this.setState({
      photography: response.items[0].fields.photos
    });
  };

  render() {
    if (!this.state.photography[0]) {
      return null;
    }

    return (
      <section className="grid one-col">
        {this.state.photography.map((photograph, i) => (
            <ImageLoader
              alt={photograph.fields.caption}
              fields={photograph.fields}
              key={`photograph_${i}`}
              type="photography"
            />
          )
        )}
      </section>
    );
  }
}

export default Photography;
