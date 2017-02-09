import * as types from '../constants/ActionTypes';
import _remove from 'lodash/remove';

const daysByNumber= (num)=>{
  let daysObj={1:'mo',2:'tu',3:'we',4:'th',5:'fr',6:'sa',7:'su'}
  return daysObj[num];
}

const initialState = {
everyHour:Array.from({ length: 24 }, (v, k) => k+1),
scheduleData:[],
scheduleTable:{
  1:[],
  2:[],
  3:[],
  4:[],
  5:[],
  6:[],
  7:[]
},
scheduleDataOutput:{},
jsonOutput:'',
}

export default function scheduleReducer(state = initialState, action) {
    switch (action.type) {

      case types.LOAD_SCHEDULE:{
          console.log(action.scheduleData)
        let schedule={
          1:action.scheduleData['mo'],
          2:action.scheduleData['tu'],
          3:action.scheduleData['we'],
          4:action.scheduleData['th'],
          5:action.scheduleData['fr'],
          6:action.scheduleData['sa'],
          7:action.scheduleData['su'],
        }
        let scheduleTable={
          1:[],
          2:[],
          3:[],
          4:[],
          5:[],
          6:[],
          7:[]
        }
        Object.keys(schedule).map(each=>{
        schedule[each].map(item=>{
        let start=item.bt/60;
        (start==0) ? (start=1 ):null;
        let stop=(item.et+1)/60;
        let period=stop-start;
        for (let i=start; i<=period+start; i++){
            scheduleTable[each].push(i)
          }
        })
        })

      return {...state,scheduleTable: scheduleTable}
    }
      case types.CHANGE_SCHEDULE_TABLE:{
      const {day,hour}= action
      let scheduleTableUpdated={...state.scheduleTable}

      scheduleTableUpdated[day].length
      ?
      (scheduleTableUpdated[day].includes(hour) ? scheduleTableUpdated[day].splice(scheduleTableUpdated[day].indexOf(hour),1)
      :  scheduleTableUpdated[day].push(hour)
     )
     :
      scheduleTableUpdated[day].push(hour)

      return {...state,scheduleTable: scheduleTableUpdated}
      }
      case types.MARK_ALL_DAY:{
        const {day}=action
        let scheduleTableUpdated={...state.scheduleTable}
         scheduleTableUpdated[day]=state.everyHour

        return {...state,scheduleTable: scheduleTableUpdated}
      }
      case types.UNMARK_ALL_DAY:{
        const {day}=action
        let scheduleTableUpdated={...state.scheduleTable}
         scheduleTableUpdated[day]=[]
        return {...state,scheduleTable: scheduleTableUpdated}
      }
      case types.TRANSFORM_DATA:{
        const data=action.data;
        let scheduleDataOutput={};
          Object.keys(data).map((num)=>
           scheduleDataOutput[daysByNumber(num)]=data[num].map(item=>({bt:item*60-60,et:item*60+59-60}))
        )
        return {...state,scheduleDataOutput: scheduleDataOutput,jsonOutput:JSON.stringify(scheduleDataOutput,null, 2)}
      }
      case types.CHANGE_SCHEDULE_TABLE_MOUSE_MOVE:{
      const {day,hour,whatToDo}= action
      console.log('MOUSE_MOVE',whatToDo)
      let scheduleTableUpdated={...state.scheduleTable}
      if (whatToDo=='add'){
      // let scheduleTableUpdated={...state.scheduleTable}

      scheduleTableUpdated[day].length
      ?
      !scheduleTableUpdated[day].includes(hour) &&  scheduleTableUpdated[day].push(hour)
     :
      scheduleTableUpdated[day].push(hour)
    }
    if (whatToDo=='del'){

      scheduleTableUpdated[day].length
      ?
      scheduleTableUpdated[day].includes(hour) &&  scheduleTableUpdated[day].splice(scheduleTableUpdated[day].indexOf(hour),1)
     :
      null
    }

      return {...state,scheduleTable: scheduleTableUpdated}
      }
        default: {
            return state;
        }
    }
}
