const pressEnter = () => {
  $('#submitBtn').click(() => {
    console.error('clicked');
  });
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      console.error('enter');
    }
  });
};

const initializer = () => {
  pressEnter();
};

module.exports = {
  initializer,
};
