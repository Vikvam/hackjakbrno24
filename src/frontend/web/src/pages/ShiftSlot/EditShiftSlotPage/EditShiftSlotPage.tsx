import EditShiftSlotCell from 'src/components/ShiftSlot/EditShiftSlotCell'

type ShiftSlotPageProps = {
  id: number
}

const EditShiftSlotPage = ({ id }: ShiftSlotPageProps) => {
  return <EditShiftSlotCell id={id} />
}

export default EditShiftSlotPage
