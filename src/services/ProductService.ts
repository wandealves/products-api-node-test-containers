import { Repository } from "typeorm";
import { Product } from "../domain/Product";

export class ProductService {
  constructor(readonly productRepo: Repository<Product>) {}

  async create(entity: Partial<Product>): Promise<Product> {
    const product = this.productRepo.create(entity);
    await this.productRepo.save(product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }
}