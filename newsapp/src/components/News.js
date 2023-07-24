import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
   const [articles, setArticles] = useState([])
   const [loading, setLoading] = useState([true])
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
   

   const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
   } 

    const updateNews = async ()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d071c07d2d8d416e9c1d9ba4ee03ee38&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
     updateNews();
     //eslint-disable-next-line
    }, [])
    
    

    const handlePreviousClick = async ()=>{
      // console.log("Previous");
      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ee379bef2c774f4cb4b8b6d245791bf3&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
      // this.setState({loading: true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);

      // this.setState({
      //   page: this.state.page-1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
      // this.setState({page: this.state.page - 1});
      setPage(page-1)
      updateNews();
    }

    const handleNextClick = async ()=>{
      // console.log("Next");
      // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ee379bef2c774f4cb4b8b6d245791bf3&page=${this.state.page+1}&pageSize=${props.pageSize}`;
      // this.setState({loading: true});
      // let data = await fetch(url);
      // let parsedData = await data.json();
      
      // this.setState({
      //   page: this.state.page+1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
    // }
    // this.setState({page: this.state.page + 1});
    setPage(page+1)
    updateNews();
    }
    
    //await can be used only with async function otherwise it cannot used.
    const fetchMoreData = async ()=>{
     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d071c07d2d8d416e9c1d9ba4ee03ee38&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
       
    };

 
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px',marginTop: '90px'}}>NewsMonkey - Top { capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==  totalResults}
          loader={<Spinner/>}
        > 
        <div className="container">
          
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}    
        </div>
        </div>  
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    );
  }


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
 }
 News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes,
  category: PropTypes.string
 }

export default News;
