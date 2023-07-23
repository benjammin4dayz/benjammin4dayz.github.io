//! Include this module to deprecate a page.
// It will:
// - - Notify user with an alert window
// - - Send a warning to the console
// - - Dump relevant variables to the console
const deprecated = {
  notifSent: false,
  note: {
    user:
      [
        '[DEPRECATED CONTENT NOTICE]: ->',
        'Something is no longer supported and will be removed from the page soon.',
        'Be aware that your experience may be severely diminished.',
        'Please contact me at your earliest convenience regarding this matter.'
      ].join('\n• ') + '\n\nThank you for patience and understanding.\n- Jam',
    dev: [
      '[DEPRECATED CONTENT TRACE]: ->',
      JSON.stringify(
        {
          href: window.location.href,
          hash: window.location.hash,
          pathname: window.location.pathname
        },
        null,
        2
      )
    ].join('\n')
  }
};
deprecated.alert = () => alert(deprecated.note.user);
deprecated.warn = () => console.warn(deprecated.note.dev);

const doOnLoad = (flag) => {
  if (!flag) {
    deprecated.alert();
    deprecated.warn();
    window.location.href = '#deprecated?ack=1';
    return !flag;
  }
};
