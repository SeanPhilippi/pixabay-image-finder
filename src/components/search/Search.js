import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults';
import debounce from '../debounce.js';

class Search extends Component {
  state = {
    searchText: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '10219055-321f53f88e82aca8e21dc02d4',
    images: []
  }

  handleSearch = () => {
    const {searchText, amount, apiUrl, apiKey} = this.state;
    fetch(`${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`)
    .then(res => res.json())
    .then(res => this.setState({images: res.hits}))
    .catch(err => console.error(err))
  }

  onTextChange = e => {
    this.setState({searchText: e.target.value});
    this.handleDelay()
    // debounce(this.handleSearch, 2000)();
  }

  handleDelay = debounce(this.handleSearch, 2000)

  // handleDelay = debounce((e) => {
  //   const displayedImgs = this.handleSearch();
  //   this.setState({ images: displayedImgs });
  // }, 500)

  onKeyUp = e => {
    if (e.key === 'Enter') {
      this.handleSearch()
    }
  }

  onAmountChange = (e, index, value) => this.setState({amount: value});

  render() {
    console.log(this.state.images);
    return (
      <div style={{ marginLeft: '10px', marginRight: '10px' }}>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          onKeyUp={this.onKeyUp}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br/>
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5"/>
          <MenuItem value={10} primaryText="10"/>
          <MenuItem value={15} primaryText="15"/>
          <MenuItem value={30} primaryText="30"/>
          <MenuItem value={50} primaryText="50"/>
        </SelectField>
        <br/>
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images}/> ) : null}
      </div>
    )
  }
}

export default Search;
