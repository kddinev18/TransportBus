<script>
export default {
    data() {
        return {
            isDropdownVisible: false,
        };
    },
    methods: {
        toggleDropdown() {
            if (!localStorage.getItem('authToken')) {
                this.$router.push({ name: 'logIn' });
            }
            else {
                this.isDropdownVisible = !this.isDropdownVisible;
            }
        },
        handleOutsideClick(event) {
            const dropdown = this.$el;
            if (!dropdown.contains(event.target)) {
                this.isDropdownVisible = false;
            }
        },
        optionsChosen(option) {
            if (option === 'administration') {
                this.$router.push({ name: 'administration' });
            } else if (option === 'settings') {
                this.$router.push({ name: 'settings' });
            } else if (option === 'exit') {
                this.$snackbar.add({
                    type: 'success',
                    text: this.$t('auth.logIn.logOutSuccess'),
                });
                localStorage.removeItem('authToken');
                this.$router.push({ name: 'home' });
            }
            this.isDropdownVisible = !this.isDropdownVisible;
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
    <div class="absolute top-4 right-4 transform z-50 p-4 bg-white shadow-md rounded-full">
        <button type="button" class="text-sm font-medium bg-white hover:bg-gray-200" @click="toggleDropdown">
            <v-icon color="text" icon="mdi-account" size="large"></v-icon>
        </button>
        <div v-if="isDropdownVisible"
            class="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <ul class="py-1">
                <button
                    class="flex flex-row px-2 py-2 gap-4 text-sm text-gray-700 hover:bg-gray-100 w-full align-middle"
                    @click="optionsChosen('administration')">
                    <v-icon color="text" icon="mdi-security" size="large"></v-icon>
                    {{ $t('auth.logIn.administation') }}
                </button>
                <button
                    class="flex flex-row px-2 py-2 gap-4 text-sm text-gray-700 hover:bg-gray-100 w-full align-middle"
                    @click="optionsChosen('settings')">
                    <v-icon color="text" icon="mdi-cog" size="large"></v-icon>
                    {{ $t('auth.logIn.settings') }}
                </button>
                <button
                    class="flex flex-row px-2 py-2 gap-4 text-sm text-gray-700 hover:bg-gray-100 w-full align-middle"
                    @click="optionsChosen('exit')">
                    <v-icon color="text" icon="mdi-logout" size="large"></v-icon>
                    {{ $t('auth.logIn.logOut') }}
                </button>
            </ul>
        </div>
    </div>
</template>