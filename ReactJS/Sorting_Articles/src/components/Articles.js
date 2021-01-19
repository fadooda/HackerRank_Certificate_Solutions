import React from 'react';

function Articles(articlesObject) {

    //mapping function to map each js array elm to the html for a data row in a table
    const mapArticles = ({date,title,upvotes}, index)=>{
        return(
            <tr data-testid="article" key={index}>
                <td data-testid="article-title">{title}</td>
                <td data-testid="article-upvotes">{upvotes}</td>
                <td data-testid="article-date">{date}</td>
            </tr>
        )
    }
    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Upvotes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                    {articlesObject.articles.map(mapArticles)}
                </tbody>
            </table>
        </div>
    );

}

export default Articles;
