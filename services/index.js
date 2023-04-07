import 'module-alias/register';
import http from 'http';
import BudgetManagerAPI from '@BudgetManagerAPI';

const BudgetManagerServer = http.Server(BudgetManagerAPI),
  BudgetManagerPORT = process.env.PORT || 3001,
  LOCAL = '0.0.0.0';

BudgetManagerServer.listen(BudgetManagerPORT, LOCAL, () =>
  console.log(`BudgetManagerAPI running on ${BudgetManagerPORT}`)
);
