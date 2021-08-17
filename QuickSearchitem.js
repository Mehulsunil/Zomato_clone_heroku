import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component{
  handleNavigate = (mealtypeId , mealtypeValue,mealtypecity) =>{
    const locationId = sessionStorage.getItem('location');
    if (locationId){
      this.props.history.push(`/filter?mealtypes=${mealtypeId}&locations=${locationId}`);
    }
    else{
      this.props.history.push(`/filter?mealtypes=${mealtypeId}&mealtypeValue=${mealtypeValue}&mealtypecity=${mealtypecity}`);
    }
    
  }

    render(){
      const { qsItemData,key} = this.props;
        return(
         <div key={key} className="col-sm-12 col-md-6 col-lg-4 " onClick={() =>this.handleNavigate(qsItemData.mealtype_id,qsItemData.name,qsItemData.city)}>
        <div className="Rectangle-5">
        <img src={`./${qsItemData.image}`} alt="pics" width="160px" height="160px"></img>
        <div className="Breakfast">
          {qsItemData.name}
          </div>
        <div className="Start-your-day-with-exclusive-breakfast-options">
          {qsItemData.content}
          </div>
          </div>
          </div>
            
        )
    }
}

export default withRouter(QuickSearchItem);


//app.use(cors());
//app.options('*', cors());
