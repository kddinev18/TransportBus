<script>
export default {
    data() {
        return {
            isDropdownVisible: false,
        };
    },
    computed:
    {
        isAuthenticated() {
            return localStorage.getItem('authToken') != null;
        }
    },
    methods: {
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
        },
        handleOutsideClick(event) {
            const dropdown = this.$el;
            if (!dropdown.contains(event.target)) {
                this.isDropdownVisible = false;
            }
        },
        optionsChosen(option) {
            if (option === 'administration') {
                this.$router.push({ name: 'admin' });
            } else if (option === 'settings') {
                if (this.$i18n.locale === 'bg') {
                    this.$i18n.locale = 'en';
                } else {
                    this.$i18n.locale = 'bg';
                }
            } else if (option === 'exit') {
                this.$snackbar.add({
                    type: 'success',
                    text: this.$t('auth.logIn.logOutSuccess'),
                });
                localStorage.removeItem('authToken');
                this.$router.push({ name: 'home' });
                setTimeout(() => {
                    this.isDropdownVisible = !this.isDropdownVisible;
                }, 100);
            } else if (option === 'logIn') {
                this.$router.push({ name: 'logIn' });
            }
        }
    },
    mounted() {
        document.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
}
</script>

<template>
    <div class="absolute top-4 right-4 transform z-50 p-2 bg-white shadow-md rounded-full">
        <v-btn icon="mdi-account" variant="plain" class="text-sm font-medium bg-white hover:bg-gray-200"
            @click="toggleDropdown">
        </v-btn>
        <div v-if="isDropdownVisible"
            class="animate-appear absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <ul class="py-1">
                <v-btn variant="plain" v-if="isAuthenticated" @click="optionsChosen('administration')">
                    <v-icon color="text" icon="mdi-security" size="large"></v-icon>
                    {{ $t('auth.logIn.administation') }}
                </v-btn>
                <v-btn variant="plain" @click="optionsChosen('settings')">
                    <v-icon color="text" icon="mdi-flag" size="large"></v-icon>
                    {{ $t('auth.logIn.language') }}
                </v-btn>
                <v-btn variant="plain" v-if="isAuthenticated" @click="optionsChosen('exit')">
                    <v-icon color="text" icon="mdi-logout" size="large"></v-icon>
                    {{ $t('auth.logIn.logOut') }}
                </v-btn>
                <v-btn variant="plain" v-if="!isAuthenticated" @click="optionsChosen('logIn')">
                    <v-icon color="text" icon="mdi-login" size="large"></v-icon>
                    {{ $t('auth.logIn.logIn') }}
                </v-btn>
            </ul>
        </div>
    </div>
</template>