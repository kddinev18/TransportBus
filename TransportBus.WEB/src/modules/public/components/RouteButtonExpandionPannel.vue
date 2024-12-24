<script>
export default {
    props:
    {
        isExpanded: Boolean,
        legs: Array
    },
}
</script>

<template>
    <div v-if="isExpanded" class="mb-4 mr-3 ml-3 p-4 bg-secondary rounded-bl-md rounded-br-md text-black">
        <div v-for="(leg, index) in legs" :key="`leg-${index}`">

            <template v-if="leg.mode === 'WALK'">
                <v-icon color="background" icon="mdi-walk" size="18"></v-icon>
                <p>{{ $t('public.transportMap.navigation.walkTo') }}</p>
            </template>

            <template v-if="leg.mode === 'BUS'">

            </template>


            <!-- <template v-if="leg.mode === 'WALK'">
                <v-icon color="background" icon="mdi-walk" size="18"></v-icon>
                <div class="flex flex-col items-start ml-2 bg-accent p-2 rounded-lg">
                    <p class="text-sm font-bold text-white">{{ getMinutes(leg.endTime - leg.startTime) }}</p>
                </div>
            </template>

            <template v-else>
                <v-icon color="background" icon="mdi-bus" size="18"></v-icon>
                <div class="flex flex-col items-start ml-2 bg-accent p-2 rounded-lg">
                    <p class="text-sm font-bold text-white">{{ leg.route }}</p>
                </div>
            </template> -->
        </div>
    </div>
</template>