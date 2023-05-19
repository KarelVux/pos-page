<template>
    <div class="row">
        <p class="">
            <span class="">
                <strong>{{strongText}}</strong>
           </span>
              <span>{{ normalText }}</span>
        </p>
    </div>
</template>


<script lang="ts" setup>


const props = defineProps({
    strongText: String,
    normalText: String,

})

</script>
