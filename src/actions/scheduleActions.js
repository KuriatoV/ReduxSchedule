import * as types from '../constants/ActionTypes';;

export function loadSchedule (scheduleData) {
    return {type: types.LOAD_SCHEDULE, scheduleData};
}
export function changeScheduleTable (day,hour) {
    return {type: types.CHANGE_SCHEDULE_TABLE, day,hour};
}
export function changeScheduleTableMouseMove (day,hour) {
    return {type: types.CHANGE_SCHEDULE_TABLE_MOUSE_MOVE, day,hour};
}
export function markAllDay (day) {
    return {type: types.MARK_ALL_DAY, day};
}
export function unMarkAllDay (day) {
    return {type: types.UNMARK_ALL_DAY, day};
}
export function transformScheduleData (data) {
    return {type: types.TRANSFORM_DATA, data};
}
