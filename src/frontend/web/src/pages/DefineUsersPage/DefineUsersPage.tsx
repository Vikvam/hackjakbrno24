// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import SelectUserCell from "src/components/UserSelectCell"
const DefineUsersPage = () => {
  return (
    <>
      <Metadata title="DefineUsers" description="DefineUsers page" />

      <h1>DefineUsersPage</h1>
      <SelectUserCell></SelectUserCell>
      </>
  )
}

export default DefineUsersPage
