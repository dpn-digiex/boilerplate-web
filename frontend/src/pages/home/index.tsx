import { observer } from "mobx-react-lite";

import { createOrder } from "@apis/orderServices";
import { Product } from "@interfaces/index";
import cartStore from "@stores/cartStores";

import styles from "./index.module.css";

export const inventory = [
  { name: "bacon", unitPrice: 10.99, quantity: 10 },
  { name: "eggs", unitPrice: 3.99, quantity: 10 },
  { name: "cheese", unitPrice: 6.99, quantity: 10 },
  { name: "chives", unitPrice: 1.0, quantity: 10 },
  { name: "wine", unitPrice: 11.99, quantity: 10 },
  { name: "brandy", unitPrice: 17.55, quantity: 10 },
  { name: "bananas", unitPrice: 0.69, quantity: 10 },
  { name: "ham", unitPrice: 2.69, quantity: 10 },
  { name: "tomatoes", unitPrice: 3.26, quantity: 10 },
  { name: "tissue", unitPrice: 8.45, quantity: 10 },
];

const HomePage = observer(() => {
  const { totalPrice, items, addToCart, updateQuantity } = cartStore;

  const handleCreateOrder = async () => {
    try {
      const res = await createOrder(items);
      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inventoryContainer}>
        {inventory.map(product => {
          return (
            product.quantity > 0 && (
              <div key={product.name} className={styles.productCard}>
                <div className={styles.imgSection}>{product.name}</div>
                <div className={styles.infoSection}>
                  <span>Price: {product.unitPrice}$</span>
                  <button
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
      <div className={styles.cartContainer}>
        {items.length > 0 &&
          items.map((item: Product) => {
            return (
              <div className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <span>{item.name}</span>
                  <span>{item.unitPrice}$</span>
                </div>
                <div className={styles.quantitySection}>
                  <button
                    onClick={() => {
                      const updatedQuantity = item.quantity - 1;
                      updateQuantity(item.name, updatedQuantity);
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      const updatedQuantity = item.quantity + 1;
                      updateQuantity(item.name, updatedQuantity);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        <div className={styles.cartSummary}>
          <p>Total price: {totalPrice}</p>
          <button onClick={handleCreateOrder}>Buy</button>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
