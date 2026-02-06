<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import AccountRow from './AccountRow.vue'

const store = useAccountsStore()
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5">Учетные записи</h2>
      <v-btn icon color="primary" size="small" @click="store.addAccount()">
        <v-icon>mdi-plus</v-icon>
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

      <p class="text-caption text-grey mb-3">
        Метка — текстовые метки через знак «;»
      </p>

      <AccountRow
        v-for="account in store.accounts"
        :key="account.id"
        :account="account"
      />
    </template>
  </div>
</template>
