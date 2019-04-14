import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';

class Sketchbook extends Component {
  state = {
    sketches: []
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'sketch'});

  setPosts = response => {
    this.setState({
      sketches: response.items
    });
  };

  render() {
    if (!this.state.sketches[0]) {
      return null;
    }

    return (
      <section className="grid sketchbook">
        {this.state.sketches.map((image, i) => (
            <ImageLoader
              alt={image.fields.title}
              fields={image.fields}
              key={`image_${i}`}
            />
          )
        )}
      </section>
    );
  }
}

export default Sketchbook;
