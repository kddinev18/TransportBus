<script>
import AuthenticationService from '../services/authenticationService'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    methods: {
        async logIn() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) {
                return;
            }
            else {
                let result = AuthenticationService.logIn(this.userName, this.password);
                if (result) {
                    this.$router.push({ name: 'home' });
                }
            }
        },
        goBack() {
            this.$router.push({ name: 'home' });
        }
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
    <div class="absolute top-4 left-4 transform z-50">
        <v-btn class="col-span-1" density="comfortable" icon="mdi-arrow-left" @click="goBack"></v-btn>
    </div>
    <div class="grid grid-cols-5 h-screen bg-background">
        <div class="bg-background col-span-2 flex flex-col justify-center items-center">
            <div class="w-3/4 max-w-md">
                <h1 class="text-3xl mb-6 font-bold text-primary">
                    {{ $t('auth.logIn.logIn') }}
                </h1>
                <v-text-field v-model.trim="userName" :label="$t('auth.logIn.userName')" @blur="v$.userName.$touch"
                    @input="v$.userName.$touch" :error-messages="v$.userName.$errors.map(e => e.$message)">
                </v-text-field>
                <v-text-field v-model.trim="password" :label="$t('auth.logIn.password')" type="password">
                </v-text-field>
                <div class="flex justify-between">
                    <v-checkbox :label="$t('auth.logIn.rememberMe')" color="primary">
                    </v-checkbox>
                    <a class="text-accent mt-4 hover:underline">
                        {{ $t('auth.logIn.forgotPassword') }}
                    </a>
                </div>
                <v-btn class="mt-6" color="primary" block @click="logIn">
                    {{ $t('auth.logIn.logIn') }}
                </v-btn>
            </div>
        </div>
        <div class="bg-primary col-span-3 w-full h-screen overflow-hidden">
            <img src="https://openmaptiles.org/img/map-cards-img/Topo.png" class="w-full h-full object-cover" />
        </div>
    </div>
</template>