const INITIAL_BALANCE = 2000;
const A_OR_B_WIN = 100;
const C_OR_D_WIN = 50;

const A_LOSSES = {
  2: 150,
  4: 300,
  6: 200,
  8: 250,
  9: 350,
  11: 350,
  13: 250,
  14: 200,
  16: 300,
  17: 150,
  20: 300,
  22: 350,
  24: 200,
  25: 250,
  26: 150,
  30: 350,
  32: 200,
  33: 250,
  36: 150,
  37: 300,
};

const B_LOSSES = {
  8: 1250,
  13: 1250,
  20: 1250,
  32: 1250,
};

const C_LOSSES = {
  2: 50,
  4: 50,
  6: 50,
  8: 50,
  9: 50,
  11: 25,
  12: 75,
  16: 25,
  17: 75,
  19: 50,
  23: 50,
  24: 25,
  25: 50,
  28: 75,
  29: 50,
  33: 25,
  34: 25,
  36: 75,
  38: 50,
  39: 75,
};

const D_LOSSES = {
  9: 250,
  19: 250,
  28: 250,
  34: 250,
};

const computeLoss = (numCard, losses) =>
  losses.hasOwnProperty(numCard) ? losses[numCard] : 0;

const initData = () => ({
  numA: 0,
  numB: 0,
  numC: 0,
  numD: 0,
  balance: INITIAL_BALANCE,
  balancePart1: 0,
  balancePart2: 0,
  balancePart3: 0,
});

const behavioralData = contents => {
  const data = initData();
  const lines = contents.split("\n");

  lines.forEach((line, index) => {
    const rawCard = line.split(",")[1];
    const card = rawCard ? rawCard.trim() : rawCard;

    if (index === 50) {
      data.balancePart1 = data.balance;
    }

    switch (card) {
      case "A":
        data.balance += A_OR_B_WIN;
        data.balance -= computeLoss(data.numA, A_LOSSES);
        data.numA++;
        break;
      case "B":
        console.log('hit')
        data.balance += A_OR_B_WIN;
        data.balance -= computeLoss(data.numB, B_LOSSES);
        data.numB++;
        break;
      case "C":
        data.balance += C_OR_D_WIN;
        data.balance -= computeLoss(data.numC, C_LOSSES);
        data.numC++;
        break;
      case "D":
        data.balance += C_OR_D_WIN;
        data.balance -= computeLoss(data.numD, D_LOSSES);
        data.numD++;
        break;
      default:
        break;
    }
  });

  return data;
};

export default behavioralData;
