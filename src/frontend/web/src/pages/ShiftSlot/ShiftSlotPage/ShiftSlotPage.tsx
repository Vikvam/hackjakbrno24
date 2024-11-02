import ShiftSlotCell from 'src/components/ShiftSlot/ShiftSlotCell'

type ShiftSlotPageProps = {
  id: number
}

const ShiftSlotPage = ({ id }: ShiftSlotPageProps) => {
  return <ShiftSlotCell id={id} />
}

export default ShiftSlotPage
