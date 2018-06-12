const SHOW = 'errorPage/SHOW';
const HIDE = 'errorPage/HIDE';

export function showErrorPage(payload) {
  return {
    type: SHOW,
    payload: payload
  };
}

export function hideErrorPage() {
  return {
    type: HIDE
  };
}
