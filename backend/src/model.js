class BuyShare {
  company_id!: number;
  author!: string;
  amount!: number;
  timestamp!: Date;
  constructor(
    auction_id: number,
    author: string,
    amount: number,
    timestamp: Date
  ) {
    if (amount <= 0) {
      throw new EvalError(`Amount ${amount} must be greater than zero`);
      return;
    }
    this.auction_id = auction_id;
    this.author = author;
    this.amount = amount;
    this.timestamp = timestamp;
  }
  _eq(other: Bid) {
    return (
      this.author === other.author &&
      this.auction_id === other.auction_id &&
      this.amount === other.amount &&
      this.timestamp === other.timestamp
    );
  }

  _ne(other: Bid) {
    return (
      this.author != other.author &&
      this.auction_id != other.auction_id &&
      this.amount != other.amount &&
      this.timestamp != other.timestamp
    );
  }

  _gt(other: Bid) {
    return (
      this.amount > other.amount ||
      (this.amount == other.amount && this.timestamp < other.timestamp)
    );
  }

  _lt(other: Bid) {
    return (
      this.amount < other.amount ||
      (this.amount == other.amount && this.timestamp > other.timestamp)
    );
  }
}

class CompanyShares {
  static curr_id = 0;
  id;
  companyName;
  description;
  companyAdminAddress;
  companyLogo;
  totalShares;
  minShare;
  pricePerShare;
  country;
  regNum;
  status;
  // static curr_id: number = 0;
  shareHolders;
  constructor(
    companyName,
    description,
    companyAdminAddress,
    companyLogo,
    totalShares,
    minShare,
    pricePerShare,
    country,
    regNum
  ) {
    this.status = 0;
    if (CompanyShares.curr_id) {
      this.id = CompanyShares.curr_id++;
    } else {
      CompanyShares.curr_id = 1;
      this.id = 1;
    }
    this.companyName = companyName;
    this.description = description;
    this.companyAdminAddress = companyAdminAddress;
    this.companyLogo = companyLogo;
    this.totalShares = totalShares;
    this.minShare = minShare;
    this.pricePerShare = pricePerShare;
    this.country = country;
    this.regNum = regNum;
    this.shareHolders = [];
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.companyName;
  }
  getDescription() {
    return this.description;
  }
  getCompanyAdmin() {
    return this.companyAdminAddress;
  }
  getCompanyLogo() {
    return this.companyLogo;
  }
  getMinShare() {
    return this.minShare;
  }
  getPriceShare() {
    return this.pricePerShare;
  }
  getStatus() {
    return this.status;
  }
  getCompanyReg() {
    return this.regNum;
  }
  getHighestShareHolder() {
    if (this.shareHolders.length === 0) {
      return undefined;
    }
    return this.shareHolders[this.shareHolders.length - 1];
  }
  getShareHolders() {
    return this.shareHolders;
  }

  // shareHolder(bid: Bid) {
  //   if (this.state == Status.FINISHED) {
  //     throw new EvalError("the auction has already been finished");
  //   }
  //   if (bid.auction_id != this.id) {
  //     throw new EvalError(`Auciton id ${bid.auction_id} does not match`);
  //   }
  //   if (bid.amount < this.min_bid_amount) {
  //     throw new EvalError(
  //       `Bid amount ${bid.amount} did not not meet minimum bid amount`
  //     );
  //   }
  //   const winning_bid = this.getWinning_bid();
  //   if (winning_bid === undefined || bid._gt(winning_bid)) {
  //     this.bids.push(bid);
  //   } else {
  //     throw new EvalError(
  //       `bid amoujnt ${bid.amount} is not greater than the currnent winning bid amount ${winning_bid.amount} `
  //     );
  //   }
  //   if (this.state === Status.CREATED) {
  //     this.state = Status.STARTED;
  //   }
  // }
  // finish() {
  //   this.state = Status.FINISHED;
  // }
}

export { CompanyShares, ShareHolder, Item, Status };