import { toast, TypeOptions } from 'react-toastify'

const createToast = (type: TypeOptions) => (content: string) => {
    toast(content, {
        type,
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark',
    })
}

export const successToast = createToast('success')

export const errorToast = createToast('error')

export const loadingToastCreator = (toastId: string) => {
    const startingLoading = (message: string) =>
        toast.loading(message, {
            toastId,
            position: 'top-right',
            autoClose: 3000,
            theme: 'dark',
        })
    const loadedSuccessfully = (message: string) =>
        toast.update(toastId, {
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            theme: 'dark',
            position: 'top-right',
            render: () => message,
        })
    const errorWhileLoading = (message: string) =>
        toast.update(toastId, {
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            theme: 'dark',
            position: 'top-right',
            render: () => message,
        })

    return {
        startingLoading,
        loadedSuccessfully,
        errorWhileLoading,
    }
}
