import type { Book } from '../../../domains/book/book';

const dummyBooks: Book[] = [
  {
    asin: 'B07Q45KZ46',
    detailPageUrl: '/gp/product/B07Q45KZ46?storeType=ebooks',
    productUrl:
      'https://images-fe.ssl-images-amazon.com/images/I/61Rtmv9N7-L._SX338_QL80_TTH_.jpg',
    title: '異世界ちゃんこ 横綱目前に召喚されたんだが (2) (バンブーコミックス)',
    ignored: false,
  },
  {
    asin: 'B07YW45X8M',
    detailPageUrl: '/gp/product/B07YW45X8M?storeType=ebooks',
    productUrl:
      'https://images-fe.ssl-images-amazon.com/images/I/51NCwBAqGaL._SX338_QL80_TTH_.jpg',
    title: '幼女戦記(16) (角川コミックス・エース)',
    ignored: false,
  },
  {
    asin: 'B07X6TBGKH',
    detailPageUrl: '/gp/product/B07X6TBGKH?storeType=ebooks',
    productUrl:
      'https://images-fe.ssl-images-amazon.com/images/I/51-ScPJRgDL._SX338_QL80_TTH_.jpg',
    title: 'ダンジョン飯 8巻 (HARTA COMIX)',
    ignored: false,
  },
  {
    asin: 'B07S8WH55K',
    detailPageUrl: '/gp/product/B07S8WH55K?storeType=ebooks',
    productUrl:
      'https://images-fe.ssl-images-amazon.com/images/I/51inhNq664L._SX338_QL80_TTH_.jpg',
    title: 'はねバド！（１５） (アフタヌーンコミックス)',
    ignored: false,
  },
];

export const booksGetApi = (): Promise<Book[]> => {
  return Promise.resolve(dummyBooks);
};
