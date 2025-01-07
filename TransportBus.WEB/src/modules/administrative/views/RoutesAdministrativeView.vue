<script>
import { useRoutesStore } from '../../../core/stores/routesStore';
import RouteEdit from '../components/routes/RouteEdit.vue';
export default {
    components: {
        RouteEdit,
    },
    data() {
        return {
            routesStore: useRoutesStore(),
            dialog: false,
            dialogDelete: false,
            headers: [],
            routes: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                code: '',
                directions: 0,
                stops: 0,
            },
            defaultItem: {
                name: '',
                code: '',
                directions: 0,
                stops: 0,
            },
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        initialize() {
            this.headers = [
                { title: this.$t('administrative.routes.name'), align: 'start', key: 'name' },
                { title: this.$t('administrative.routes.code'), key: 'code' },
                { title: this.$t('administrative.routes.directions'), key: 'directions' },
                { title: this.$t('administrative.routes.stops'), key: 'stops' },
                { title: this.$t('administrative.routes.actions'), key: 'actions', sortable: false, align: 'end' },
            ]
            this.routes = this.routesStore.routes.map((route) => ({
                id: route.id,
                name: route.longName,
                code: route.shortName,
                directions: route.patterns.length,
                stops: route.patterns[0].stops.length,
            }))
        },

        editItem(item) {
            this.editedIndex = this.routes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.routes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.routes.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
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
            if (this.editedIndex > -1) {
                Object.assign(this.routes[this.editedIndex], this.editedItem)
            } else {
                this.routes.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<template>
    <v-data-table :headers="headers" :items="routes">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="850px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2" color="primary" v-bind="props">
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <RouteEdit :route="editedItem" />
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
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
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>