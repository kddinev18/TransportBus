<script>
export default {
    props:
    {
        isExpanded: Boolean
    },
}
</script>

<template>
    <div v-if="isExpanded" class="mb-4 mr-3 ml-3 p-4 bg-secondary rounded-bl-md rounded-br-md text-black">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
            ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris.
        </p>
    </div>
</template>