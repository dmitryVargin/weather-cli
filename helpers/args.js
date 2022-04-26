function getArgs(argv) {
  // лучше юзать yargs
  return argv.slice(2).reduce((acc, value, index, array) => {
    if (value.startsWith('-')) {
      return { ...acc, [value.slice(1)]: true };
    }
    return { ...acc, [array[index - 1].slice(1)]: value };
  }, {});
}
export { getArgs };
