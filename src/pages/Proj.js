import * as contentful from 'contentful';
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
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
  };

  options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node) => {
        return <a href={node.data.uri} target="_blank" rel="noopener noreferrer">{node.content[0].value}</a>;
      }
    }
  };

  render() {
    const isDemoreel = this.state.curr.title === 'Demoreel';
    if (!this.state.projects[0]) {
      return null;
    } else if (
      !this.state.curr ||
      !this.state.curr.banner ||
      (!this.state.curr.images && !isDemoreel)
    ) {
      return null;
    }

    const { curr } = this.state;

    return (
      <section className="proj">
        <div className="frame">
          <ImageLoader
            type='banner'
            fields={curr}
          />
        <div className="text">
          <h3>{curr.title}</h3>
          <hr />
          <p>
            {curr.role && `${curr.role}`}
            {curr.role && curr.company && `, `}
            {curr.company && `${curr.company}`}
            {curr.client && `, ${curr.client}`}
          </p>
          {documentToReactComponents(curr.description, this.options)}
        </div>
        </div>
        <Masonry options={{columnWidth: 2}} className="grid">
          {!isDemoreel && curr.images.map((image, i) => (
            <ImageLoader
              type='more'
              alt={image.fields.title}
              key={`proj_${this.props.match.params.projectName}_${i}`}
              fields={image.fields}
            />
          ))}
        </Masonry>
      </section>
    );
  }
}

export default Proj;
