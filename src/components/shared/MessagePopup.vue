<template>
        <div class="alert alert-danger alert-dismissible fade show  mt-alerts " role="alert">
            <strong>{{ props.popupMessage.status }}</strong> {{ props.popupMessage.message }}
            <button type="button" class="btn-close" aria-label="Close" @click="sendRemovalEmit"></button>
        </div>
</template>


<script lang="ts" setup>

import type {IMessage} from "@/dto/shared/IMessage";
import {onMounted, onUnmounted} from "vue";

interface IProps {
    popupMessage: IMessage
}

const emits = defineEmits(['handleMessageRemoval']);
const props = defineProps<IProps>()

// Emit the child event with a message
const sendRemovalEmit = () => {
    emits('handleMessageRemoval', props.popupMessage);
};
let timerId: number;


onMounted(() => {

    timerId = setInterval(async () => {
        sendRemovalEmit()
    }, 5000);
});

onUnmounted(() => {
    clearInterval(timerId);
});
</script>

<style scoped>
.mt-alerts {
    position: absolute;
    left: 25%;
    right: 25%;
    z-index: 9999;
}

</style>