export const paths = {
  root: '/',
  comingSoon: '/coming-soon',
  about: '/about-us',
  aboutApp: '/about-app',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  product: {
    root: `/product`,
    new: `/product/new`,
    details: (id: number | string | undefined) => `/product/${id}`,
  },
  printShop: {
    root: `/print-shop`,
    new: `/print-shop/new`,
    details: (id: number | string | undefined) => `/print-shop/${id}`,
  },
  content: {
    root: `/content`,
    new: `/content/new`,
    details: (id: number | string | undefined) => `/content/${id}`,
  },
  bookmark: {
    root: `/bookmark`,
  },
  my: {
    root: `/my`,
    review: `/my/review`,
  },
  admin: {
    product: {
      new: (printShopId: number | string | undefined) => `/admin/product/new/${printShopId}`,
      update: (printShopId: number | string | undefined, id: number | string | undefined) =>
        `/admin/product/${printShopId}/${id}`,
    },
  },
};
