<script>
import { useStopsStore } from '../../../core/stores/stopsStore';
import StopEdit from '../components/stops/StopEdit.vue';
export default {
    components: {
        StopEdit,
    },
    data() {
        return {
            stopsStore: useStopsStore(),
            dialog: false,
            dialogDelete: false,
            headers: [],
            stops: [],
            editedIndex: -1,
            editedItem: {
                id: -1,
                name: '',
                code: '',
                latitude: 0,
                longitude: 0,
            },
            defaultItem: {
                id: -1,
                name: '',
                code: '',
                latitude: 0,
                longitude: 0,
            },
            mode: 'add',
        }
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? this.$t('administrative.stops.newStop') : this.$t('administrative.stops.editStop')
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
                { title: this.$t('administrative.stops.name'), align: 'start', key: 'name' },
                { title: this.$t('administrative.stops.code'), key: 'code' },
                { title: this.$t('administrative.stops.actions'), key: 'actions', sortable: false, align: 'end' },
            ]
            this.stops = this.stopsStore.stops.map((stop) => ({
                id: stop.id,
                name: stop.name,
                code: stop.code,
                latitude: stop.latitude,
                longitude: stop.longitude,
            }));
            console.log(this.stops);
        },

        editItem(item) {
            this.editedIndex = this.stops.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.mode = 'edit'
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.stops.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.stops.splice(this.editedIndex, 1)
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
            this.close()
        },
    },
}
</script>

<template>
    <div class="overflow-y-scroll">
        <v-data-table :headers="headers" :items="stops">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ $t('administrative.stops.stopsTable') }}</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="950px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" v-bind="props">
                                {{ $t('administrative.stops.addStop') }}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <StopEdit :stop="editedItem" :mode="mode" />
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
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h6">{{ $t('administrative.stops.deleteComfirmation')
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
                <v-btn color="primary" @click="initialize">
                    <h1 class="text-l text-text">
                        {{ $t('administrative.stop.noStops') }}
                    </h1>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>