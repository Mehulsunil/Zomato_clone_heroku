import React from 'react';
import '../Styles/details.css';
import queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid brown',
      backgroundColor: 'white',          // we cant keep css - element so make letter capital or make a string
      boxShadow:' 10px 10px 5px grey'
    },
  };


class Details extends React.Component{
    constructor(){
        super();
        this.state = {
           image:undefined,
           restaurants : {},
           restaurantId : undefined,
           itemsModalIsOpen : false,
           galleryModalIsOpen: false,
           userDetailsModalIsOpen :false,
           items :[],
           subTotal:0,
           name: undefined,
           email:undefined,
           contactNumber:undefined,
           address:undefined
        }
    }
    componentDidMount (){
        const qs = queryString.parse(this.props.location.search);
        const { restaurantId }= qs;

        axios({
            url: `http://localhost:2031/restaurantdetails/${restaurantId}`,
            method:"GET",
            headers:{'Content-Type': 'application/json'}
         }).then(response =>{
             this.setState({ image : response.data.restaurants.thumb[0] ,restaurants:response.data.restaurants, restaurantId});
         }).catch()
    }

    handleOrder= () => {
        const { restaurantId } = this.state;
        console.log(restaurantId);
        axios({
            url: `http://localhost:2031/menuItems/${restaurantId}`,
            method:"GET",
            Headers:{'Content-Type': 'application/json'}
         }).then(response =>{
             this.setState({items : response.data.items  , itemsModalIsOpen:true , subTotal:0});
         }).catch()
        
    }

    handleCloseModal = (state , value) =>{
        this.setState({ [state]: value});
    }


    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.items];
        const item = items[index];

        if (operationType == 'add') {
            item.qty = item.qty + 1;
        }
        else {
            item.qty = item.qty - 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ items: items, subTotal: total });
    }


    handleGallery = () =>{
        this.setState({ galleryModalIsOpen : true })
    }

    handlePay=()=>{
    this.setState( {  userDetailsModalIsOpen :true, itemsModalIsOpen:false});
    }

    handleInputChange = (event,state) => {
        this.setState({ [state] : event.target.value});
    }

    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val);
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', action);

        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', this.stringifyValue(params[key]));
            form.appendChild(input);
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }

    getData = (data) => {
        return fetch(`http://localhost:2031/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    payment = () => {
        const { email, subTotal } = this.state;
        this.getData({ amount: subTotal, email }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }



    render() {
        const { restaurants,image ,itemsModalIsOpen,items ,subTotal , galleryModalIsOpen ,userDetailsModalIsOpen , name, email,contactNumber,address} = this.state;
        return (
            <div>
                <div>
                    <img src={image} alt="No Image, Sorry for the Inconvinience" width="100%" height="400" />
                    <button className="button" onClick={this.handleGallery}>Click to see Image Gallery</button>
                </div>
                <div className="heading">{restaurants.name}</div>
                <button className="btn-order" onClick={this.handleOrder} >Place Online Order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1"  name="tab-group-1" checked />
                        <label for="tab-1" className="active">Overview</label>

                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurants && restaurants.cuisine_id && restaurants.cuisine_id.map(item => `${item.name},`)}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377;{restaurants.min_price}</div>
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">Contact</label>

                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurants.contact_number}</div>
                            <div className="head">{restaurants.name}</div>
                            <div className="value">{`${restaurants.locality}, ${restaurants.city}`}</div>
                        </div>
                        
                    </div>
                </div>

        <Modal
        isOpen={itemsModalIsOpen}
        style={customStyles}
        >
            
            <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('itemsModalIsOpen', false)}></div>
                        <div >
                            <h3 className="restaurant-name">{restaurants.name}</h3>
                            <h3 className="item-total">SubTotal : {subTotal}</h3>
                            <button className="btn btn-danger pay" onClick={this.handlePay}> Pay Now</button>
                            {items.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center title-img" src={`../${item.image}`} style={{ height: '75px', width: '75px', 'border-radius': '20px' }} />
                                                {item.qty == 0 ? <div><button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button></div> :
                                                    <div className="add-number"><button onClick={() => this.addItems(index, 'subtract')}>-</button><span style={{ backgroundColor: 'white' }}>{item.qty}</span><button onClick={() => this.addItems(index, 'add')}>+</button></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    
            </div>
            </Modal>



            <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}
                >
                    
                    <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('galleryModalIsOpen', false)}></div>
                        <Carousel
                            showThumbs={false}
                            autoPlay={false}
                            showIndicators={false}>
                            {restaurants && restaurants.thumb && restaurants.thumb.map((item) => {
                                return <div>
                                    <img className="gallery" src={`./${item}`} />
                                </div>
                            })}
                        </Carousel>
                
                </Modal>

                
            <Modal
                    isOpen={ userDetailsModalIsOpen }
                    style={customStyles}
                >
                    <div>
                    <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('userDetailsModalIsOpen', false)}></div>
                   <div>
                       <form action="/action_page.php">
                        <label>Name</label>
                        <input type="text" className="form-control" required  placeholder="Enter your Nmae" value={name} style={{marginTop:"0px"}} onChange={(event) =>this.handleInputChange(event,'name')}/>
                        

                        <label >Email address</label>
                        <input type="email" className="form-control" required  placeholder="name@example.com"value={email} style={{marginTop:"0px"}} onChange={(event) =>this.handleInputChange(event,'email')}/>


                        <label >Phone Number</label>
                        <input type="telephone" className="form-control" required  placeholder="Enter your Contact Details"value={contactNumber} style={{marginTop:"0px"}}  onChange={(event) =>this.handleInputChange(event,'contactNumber')}/>
                 
                        
                 
                        <label >Address</label>
                        <input type="text" className="form-control" required  placeholder="Enter your Address" value={address} style={{marginTop:"0px"}} onChange={(event) =>this.handleInputChange(event,'address')}/>
                        </form>
                  </div>
                    <buton class="btn btn-danger" style={{float:'right',marginTop:'15px'}}onClick={this.payment}>Procced</buton>
                    
                    </div>
                    </Modal>


        </div>
        
        )
    }
}

               
        

export default Details;