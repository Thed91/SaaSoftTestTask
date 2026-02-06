<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import type { AccountStoreData, AccountType, LabelItem } from '@/types/account'

const props = defineProps<{
  account: AccountStoreData
}>()

const store = useAccountsStore()

const accountTypes: AccountType[] = ['LDAP', 'Локальная']

const labelText = ref(labelToString(props.account.label))
const type = ref<AccountType>(props.account.type)
const login = ref(props.account.login)
const password = ref(props.account.password ?? '')

const loginError = ref(false)
const passwordError = ref(false)

function labelToString(items: LabelItem[]): string {
  return items.map((item) => item.text).join('; ')
}

function parseLabel(text: string): LabelItem[] {
  return text
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => ({ text: s }))
}

function validate(): boolean {
  let valid = true

  loginError.value = login.value.trim().length === 0
  if (loginError.value) valid = false

  if (type.value === 'Локальная') {
    passwordError.value = password.value.trim().length === 0
    if (passwordError.value) valid = false
  } else {
    passwordError.value = false
  }

  return valid
}

function saveIfValid(): void {
  if (!validate()) return

  store.saveAccount({
    id: props.account.id,
    label: parseLabel(labelText.value),
    type: type.value,
    login: login.value,
    password: type.value === 'Локальная' ? password.value : null,
  })
}

function onTypeChange(newType: AccountType): void {
  type.value = newType
  if (newType === 'LDAP') {
    password.value = ''
    passwordError.value = false
  }
  saveIfValid()
}

watch(
  () => props.account,
  (acc) => {
    labelText.value = labelToString(acc.label)
    type.value = acc.type
    login.value = acc.login
    password.value = acc.password ?? ''
  },
)
</script>

<template>
  <v-row align="center" no-gutters class="mb-2">
    <v-col cols="3" class="pr-2">
      <v-text-field
        v-model="labelText"
        placeholder="Метка"
        density="compact"
        variant="outlined"
        maxlength="50"
        hide-details="auto"
        @blur="saveIfValid()"
      />
    </v-col>

    <v-col cols="2" class="pr-2">
      <v-select
        :model-value="type"
        :items="accountTypes"
        density="compact"
        variant="outlined"
        hide-details="auto"
        @update:model-value="onTypeChange($event as AccountType)"
      />
    </v-col>

    <v-col cols="3" class="pr-2">
      <v-text-field
        v-model="login"
        placeholder="Логин"
        density="compact"
        variant="outlined"
        maxlength="100"
        :error="loginError"
        hide-details="auto"
        @blur="saveIfValid()"
      />
    </v-col>

    <v-col cols="3" class="pr-2">
      <v-text-field
        v-if="type === 'Локальная'"
        v-model="password"
        placeholder="Пароль"
        type="password"
        density="compact"
        variant="outlined"
        maxlength="100"
        :error="passwordError"
        hide-details="auto"
        @blur="saveIfValid()"
      />
    </v-col>

    <v-col cols="1" class="text-center">
      <v-btn
        icon
        variant="text"
        color="red"
        size="small"
        @click="store.removeAccount(account.id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
