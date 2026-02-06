<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import AccountRow from './AccountRow.vue'

const store = useAccountsStore()
</script>

<template>
  <div>
    <div class="d-flex align-center mb-4">
      <h2 class="text-h5 mr-2">Учетные записи</h2>
      <v-btn
        variant="outlined"
        icon
        rounded="lg"
        size="32"
        color="grey"
        @click="store.addAccount()"
      >
        <span style="font-size: 20px; line-height: 1;">+</span>
      </v-btn>
    </div>

    <v-alert v-if="store.accounts.length === 0" type="info" variant="tonal" class="mb-4">
      Нет учетных записей. Нажмите «+» чтобы добавить.
    </v-alert>

    <template v-else>
      <v-row class="font-weight-bold text-caption mb-1" no-gutters>
        <v-col cols="3">Метка</v-col>
        <v-col cols="2">Тип записи</v-col>
        <v-col cols="3">Логин</v-col>
        <v-col cols="3">Пароль</v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <div class="d-flex align-center text-caption mb-3 pa-2 rounded" style="background-color: #e3f2fd; color: #000;">
        <v-icon size="small" class="mr-1" color="grey-darken-1">mdi-help-circle-outline</v-icon>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </div>

      <AccountRow
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
      />
    </template>
  </div>
</template>
