
import { useState } from "react";
import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1299,
    quantity: 12,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    description:
      "Comfortable wireless headphones for music, entertainment, and everyday use.",
    specification: "Wireless, Bluetooth, Rechargeable battery",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 1899,
    quantity: 3,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    description:
      "A stylish smartwatch for checking the time and tracking daily activities.",
    specification: "Digital display, Fitness tracking, Rechargeable",
  },
  {
    id: 3,
    name: "Casual Backpack",
    category: "Accessories",
    price: 899,
    quantity: 15,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
    description:
      "A practical backpack for school supplies and everyday essentials.",
    specification: "Lightweight, Multiple compartments, Adjustable straps",
  },
  {
    id: 4,
    name: "Classic Sneakers",
    category: "Clothing",
    price: 1599,
    quantity: 10,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    description:
      "Comfortable everyday sneakers for casual outings and walking.",
    specification: "Rubber sole, Lace-up, Lightweight design",
  },
  {
    id: 5,
    name: "Digital Camera",
    category: "Electronics",
    price: 5499,
    quantity: 6,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700",
    description:
      "Capture memorable moments with this compact digital camera.",
    specification: "Digital photography, Portable body, Camera lens",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 999,
    quantity: 8,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700",
    description:
      "Enjoy your favorite music with a portable wireless speaker.",
    specification: "Bluetooth connection, Portable, Rechargeable",
  },
  {
    id: 7,
    name: "Insulated Tumbler",
    category: "Home & Living",
    price: 349,
    quantity: 20,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700",
    description:
      "A reusable tumbler for bringing your favorite drinks anywhere.",
    specification: "Reusable, Travel-friendly, Easy to carry",
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 2199,
    quantity: 7,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=700",
    description:
      "A desktop keyboard suitable for studying, typing, and gaming.",
    specification: "Mechanical keys, USB connection, Desktop use",
  },
  {
    id: 9,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 499,
    quantity: 2,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    description:
      "Classic sunglasses for everyday outdoor activities.",
    specification: "Lightweight frame, Classic style, Portable",
  },
];

const emptyForm = {
  name: "",
  category: "Electronics",
  price: "",
  quantity: "",
  rating: "5",
  image: "",
  description: "",
  specification: "",
};

