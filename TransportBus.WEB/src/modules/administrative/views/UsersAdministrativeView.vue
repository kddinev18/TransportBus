<script>
import UserEdit from '../components/users/UserEdit.vue';
import UserService from '../services/userService';
export default {
    components: {
        UserEdit,
    },
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [],
            users: [],
            editedIndex: -1,
            editedItem: {
                id: -1,
                email: '',
                firstName: '',
                password: '',
            },
            defaultItem: {
                id: -1,
                email: '',
                firstName: '',
                password: '',
            },
            mode: 'add',
            formValidationTrigger: false,
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? this.$t('administrative.users.newUser') : this.$t('administrative.users.editUser')
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        async initialize() {
            this.headers = [
                { title: this.$t('administrative.users.email'), align: 'start', key: 'email' },
                { title: this.$t('administrative.users.firstName'), key: 'firstName' },
                { title: this.$t('administrative.users.actions'), key: 'actions', sortable: false, align: 'end' },
            ]
            this.users = (await UserService.getAllUsers()).data;
            console.log(this.users);
        },

        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.mode = 'edit'
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async saveData(data) {
            let isSuccressful = false;
            const currentUser = this.users[this.editedIndex];
            if (data.isValid) {
                if (this.mode == 'add') {
                    isSuccressful = await UserService.addUser(data.data);
                } else {
                    isSuccressful = await UserService.updateUser(currentUser.id,
                        {
                            email: data.data.email,
                            firstName: data.data.firstName,
                            password: currentUser.password
                        }
                    );
                }
            }

            if (isSuccressful) {
                if (this.mode == 'edit') {
                    this.users[this.editedIndex] = {
                        email: data.data.email,
                        firstName: data.data.firstName,
                        password: currentUser.password
                    };
                } else {
                    this.users.push(data.data);
                }
                this.close();

            }
        },

        deleteItemConfirm() {
            this.stops.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.mode = 'add'
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            this.formValidationTrigger = !this.formValidationTrigger;
        },
    },
}
</script>

<template>
    <div class="animate-appear overflow-y-scroll">
        <v-data-table :headers="headers" :items="users">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ $t('administrative.users.usersTable') }}</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="950px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" v-bind="props">
                                {{ $t('administrative.users.addUser') }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <UserEdit :user="editedItem" :mode="mode" :trigger="formValidationTrigger"
                                        @validate="saveData" />
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    {{ $t('common.cancel') }}
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    {{ $t('common.save') }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="700px">
                        <v-card>
                            <v-card-title class="text-h6">{{ $t('administrative.users.deleteComfirmation')
                                }}</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">{{ $t('common.cancel')
                                    }}</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">{{
                                    $t('common.ok') }}</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <h1 class="text-l text-text">
                    {{ $t('administrative.users.noUsers') }}
                </h1>
            </template>
        </v-data-table>
    </div>
</template>