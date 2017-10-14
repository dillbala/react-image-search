import React, { Component } from 'react';
import PreviewImage from './components/PreviewImage';
import ImageSearch from './components/ImageSearch';
import RandomImage from './components/RandomImage';
import ImageList from './components/ImageList';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props,context){
    super(props,context);
    this.state = {
      search: '',
      randomImgUrl:'',
      images:null,
      total:0,
      activePage: 1,
      isLoading:false,
      preview:false,
      imageStatus:false,
      previewImg:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.fetchingFromApi = this.fetchingFromApi.bind(this);
  }
  
  handleClick(e){
    let previewImage = e.target.getAttribute('data-image');
    this.setState({
      preview: !this.state.preview,
      previewImg: previewImage
    });
    e.stopPropagation();
  }

  closeHandler(){
    this.setState({
      preview: !this.state.preview,
      imageStatus: !this.state.imageStatus
    })
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber},()=>{
      this.fetchingFromApi(this.state.search)
    });
  }

  handleImageLoaded(){
    this.setState({
      imageStatus: !this.state.imageStatus
    })
    console.log('image loaded');
  }

  fetchingFromApi(search){
    this.setState({
      isLoading:!this.state.isLoading
    }, () => {
    axios.get(`https://api.unsplash.com/search/photos/?page=${this.state.activePage}&per_page=21&query=${search}&client_id=fe3f64881401ddd3b4800ab386fd34f5e62ac4d2f1479b03ed3777cd0f337d00`)
    .then(image => {
      if(image.data.results.length > 0)
      {
      this.setState ({
        images : image.data.results,
        total: image.data.total,
        search: search,
        isLoading:!this.state.isLoading
      })
      }
      else{
      this.setState ({
        images : [],
        isLoading:!this.state.isLoading
      })
      }
    })})
  }

  componentDidMount() {
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13){
        document.getElementById('searchWrapper').classList.add('shrink');
        document.getElementById('randomBgImage').classList.add('blur');
        let search = document.getElementById('searchInput').value;
        if(search !== this.state.search){
          this.setState({
            activePage: 1
          },() => {this.fetchingFromApi(search);})
        }
        this.fetchingFromApi(search);
      }
    })
  }

  componentWillMount(){
    axios.get('https://api.unsplash.com/photos/random?client_id=fe3f64881401ddd3b4800ab386fd34f5e62ac4d2f1479b03ed3777cd0f337d00')
    .then(image => {
      this.setState ({
          randomImgUrl : image.data.urls.regular
      });
    })
  }

  render() {
    return (
      <div className="app">
        <div id="randomBgImage">
          <RandomImage randomImgUrl = {this.state.randomImgUrl}/>
        </div>
        <div id="searchWrapper">
          <ImageSearch />
        </div>
        <div className="imageList">
            <ImageList images={this.state.images} handleClick = {this.handleClick} activePage = {this.state.activePage} total = {this.state.total} handlePageChange={this.handlePageChange} isLoading={this.state.isLoading}/>
        </div>
        {
          this.state.preview &&
          <PreviewImage src={this.state.previewImg} onCloseRequest = {this.closeHandler} handleImageLoaded={this.handleImageLoaded} imageStatus={this.state.imageStatus}/>
        }
      </div>
    );
  }
}

export default App;
