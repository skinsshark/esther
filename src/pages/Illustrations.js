import * as contentful from 'contentful';
import React, { Component } from 'react';

import ImageLoader from './ImageLoader';
import './Illustrations.css';

class Illustrations extends Component {
  state = {
    illustrations: []
  };

  client = contentful.createClient({
    space: 'f6ynskpmf4ta',
    accessToken: 'b63c06a8f7b120e05519f70b6fd2cbfa96c6bb4b505621ab9dbbc5b44c2e15f7'
  });

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries({'content_type': 'illustration'});

  setPosts = response => {
    this.setState({
      illustrations: response.items
    })
  };

  onImageLoad = id => {
    const el = document.getElementById(id);
    console.log(el)
    el.classList.add('loaded');
  }

  render() {
    if (!this.state.illustrations[0]) {
      return null;
    }

    return (
      <section className="illustrations">
        {this.state.illustrations.map((illustration, i) => (
            <ImageLoader
              alt={illustration.fields.title}
              key={`illustration_${i}`}
              src={illustration.fields.image.fields.file.url}
            />
          )
        )}
      </section>
    );
  }
}

export default Illustrations;
