export interface LabelItem {
  text: string
}

export type AccountType = 'LDAP' | 'Локальная'

export interface AccountFormData {
  id: string
  label: string
  type: AccountType
  login: string
  password: string | null
}

export interface AccountStoreData {
  id: string
  label: LabelItem[]
  type: AccountType
  login: string
  password: string | null
}
