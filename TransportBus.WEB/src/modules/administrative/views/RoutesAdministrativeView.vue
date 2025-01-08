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
                id: -1,
                name: '',
                code: '',
                directions: 0,
                stops: 0,
                patterns: [],
            },
            defaultItem: {
                id: -1,
                name: '',
                code: '',
                directions: 0,
                stops: 0,
                patterns: [],
            },
            mode: 'add',
            formValidationTrigger: false,
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? this.$t('administrative.routes.newRoute') : this.$t('administrative.routes.editRoute')
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
                patterns: route.patterns,
            }))
        },

        editItem(item) {
            this.editedIndex = this.routes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.mode = 'edit'
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.routes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        saveData(data) {
            console.log(data);
            if(data.isValid) {
                if (this.mode == 'add') {
                    this.routes.push(data.data)
                } else {
                    this.routes[this.editedIndex] = data.data
                }
                this.close()
            }
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
            this.mode = 'add'
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
    <div class="overflow-y-scroll">
        <v-data-table :headers="headers" :items="routes">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ $t('administrative.routes.routesTable') }}</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="950px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" v-bind="props">
                                {{ $t('administrative.routes.addRoute') }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <RouteEdit :route="editedItem" :mode="mode" :trigger="formValidationTrigger" @validate="saveData" />
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
                            <v-card-title class="text-h6">{{ $t('administrative.routes.deleteComfirmation')
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
                    {{ $t('administrative.stop.noStops') }}
                </h1>
            </template>
        </v-data-table>
    </div>
</template>