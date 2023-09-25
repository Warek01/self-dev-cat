import type { ToastContainerProps } from 'react-toastify'

export const toastProps: ToastContainerProps = {
  autoClose: 3000,
  draggable: true,
  closeButton: true,
  enableMultiContainer: false,
  icon: true,
  position: 'top-right',
  theme: undefined, // Set in app from theme state
  draggableDirection: 'x',
  rtl: false,
  draggablePercent: 50,
  newestOnTop: true,
  hideProgressBar: false,
  pauseOnHover: true,
  containerId: '',
  limit: 4,
  pauseOnFocusLoss: true,
  closeOnClick: false,
}
