// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="ShiftSlots" titleTo="shiftSlots" buttonLabel="New ShiftSlot" buttonTo="newShiftSlot">
        <Route path="/shift-slots/new" page={ShiftSlotNewShiftSlotPage} name="newShiftSlot" />
        <Route path="/shift-slots/{id:Int}/edit" page={ShiftSlotEditShiftSlotPage} name="editShiftSlot" />
        <Route path="/shift-slots/{id:Int}" page={ShiftSlotShiftSlotPage} name="shiftSlot" />
        <Route path="/shift-slots" page={ShiftSlotShiftSlotsPage} name="shiftSlots" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="UserSchedules" titleTo="userSchedules" buttonLabel="New UserSchedule" buttonTo="newUserSchedule">
        <Route path="/user-schedules/new" page={UserScheduleNewUserSchedulePage} name="newUserSchedule" />
        <Route path="/user-schedules/{id:Int}/edit" page={UserScheduleEditUserSchedulePage} name="editUserSchedule" />
        <Route path="/user-schedules/{id:Int}" page={UserScheduleUserSchedulePage} name="userSchedule" />
        <Route path="/user-schedules" page={UserScheduleUserSchedulesPage} name="userSchedules" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
