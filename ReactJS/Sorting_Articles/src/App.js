import React, {useState,useEffect} from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {

    const [articleList, setArticleList] = useState();

    //initialize state to articles with a one time render 
    useEffect(()=>{
        let tempArticleArr=[... articles].sort((elm1, elm2) => elm2.upvotes - elm1.upvotes)
        setArticleList(tempArticleArr)
    },[])


    const mostRecent=()=>{
        let tempArticleArr=[... articles].sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });

        setArticleList(tempArticleArr)
    }


    const mostUpVoted=()=>{
        let tempArticleArr=[... articles].sort((elm1, elm2) => elm2.upvotes - elm1.upvotes)
        setArticleList(tempArticleArr)
    }
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" onClick={mostUpVoted} className="small">Most Upvoted</button>
                <button data-testid="most-recent-link" onClick={mostRecent} className="small">Most Recent</button>
            </div>
            {articleList && <Articles articles={articleList}/>}
        </div>
    );

}

export default App;
