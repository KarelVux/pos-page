import {useIdentityStore} from "@/stores/identityStore";
import router from "@/router";
import {useMessageStore} from "@/stores/messageStore";
import {MessagePopupTypeEnum} from "@/components/shared/MessagePopupTypeEnum";


export async function redirectUserIfIdentityTokenIsNull(): Promise<void> {

    const identityStore = useIdentityStore();
    const messageStore = useMessageStore();
    const identity = identityStore.authenticationJwt

    if (identity === undefined) {
        messageStore.addMessage({
            status: "Redirected to home page",
            message: "Please login to access this page!",
            type: MessagePopupTypeEnum.Info
        })
        await router.push({name: 'home'})
    }
}