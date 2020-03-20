export interface UserSchema {
  name: string
  email: string
  password: string
  oldPassword?: string,
  confirmPassword?: string
  provider?: boolean
}

export interface AppointmentSchema {
  date: Date
  provider_id: number
}
