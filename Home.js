import React from 'react';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealTypes:[]
        }
    }
  componentDidMount(){
      sessionStorage.clear();
      // location API
       axios({
           url: 'http://localhost:2031/locations',
           method:"GET",
           Headers:{'Content-Type': 'application/json'}
        }).then(response =>{
            this.setState({locations : response.data.locations})
        }).catch()

        // mealtype API
        axios({
            url: 'http://localhost:2031/mealtypes',
            method:"GET",
            headers:{'Content-Type': 'application/json'}
         }).then(response =>{
             this.setState({mealTypes : response.data.mealtypes})
         }).catch()

    }
    
    render(){
        const{locations,mealTypes}=this.state;
        return(
         <div>
             <Wallpaper locationData={locations}/>
             <QuickSearch quickSearchData={mealTypes}/>
         </div>
    
            )
        }
    }
export default Home;


