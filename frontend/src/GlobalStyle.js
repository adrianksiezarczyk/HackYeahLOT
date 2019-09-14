import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  .nav-tabs .nav-link {
      padding: 1em 1em !important;
  }
  
  input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .swal2-shown{
    z-index:1111!important;
  }

  .ReactModal__Body--open,
  .ReactModal__Html--open {
    overflow: hidden;
  }

  .ReactModal__Overlay {
  -webkit-perspective: 600;
  perspective: 600;
  opacity: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.ReactModal__Overlay--after-open {
  z-index:1110;
  opacity: 1;
  transition: opacity 150ms ease-out;
}

.ReactModal__Content {
  -webkit-transform: scale(0.5) rotateX(-30deg);
  transform: scale(0.5) rotateX(-30deg);
}

.ReactModal__Content--after-open {
  -webkit-transform: scale(1) rotateX(0deg);
  transform: scale(1) rotateX(0deg);
  transition: all 150ms ease-in;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
}

.ReactModal__Content--before-close {
  -webkit-transform: scale(0.5) rotateX(30deg);
  transform: scale(0.5) rotateX(30deg);
  transition: all 150ms ease-in;
}

.ReactModal__Content.modal-dialog {
  border: none;
  background-color: transparent;
}

.dimmer.active .dimmer-content {
  opacity: 0.5 !important;
}

.container {
  @media (min-width: 1366px) {
    max-width: 1300px!important;
  }
  @media (min-width: 1400px) {
      max-width: 1400px!important;
  }
}
`
