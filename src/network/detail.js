import {request} from "./request"

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 整合detail里的res里的数据

export class goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.newPrice = itemInfo.price;
    this.desc = itemInfo.desc;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.goodsCount = shopInfo.cGoods;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.shopUrl = shopInfo.shopUrl
  }
}