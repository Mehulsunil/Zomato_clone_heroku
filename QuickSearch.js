import React from 'react';
import '../Styles/home.css';

import QuickSearchItem from './QuickSearchitem';

class QuickSearch extends React.Component{
    render(){
        const {quickSearchData} = this.props;
        return(
        <div>
        <div><h1 className="Quick-Searches">QuickSearch</h1></div>
        <div ><h3 className="Discover-restaurants-by-type-of-meal">Discover restaurants by type of meal</h3></div>

      <div className="row r1">
      {quickSearchData.map((item , index)=>{
          return <QuickSearchItem key={index} qsItemData={item}/>
      })}

      </div>
      </div>
    
        )
    }
}

export default QuickSearch;
