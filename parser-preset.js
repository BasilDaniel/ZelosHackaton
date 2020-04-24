module.exports = {
  parserOpts: {
    headerPattern: /\[#([A-Z]*-\d*)\] (\w*): (.*)$/,
    headerCorrespondence: ['ticket', 'type', 'subject']
  }
};
