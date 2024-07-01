class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    this.transactions.forEach(element => {
    
        balance += element.value;
    })
    return balance;
  };

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
    this.status = "✅Transaction Successful✅";
  }
  commit() {
    if(!this.isAllowed()){
      this.amount = 0;
      this.status = '❌Transaction Failed ❌'
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }


}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount
  }
  isAllowed(){
    return true;
  }
}


/**Test */
const acc1 = new Account('John Wick')
const acc2 = new Account('Ben H')
console.log(acc1);
console.log(acc1.balance);
console.log(acc2);
console.log(acc2.balance);
const t1 = new Deposit(100, acc1)
const t2 = new Withdrawal(100, acc2)

t1.commit();
t2.commit();

console.log(acc1);
console.log(acc2);

const t3 = new Withdrawal()
