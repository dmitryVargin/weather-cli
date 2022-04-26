import chalk from 'chalk';
import dedent from 'dedent-js';

function printError(error) {
  console.log(` ${chalk.bgRed(' ERROR ')} ${error}`);
}

function printSuccess(msg) {
  console.log(` ${chalk.bgGreen(' SUCCESS ')} ${msg}`);
}

function printHelp() {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] сохранение токена
    `),
  );
}

export { printSuccess, printError, printHelp };
