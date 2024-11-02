import type { EditUserById, UpdateUserInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit, SelectField,
} from '@redwoodjs/forms'

type FormUser = NonNullable<EditUserById['user']>

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="stem"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Stem
        </Label>

        <SelectField name={"stem"}>
          <option value={"RTG"}>RTG</option>
          <option value={"CT"}>CT</option>
        </SelectField>
        <FieldError name="stem" className="rw-field-error" />

        <Label
          name="attestation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Attestation
        </Label>
        <SelectField name={"attestation"}>
          <option value={"INTERNAL"}>INTERNAL</option>
          <option value={"ORTHOPEDIC"}>ORTHOPEDIC</option>
          <option value={"UROLOGY"}>UROLOGY</option>
          <option value={"PEDIATRIC"}>PEDIATRIC</option>
          <option value={"RTG"}>RTG</option>
        </SelectField>
        <FieldError name="attestation" className="rw-field-error" />

        <Label
          name="qualification"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Qualification
        </Label>
        <SelectField name={"qualification"}>
          <option value={"Absolvent"}>Absolvent</option>
          <option value={"Kmen"}>Kmen</option>
          <option value={"Atestace"}>Atestace</option>
        </SelectField>
        <FieldError name="qualification" className="rw-field-error" />


        <Label
          name="rtg_preference"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rtg preference
        </Label>

        <TextField
          name="rtg_preference"
          defaultValue={props.user?.rtg_preference}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="rtg_preference" className="rw-field-error" />

        <Label
          name="ct_preference"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ct preference
        </Label>

        <TextField
          name="ct_preference"
          defaultValue={props.user?.ct_preference}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="ct_preference" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
