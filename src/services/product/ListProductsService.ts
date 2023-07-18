import prismaCLient from "../../prisma/index";

class ListProductsService {
  async execute() {
    const products = await prismaCLient.product.findMany({
      select: {
        id: true,
        name: true,
        amount: true
      },
      orderBy: {
        create_at: "desc",
      },
    });
    return products;
  }
}

export { ListProductsService }