import TakeAlert from '../../utils/takeAlert'
import i18n from 'i18next'

export const warningTakeAlert = async (title, text, confirmText, onSuccess) => {
    const result = await TakeAlert.fire({
        title: title,
        text: text,
        showCancelButton: true,
        cancelButtonText: i18n.t('components:cancel'),
        confirmButtonText: confirmText,
        type: 'warning',
        allowEscapeKey: true,
        allowOutsideClick: true,
        reverseButtons: true,
    })
    if (result.value) {
        onSuccess()
    }
    if (result.dismiss === 'backdrop' || result.dismiss === 'esc') return
}
