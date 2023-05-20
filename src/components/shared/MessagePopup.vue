<template>
        <div class="alert alert-danger alert-dismissible fade show  mt-alerts " role="alert">
            <strong>{{ props.popupMessage.statusCode }}</strong> {{ props.popupMessage.message }}
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" class="btn-close" aria-label="Close" @click="sendRemovalEmit"></button>
        </div>
</template>


<script lang="ts" setup>

import type {IMessage} from "@/dto/shared/IMessage";

interface IProps {
    popupMessage: IMessage
}

const emits = defineEmits(['handleMessageRemoval']);
const props = defineProps<IProps>()

// Emit the child event with a message
const sendRemovalEmit = () => {
    emits('handleMessageRemoval', props.popupMessage);
};

</script>

<style scoped>
.mt-alerts {
    position: absolute;
    left: 25%;
    right: 25%;

}

</style>