import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {IMessage} from "@/dto/shared/IMessage";

export const useMessageStore = defineStore('message', () => {
    const messages = ref<IMessage[]>([])

    const addMessage = (message : IMessage)=>{
        if (message){
            messages.value.push(message)
        }
    }


    const messageExsists = ():boolean=>{
            return messages.value.length > 0;
    }


    return {
        messages,
        addMessage,
        messageExsists
    };
});


