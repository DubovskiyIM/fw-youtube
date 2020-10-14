import React from 'react';

import searchYoutube from 'youtube-api-v3-search';
import _ from 'lodash';

import VideoList from './components/video_list.jsx';
import SearchBar from './components/search_bar.jsx';
import VideoDetail from './components/video_detail.jsx';

const API_KEY = 'AIzaSyDMf1UY8-JaEMS1YULqlnd9BpqT2pn_KzI';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      term: 'Router',
    };
    this.videoSearch(this.state.term);
  }

  videoSearch(term) {
    let that = this;
    let result = searchYoutube(API_KEY, {
      q: term,
      part: 'snippet',
      type: 'video'
    });
    result.then(function (res) {
      that.setState({
        videos: res.items
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => this.videoSearch(term), 500);
    return (<div>
      <SearchBar onSearchTermChange={videoSearch} dfltVl={this.state.term}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
        videos={this.state.videos}
        onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
      />
    </div>);
  }
}

export default Page;
