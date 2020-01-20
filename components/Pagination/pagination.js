import React from 'react'
import styled from 'styled-components'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from 'react-bootstrap/Pagination';
/**
 * calulate the number of pages 
 * numOfJobs / limit  = numOfpage
 */



 const Page = styled.a`
  text-decoration: none;
  color: inherit;

 `
let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination>{items}</Pagination>
    <br />

    <Pagination size="lg">{items}</Pagination>
    <br />

    <Pagination size="sm">{items}</Pagination>
  </div>
);


class JobPagination extends React.Component {
    constructor(props){
        super(props)
        this.active = 1;
        this.lastPage;
        this.firstPage = 1;

        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)
        this._page = this._page.bind(this)
    }
     _page (page){
       this.active = page 
       this.props.pageChange(page)
    }

    _next(){
      if(this.active !== this.lastPage){
        this.active++
        this._page(this.active)
      }
    }

  _prev() {
    if (this.active !== this.firstPage) {
      this.active--;
      this._page(this.active)
    }
  }

    



render () {
    console.log(this.props.data)
    const {numofJobs, limit} = this.props.data;
    let items = [];
    // let limit = 5;

    let numOfPage = numofJobs / limit ; 

    console.log({numOfPage})
    
    for (let number = 1; number <= numOfPage; number++) {
        items.push(
          <Pagination.Item onClick={() => this._page(number)} key={number} active={number === this.active}  >
            <Page href="#jobs">
                {number}
            </Page>

            </Pagination.Item>
        );
    }
    return (
        <div>
            <Pagination style={{ "overflow-x": 'auto'}}>
          <Pagination.Prev onClick={this._prev} />
              {items}
          <Pagination.Next onClick={this._next}/>
              </Pagination>
        </div>
    )
}

}

export default JobPagination;

