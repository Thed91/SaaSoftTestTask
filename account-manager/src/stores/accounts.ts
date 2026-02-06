import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AccountStoreData, AccountType } from '@/types/account'

const STORAGE_KEY = 'accounts'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadFromStorage(): AccountStoreData[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as AccountStoreData[]
  } catch {
    return []
  }
}

function isValid(account: AccountStoreData): boolean {
  if (!account.login.trim()) return false
  if (account.type === 'Локальная' && !account.password?.trim()) return false
  return true
}

function persistToStorage(accounts: AccountStoreData[]): void {
  const valid = accounts.filter(isValid)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(valid))
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<AccountStoreData[]>(loadFromStorage())

  function addAccount(): void {
    accounts.value.push({
      id: generateId(),
      label: [],
      type: 'LDAP' as AccountType,
      login: '',
      password: null,
    })
  }

  function removeAccount(id: string): void {
    const index = accounts.value.findIndex((a) => a.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
      persistToStorage(accounts.value)
    }
  }

  function saveAccount(updated: AccountStoreData): void {
    const index = accounts.value.findIndex((a) => a.id === updated.id)
    if (index !== -1) {
      accounts.value[index] = { ...updated }
    } else {
      accounts.value.push({ ...updated })
    }
    persistToStorage(accounts.value)
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    saveAccount,
  }
})
