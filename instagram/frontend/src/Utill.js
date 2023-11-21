import { modalLoginRef, modalRegisterRef, backdropRef, modalCreatePostRef } from "./components"

const Utils = {
    global: {
        accessToken: localStorage.getItem("accessToken")
    },
    wait: (ms) => new Promise(e => setTimeout(e, ms)),
    apiHost: import.meta.env.VITE_API_URL ?? "",
    showModalLogin: () => {
        modalLoginRef.current.hide();
        modalLoginRef.current.show();
    },
    hideModalLogin: () => {
        modalLoginRef.current.hide();
    },
    showModalRegister: () => {
        modalRegisterRef.current.hide();
        modalRegisterRef.current.show();
    },
    hideModalRegister: () => {
        modalRegisterRef.current.hide();
    },
    showBackdrop: () => {
        backdropRef.current.hide();
        backdropRef.current.show();
    },
    hideBackdrop: () => {
        backdropRef.current.hide();
    },
    showModalCreatePost: () => {
        modalCreatePostRef.current.hide();
        modalCreatePostRef.current.show();
    },
    hideModalCreatePost: () => {
        modalCreatePostRef.current.hide();
    },
    modalLoginRef: modalLoginRef,
    modalRegisterRef: modalRegisterRef
}

export default Utils