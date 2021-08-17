import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component{
    constructor (){
        super();
        this.state = {
            restaurants : [],
            location   : [],
            mealtypes   : undefined,
            locations   : undefined,
            cuisine     : [],
            lcost       : undefined,
            hcost       : undefined,
            sort        : undefined,
            page        : 1,
            pageCount   : [],
            mealtypeValue:undefined,
            mealtypecity:undefined
        }
    }
componentDidMount(){
    // stpe 1 : read the query string params froms url
    const qs = queryString.parse(this.props.location.search);
    const { mealtypes, locations,mealtypeValue,mealtypecity} = qs; // end point

    const reqObj ={
        mealtype: mealtypes,  // mealtype_id is key name in mealtypes
        location: locations,  // key is we passed in body 
        
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    }).then(res => {
            this.setState({ restaurants : res.data.restaurants, mealtypes, locations, pageCount : res.data.pageCount ,mealtypeValue,mealtypecity}) // post man object key
    }).catch()


    axios({
        url: 'http://localhost:2031/locations',
        method:"GET",
        Headers:{'Content-Type': 'application/json'}
     }).then(response =>{
         this.setState({location : response.data.locations})
     }).catch()
}

handleSortChange = (sort) => {
    const { mealtypes, locations , lcost , hcost , cuisine,page} = this.state;
    const reqObj ={
        sort,
        mealtype: mealtypes,  
        location: locations,
        cuisine : cuisine.length == 0 ? undefined: cuisine,
        lcost,
        hcost,
        page  
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    }).then(res => {
            this.setState({ restaurants : res.data.restaurants,sort,pageCount : res.data.pageCount}) // post man object key
    }).catch()
}

handleCostChange = (lcost,hcost) =>{
    const { mealtypes, locations,sort,cuisine,page } = this.state;
    const reqObj ={
        sort,
        mealtype: mealtypes,  
        location: locations,
        cuisine : cuisine.length == 0 ? undefined: cuisine,
        lcost,
        hcost,
        page 
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    }).then(res => {
            this.setState({ restaurants : res.data.restaurants,lcost,hcost,pageCount : res.data.pageCount}) // post man object key
    }).catch()
}

handleLocationChange = (event) => {
    const { mealtypes , sort , hcost , lcost,cuisine,page} = this.state;
    const locations = event.target.value;
    const reqObj ={
        sort,
        mealtype: mealtypes,  
        location: locations,
        cuisine : cuisine.length == 0 ? undefined: cuisine,
        lcost,
        hcost,
        page 
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    }).then(res => {
            this.setState({ restaurants : res.data.restaurants,locations , pageCount : res.data.pageCount}) // post man object key
    }).catch()
}

handlePageChange = (page) => {
    const { mealtypes ,locations ,sort , hcost , lcost,cuisine } = this.state;
    const reqObj ={
        sort,
        mealtype: mealtypes,  
        location: locations,
        cuisine : cuisine.length == 0 ? undefined: cuisine,
        lcost,
        hcost,
        page  
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    })
    .then(res => {
            this.setState({ restaurants : res.data.restaurants , pageCount : res.data.pageCount,page}) // post man object key
    }).catch()
}


handleCuisineChange=( cuisineId )=>{
    const { mealtypes ,locations ,sort , hcost , lcost,page,cuisine} = this.state;
    const index = cuisine.indexOf(cuisineId);
    if(index > -1 ){
        cuisine.splice(index , 1);
    }else{
        cuisine.push(cuisineId);
    }
    const reqObj ={
        sort,
        mealtype: mealtypes,  
        location: locations,
        cuisine : cuisine.length == 0 ? undefined: cuisine,
        lcost,
        hcost,
        page  
    };
    // step 2 : filter API call with rquest params
    axios({
        url: 'http://localhost:2031/filter',
        method:"POST",
        Headers:{'Content-Type': 'application/json'},
        data :reqObj
    }).then(res => {
            this.setState({ restaurants : res.data.restaurants , cuisine ,pageCount : res.data.pageCount}) // post man object key
    }).catch()
}

handleNavigateDetails=(resId)=>{
    this.props.history.push(`/details?restaurantId=${resId}`);
}
    render(){
        const {restaurants,location,pageCount,mealtypeValue,mealtypecity} = this.state;
        return(
            <div>
                <div className="heading-filter">{mealtypeValue} Places in {mealtypecity}</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                    <option value={0}>Select</option>
                {location.map((item , index)=>{
                    return <option key={index} value={item.location_id}>{`${item.name}, ${item.city} `}</option>
                 })}
                                </select>
                            <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange("1")}/>
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange("2")}/>
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange("3")}/>
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange("4")} />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange("5")}/>
                                    <span className="checkbox-items">Street Food</span>
                                </div>

                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name = "cost" onChange={ () => this.handleCostChange(1,500)}/>
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                <div>
                                    <input type="radio"  name = "cost" onChange={ () => this.handleCostChange(500,1000)}/>
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio"  name = "cost" onChange={ () => this.handleCostChange(1000,1500)}/>
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio"  name = "cost" onChange={ () => this.handleCostChange(1500,2000)}/>
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name = "cost" onChange={ () => this.handleCostChange(2000,50000)}/>
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div>
                                    <input type="radio" name = "cost" onChange={ () => this.handleCostChange(1,50000)}/>
                                    <span className="checkbox-items">All</span>
                                </div>
                        <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={ () => this.handleSortChange(1)} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={ () => this.handleSortChange(-1)} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                {restaurants.length !=0 ? restaurants.map((item)=>{
                    return <div className="Item" onClick={ () => this.handleNavigateDetails(item._id)}>
                    <div>
                        <div className="small-item vertical">
                        <img className="img" src={`./${item.image}`} alt="pic" />
                        </div>
                        <div className="big-item">
                            <div className="rest-name">{item.name}</div>
                            <div className="rest-location">{item.locality}</div>
                            <div className="rest-address">{item.city}</div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="margin-left">
                            <div className="Bakery">CUISINES : {item.cuisine_id.map((cuisine_id) =>`${cuisine_id.name}, `)}
                            </div>
                            <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                        </div>
                    </div>
                </div>
                }):<div className="no-records"> No records Found !!!</div>}
                 {restaurants.length != 0 ? <div className="pagination">
                                <span className="page-Count">&laquo;</span>
                                {pageCount.map((item, index) => {
                                            return <span key="index" className="page-Count" onClick={() => this.handlePageChange(item) }>{item}</span>
                                })}
                                <span className="page-Count">&raquo;</span>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;