const money = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const cartCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const cartItems = products.filter((product) => cart[product.id] > 0);

  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0
  );

  const openPage = (nextPage) => {
    setMessage("");
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    const currentQuantity = cart[product.id] || 0;

    if (currentQuantity >= product.quantity) {
      setMessage(`Sorry, no more stock available for ${product.name}.`);
      return;
    }

    setCart((previous) => ({
      ...previous,
      [product.id]: currentQuantity + 1,
    }));

    setMessage(`${product.name} added to cart!`);
  };

  const changeQuantity = (product, amount) => {
    const currentQuantity = cart[product.id] || 0;
    const nextQuantity = currentQuantity + amount;

    if (nextQuantity > product.quantity) {
      setMessage(`Only ${product.quantity} item(s) available in stock.`);
      return;
    }

    setCart((previous) => {
      const updated = { ...previous };

      if (nextQuantity <= 0) {
        delete updated[product.id];
      } else {
        updated[product.id] = nextQuantity;
      }

      return updated;
    });

    setMessage("");
  };

  const removeFromCart = (productId) => {
    setCart((previous) => {
      const updated = { ...previous };
      delete updated[productId];
      return updated;
    });

    setMessage("Item removed from cart.");
  };

  const clearCart = () => {
    setCart({});
    setMessage("Your cart has been cleared.");
  };

  const showDetails = (product) => {
    setSelectedProduct(product);
    openPage("details");
  };

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const addProduct = (event) => {
    event.preventDefault();

    const price = Number(form.price);
    const quantity = Number(form.quantity);
    const rating = Number(form.rating);

    if (
      !form.name.trim() ||
      !form.category ||
      !form.price ||
      form.quantity === "" ||
      !form.image.trim() ||
      !form.description.trim() ||
      !form.specification.trim()
    ) {
      setMessage("Please complete all product fields.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setMessage("Price must be greater than zero.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      setMessage("Quantity must be a whole number and cannot be negative.");
      return;
    }

    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      setMessage("Rating must be between 0 and 5.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      price,
      quantity,
      rating,
      image: form.image.trim(),
      description: form.description.trim(),
      specification: form.specification.trim(),
    };

    setProducts((previous) => [...previous, newProduct]);
    setCategory("All");
    setForm(emptyForm);
    setMessage("Product added successfully!");
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => openPage("home")}>
          <span className="brand-icon">P</span>
          <span>ProductHub</span>
        </button>

        <nav className="nav-links">
          <button
            className={page === "home" ? "nav-link active" : "nav-link"}
            onClick={() => openPage("home")}
          >
            Products
          </button>

          <button
            className="nav-link"
            onClick={() => openPage("add")}
          >
            + Add Product
          </button>

          <button
            className={page === "cart" ? "cart-nav active" : "cart-nav"}
            onClick={() => openPage("cart")}
          >
            🛒 Cart <span className="cart-badge">{cartCount}</span>
          </button>
        </nav>
      </header>

      <main>
        {message && (
          <div className="message" role="status">
            <span>{message}</span>
            <button
              className="message-close"
              onClick={() => setMessage("")}
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">YOUR EVERYDAY SHOPPING</span>
                <h1>Find your next favorite product.</h1>
                <p>
                  Explore our collection of useful products, check stock,
                  view product details, and manage your cart in one place.
                </p>
                <button
                  className="primary-button hero-button"
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Started <span>→</span>
                </button>
              </div>

              <div className="hero-decoration">
                <div className="hero-circle">
                  <span className="hero-emoji">🛍️</span>
                </div>
                <span className="floating-tag tag-one">Quality finds</span>
                <span className="floating-tag tag-two">Easy shopping</span>
              </div>
            </section>

            <section className="product-section" id="products">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">OUR COLLECTION</span>
                  <h2>Explore Products</h2>
                  <p>Find the right product for your everyday needs.</p>
                </div>
                <button
                  className="outline-button"
                  onClick={() => openPage("add")}
                >
                  + Add New Product
                </button>
              </div>

              <div className="filter-row">
                <span className="filter-label">Categories</span>
                <div className="category-list">
                  {categories.map((item) => (
                    <button
                      key={item}
                      className={
                        category === item
                          ? "category-button selected"
                          : "category-button"
                      }
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <span className="product-count">
                  {filteredProducts.length} products
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <span>📦</span>
                  <h3>No products found</h3>
                  <p>Try another category or add a new product.</p>
                </div>
              ) : (
                <div className="product-grid">
                  {filteredProducts.map((product) => {
                    const quantityInCart = cart[product.id] || 0;
                    const lowStock = product.quantity < 5;

                    return (
                      <article className="product-card" key={product.id}>
                        <button
                          className="product-image-button"
                          onClick={() => showDetails(product)}
                          aria-label={`View ${product.name} details`}
                        >
                          <img
                            className="product-image"
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://placehold.co/600x400?text=Product+Image";
                            }}
                          />
                          <span className="image-category">
                            {product.category}
                          </span>
                        </button>

                        <div className="product-info">
                          <div className="rating-row">
                            <span className="rating">★ {product.rating}</span>
                            <span
                              className={
                                lowStock ? "stock low-stock" : "stock"
                              }
                            >
                              {lowStock
                                ? `Low Stock: ${product.quantity} left`
                                : `${product.quantity} in stock`}
                            </span>
                          </div>

                          <h3>{product.name}</h3>
                          <p className="product-description">
                            {product.description}
                          </p>

                          <div className="product-price">
                            {money(product.price)}
                          </div>

                          <div className="subtotal-line">
                            <span>Subtotal</span>
                            <strong>
                              {money(product.price * quantityInCart)}
                            </strong>
                          </div>

                          {quantityInCart > 0 && (
                            <div className="quantity-control">
                              <span>In your cart</span>
                              <div className="quantity-buttons">
                                <button
                                  onClick={() => changeQuantity(product, -1)}
                                  aria-label={`Decrease ${product.name} quantity`}
                                >
                                  −
                                </button>
                                <strong>{quantityInCart}</strong>
                                <button
                                  onClick={() => changeQuantity(product, 1)}
                                  disabled={
                                    quantityInCart >= product.quantity
                                  }
                                  aria-label={`Increase ${product.name} quantity`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="product-actions">
                            <button
                              className="details-button"
                              onClick={() => showDetails(product)}
                            >
                              Details
                            </button>
                            <button
                              className="primary-button add-button"
                              onClick={() => addToCart(product)}
                              disabled={
                                product.quantity === 0 ||
                                quantityInCart >= product.quantity
                              }
                            >
                              {product.quantity === 0
                                ? "Out of Stock"
                                : quantityInCart >= product.quantity
                                  ? "Stock Limit"
                                  : "+ Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {page === "details" && selectedProduct && (
          <section className="content-page">
            <button
              className="back-button"
              onClick={() => openPage("home")}
            >
              ← Back to Products
            </button>

            <div className="details-layout">
              <div className="details-image-wrap">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="details-image"
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://placehold.co/700x600?text=Product+Image";
                  }}
                />
              </div>

              <div className="details-content">
                <span className="eyebrow">{selectedProduct.category}</span>
                <h1>{selectedProduct.name}</h1>
                <div className="details-rating">
                  <span className="rating">★ {selectedProduct.rating}</span>
                  <span
                    className={
                      selectedProduct.quantity < 5
                        ? "stock low-stock"
                        : "stock"
                    }
                  >
                    {selectedProduct.quantity < 5
                      ? `Low Stock: ${selectedProduct.quantity} left`
                      : `${selectedProduct.quantity} available`}
                  </span>
                </div>

                <div className="details-price">
                  {money(selectedProduct.price)}
                </div>

                <p className="details-description">
                  {selectedProduct.description}
                </p>

                <div className="specification-box">
                  <h3>Product Specifications</h3>
                  <p>{selectedProduct.specification}</p>
                </div>

                <button
                  className="primary-button details-add-button"
                  onClick={() => addToCart(selectedProduct)}
                  disabled={
                    selectedProduct.quantity === 0 ||
                    (cart[selectedProduct.id] || 0) >=
                      selectedProduct.quantity
                  }
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="outline-button details-cart-button"
                  onClick={() => openPage("cart")}
                >
                  View Cart ({cartCount})
                </button>
              </div>
            </div>
          </section>
        )}

        {page === "add" && (
          <section className="content-page add-product-page">
            <button
              className="back-button"
              onClick={() => openPage("home")}
            >
              ← Back to Products
            </button>

            <div className="form-heading">
              <span className="eyebrow">PRODUCT MANAGEMENT</span>
              <h1>Add a New Product</h1>
              <p>
                Enter the product information below to add it to your catalog.
              </p>
            </div>

            <form className="product-form" onSubmit={addProduct}>
              <div className="form-grid">
                <label className="form-field">
                  Product Name *
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="e.g. Wireless Mouse"
                    required
                  />
                </label>

                <label className="form-field">
                  Category *
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateForm}
                    required
                  >
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Clothing</option>
                    <option>Home & Living</option>
                    <option>School Supplies</option>
                    <option>Other</option>
                  </select>
                </label>

                <label className="form-field">
                  Price (₱) *
                  <input
                    type="number"
                    name="price"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={updateForm}
                    placeholder="e.g. 999"
                    required
                  />
                </label>

                <label className="form-field">
                  Available Quantity *
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={updateForm}
                    placeholder="e.g. 10"
                    required
                  />
                </label>

                <label className="form-field">
                  Rating (0–5) *
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={updateForm}
                    required
                  />
                </label>

                <label className="form-field">
                  Product Image URL *
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={updateForm}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </label>

                <label className="form-field full-width">
                  Description *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={updateForm}
                    placeholder="Describe the product..."
                    rows="3"
                    required
                  />
                </label>

                <label className="form-field full-width">
                  Specifications *
                  <textarea
                    name="specification"
                    value={form.specification}
                    onChange={updateForm}
                    placeholder="e.g. Color, size, features, material..."
                    rows="3"
                    required
                  />
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="outline-button"
                  onClick={() => {
                    setForm(emptyForm);
                    setMessage("");
                  }}
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="primary-button submit-button"
                >
                  + Save Product
                </button>
              </div>
            </form>
          </section>
        )}

        {page === "cart" && (
          <section className="content-page cart-page">
            <div className="cart-heading">
              <div>
                <span className="eyebrow">YOUR SELECTIONS</span>
                <h1>Shopping Cart</h1>
                <p>Review your selected products and order total.</p>
              </div>
              <span className="cart-item-count">{cartCount} item(s)</span>
            </div>

            <div className="cart-page-actions">
              <button
                className="back-button"
                onClick={() => openPage("home")}
              >
                ← Continue Shopping
              </button>

              {cartCount > 0 && (
                <button
                  className="clear-cart-button"
                  onClick={clearCart}
                >
                  🗑 Clear Cart
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-state cart-empty">
                <span>🛒</span>
                <h2>Your cart is empty</h2>
                <p>
                  You haven't added any products yet. Explore the collection
                  and choose something you like.
                </p>
                <button
                  className="primary-button"
                  onClick={() => openPage("home")}
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <article className="cart-item" key={product.id}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="cart-item-image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/200x200?text=Product";
                        }}
                      />

                      <div className="cart-item-info">
                        <span className="cart-item-category">
                          {product.category}
                        </span>
                        <h3>{product.name}</h3>
                        <p>{money(product.price)} each</p>

                        <div className="quantity-buttons cart-quantity">
                          <button
                            onClick={() => changeQuantity(product, -1)}
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            −
                          </button>
                          <strong>{cart[product.id]}</strong>
                          <button
                            onClick={() => changeQuantity(product, 1)}
                            disabled={
                              cart[product.id] >= product.quantity
                            }
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-end">
                        <strong className="cart-subtotal">
                          {money(product.price * cart[product.id])}
                        </strong>
                        <span className="subtotal-caption">Subtotal</span>
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="cart-summary">
                  <h2>Order Summary</h2>

                  <div className="summary-row">
                    <span>Total Items</span>
                    <strong>{cartCount}</strong>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>Free</strong>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-total">
                    <span>Overall Total</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>

                  <p className="summary-note">
                    This is a product management demo. No real payment will
                    be processed.
                  </p>

                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setMessage(
                        "Demo order reviewed successfully. No payment was processed."
                      );
                    }}
                  >
                    Review Order
                  </button>
                </aside>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <button className="footer-brand" onClick={() => openPage("home")}>
          <span className="brand-icon">P</span> ProductHub
        </button>
        <p>Simple shopping. Smarter product management.</p>
        <span>© {new Date().getFullYear()} ProductHub</span>
      </footer>
    </div>
  );
}

export default App;
