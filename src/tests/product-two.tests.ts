import { DataSource, DataSourceOptions } from "typeorm";
import { startMysql } from "./test-helpers";
import { Product } from "../domain/Product";
import { ProductService } from "../services/ProductService";

describe("ProductService2 Tests", () => {
  let dataSource: DataSource;
  const startedMysqlContainer = startMysql();
  
  beforeEach(async () => {
    const mysqlContainer = startedMysqlContainer.mysqlContainer;
    const connOptions: DataSourceOptions = {
      type: "mysql",
      host: mysqlContainer.getHost(),
      port: mysqlContainer.getMappedPort(3306),
      logging: true,
    };

    const adminDataSource = new DataSource({
      ...connOptions,
      username: "root",
      password: "root",
      database: "test",
    });

    await adminDataSource.initialize();

    const databaseName = "test_" + Math.random().toString(36).substring(7);

    await adminDataSource.query(`CREATE DATABASE ${databaseName}`);
    await adminDataSource.destroy();

    dataSource = new DataSource({
      type: "mysql",
      host: mysqlContainer.getHost(),
      port: mysqlContainer.getMappedPort(3306),
      username: "root",
      password: "root",
      database: databaseName,
      synchronize: true,
      entities: [Product],
      logging: true,
    });

    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource?.destroy();
  });

  afterAll(async () => {
    //const mysqlContainer = startedMysqlContainer.mysqlContainer;
  //  await mysqlContainer?.stop();
  });

  test.each([
    {
      name: "product",
      price: 100,
    },
    {
      name: "product",
      price: 100,
    },
    {
      name: "product",
      price: 100,
    },
    {
      name: "product",
      price: 100,
    },
  ])("create product", async (productData) => {
    const productService = new ProductService(
      dataSource.getRepository(Product)
    );

    const product = await productService.create(productData);

    expect(product).toEqual({
      id: expect.any(Number),
      name: "product",
      price: 100,
    });
  });
});