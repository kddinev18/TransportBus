<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    setup(){
        return { v$: useVuelidate() }
    },
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    methods: {
        async logIn () {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) 
            {
                return
            }
        },
    },
    validations() {
        return {
            userName: { required },
            password: { required }
        }
    },
}
</script>

<template>
    <div class="tw-grid tw-grid-cols-5 tw-h-screen tw-bg-background">
    <div class="tw-bg-primary tw-col-span-3"></div>
        <div class="tw-bg-background tw-col-span-2 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div class="tw-w-3/4 tw-max-w-md">
                <h1 class="tw-text-3xl tw-mb-6 tw-font-bold tw-text-primary">
                {{ $t('auth.logIn.logIn') }}
                </h1>
                <v-text-field
                    v-model.trim="userName"
                    :label="$t('auth.logIn.userName')"
                    @blur="v$.userName.$touch"
                    @input="v$.userName.$touch"
                    :error-messages="v$.userName.$errors.map(e => e.$message)">
                </v-text-field>
                <v-text-field
                    v-model.trim="password"
                    :label="$t('auth.logIn.password')"
                    type="password">
                </v-text-field>
                <div class="tw-flex tw-justify-between">
                    <v-checkbox 
                        :label="$t('auth.logIn.rememberMe')" 
                        color="primary">
                    </v-checkbox>
                    <a class="tw-text-accent tw-mt-4 hover:tw-underline">
                        {{ $t('auth.logIn.forgotPassword') }}
                    </a>
                </div>
                <v-btn
                    class="tw-mt-6"
                    color="primary"
                    block
                    @click="logIn">
                    {{ $t('auth.logIn.logIn') }}
                </v-btn>
            </div>
        </div>
    </div>
</template>