import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as scheduleActions from '../actions/scheduleActions';
import data from '../../data/data.json'
import './schedule.css';

const daysByNumber= (num)=>{
  let daysObj={1:'mo',2:'tu',3:'we',4:'th',5:'fr',6:'sa',7:'su'}
  return daysObj[num].toUpperCase();
}
class Schedule extends Component {
  constructor(props, context) {
     super(props, context);
     this.state={
       selectionInProgress:false,
       deletionInProgress:false,
     }
  this.props.actions.loadSchedule(data);
   }
   onCellClick= (day,hour)=>(e)=>{
    const { scheduleTable } = this.props;
    this.props.actions.changeScheduleTable(+day,+hour);
   }
   onMouseEnter= (day,hour)=>(e)=>{
    const { scheduleTable } = this.props;
    this.state.selectionInProgress ? this.props.actions.changeScheduleTableMouseMove(+day,+hour,'add') : null;
    this.state.deletionInProgress ? this.props.actions.changeScheduleTableMouseMove(+day,+hour,'del') : null;

   }
   selectionToggle = (type)=>(e)=>{
     console.log('which button',e.button)

     type=='start' && e.button==0 && this.setState({selectionInProgress:true})
     type=='end'  && e.button==0 && this.setState({selectionInProgress:false})
     //
     type=='start' && e.button==2 && this.setState({deletionInProgress:true})
     type=='end'  && e.button==2 && this.setState({deletionInProgress:false})
   }
   toggleMarkAllDay= (day)=>(e)=>{
     let toggle;
     this.props.scheduleTable[day].length>=24 ? toggle=false : toggle=true;
     toggle ? this.props.actions.markAllDay(+day) : this.props.actions.unMarkAllDay(+day)
   }
   showOutput= ()=>{
     this.props.actions.transformScheduleData(this.props.scheduleTable)
   }

    render() {
      const {scheduleTable,everyHour,scheduleDataOutput,jsonOutput } = this.props;
      /////////testblock///////////////
      let test=[1,2,3,5,7,8,9,10,15,16,17,18,21,22,24 ]
      let test2=[50, 50, 20, 1,2,3,5,7,8,9,10,15,16,17,18,21,22,24 ]
      const maxItems = test.filter((item,idx) => item + 1 !== test[idx + 1]);


      const sortNumber = (a, b) => a - b;
      const sortarr = test2.sort(sortNumber);
      console.log({ sortarr });
      const result2 = maxItems.reduce((arr, item, i) => {
        const part = arr.splice(0, arr.indexOf(item) + 1);
        arr.push(part);
        return arr;
      }, [...test]);
const rendeTh=()=>{
  let tempArr=[];
  let show;
  for(let i=1;i<27;i++){
    show=(i-2);
    tempArr.push(<th className={i!==2 && show%3==0 && 'cell-head'}> <span className="vertical">{i!==2 && show%3==0 && show+':00'}</span></th>)
}

return tempArr;
}
      //////////
      return (
          <div>
            <h1 >SET SCHEDULE</h1>
          {/* {console.log("scheduleTable", scheduleTable)} */}
          {/* {console.log("test", test)} */}
          {/* {console.log({ result2 })} */}
          {/* {console.log("maxItems", maxItems)} */}

          <table>
            <thead>
              <tr>
              {rendeTh()}
              </tr>
            </thead>
            <tbody>
            {Object.keys(scheduleTable).map(sh =>
            (<tr key={sh}>
              <td className="days" >{daysByNumber(sh)}</td>
              <td className="allday"
                onClick={this.toggleMarkAllDay(sh)}>
            {  scheduleTable[sh].length>=24 ?  <i>Day marked &#10004;</i>: <i> mark day</i>}
              </td>

              {everyHour.map(item => scheduleTable[sh].find(each=>each==item) || '').map((cell,i) =>
               (<td key={i+1}
                  className={cell ? 'higlight-cell' : 'cell'}
                  onClick={this.onCellClick(sh,i+1)}
                  onMouseEnter={this.onMouseEnter(sh,i+1)}
                  onMouseDown={this.selectionToggle('start')}
                  onMouseUp={this.selectionToggle('end')}

                  >
                    {/* {cell} */}
                </td>))}
            </tr>)
            )
            }
          </tbody>
            </table>
            <button
              className="save-btn"
              onClick={this.showOutput}
              >
              Save changes
            </button>
            <div className="output">{jsonOutput}</div>

            </div>
        )
    }
}


function mapStateToProps(state) {
  return {
    scheduleDataOutput:state.schedule.scheduleDataOutput,
    scheduleTable:state.schedule.scheduleTable,
    jsonOutput:state.schedule.jsonOutput,
    everyHour:state.schedule.everyHour,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(scheduleActions, dispatch)
  };
}

export default connect(  mapStateToProps,  mapDispatchToProps)(Schedule);
