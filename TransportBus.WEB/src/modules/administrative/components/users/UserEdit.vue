<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
    data() {
        return {
            email: '',
            firstName: '',
            password: '',
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        const passwordRules = this.isPasswordVisible ? { required } : {};
        return {
            email: { required, email },
            firstName: { required },
            password: passwordRules,
        }
    },
    props: {
        user: Object,
        mode: String,
        trigger: Boolean
    },
    methods:
    {
        async validate() {
            const isValid = await this.v$.$validate();
            this.$emit('validate', {
                isValid: isValid,
                data:
                {
                    email: this.email,
                    firstName: this.firstName,
                    password: this.password
                }
            });
        }
    },
    emits: ['validate'],
    watch: {
        trigger() {
            console.log('trigger');
            this.validate();
        }
    },
    computed:
    {
        isPasswordVisible() {
            return this.mode == 'add';
        }
    },
    created() {
        if (this.user && this.user.id != -1) {
            console.log(this.mode);
            this.email = this.user.email;
            this.firstName = this.user.firstName;
        }
    }
}
</script>

<template>
    <h1 class="text-2xl mb-4 mt-6 font-bold text-text">
        {{ $t('administrative.users.userData') }}
    </h1>
    <div class="flex flex-row gap-4 justify-between">
        <v-text-field :label="$t('administrative.users.name')" v-model.trim="firstName" @blur="v$.firstName.$touch"
            @input="v$.firstName.$touch" :error-messages="v$.firstName.$errors.map(e => e.$message)" />
        <v-text-field :label="$t('administrative.users.email')" v-model.trim="email" @blur="v$.email.$touch"
            @input="v$.email.$touch" :error-messages="v$.email.$errors.map(e => e.$message)" />
    </div>
    <v-text-field :label="$t('administrative.users.password')" v-if="isPasswordVisible" v-model.trim="password"
        @blur="v$.password.$touch" @input="v$.password.$touch"
        :error-messages="v$.password.$errors.map(e => e.$message)" type="password" />
</template>