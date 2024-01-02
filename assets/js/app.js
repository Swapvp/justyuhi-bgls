function createShopifyBuyButton(productId, targetClassName, buttonText) {
  var scriptURL =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

  function loadScript() {
    var script = document.createElement("script");
    script.async = true;
    script.src = scriptURL;
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: "bellegirl-lifestyle.myshopify.com",
      storefrontAccessToken: "1d2b3be8f0cd597a348065b4a6978368",
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
      var buttonConfiguration = {
        product: {
          // Your options configuration here...
          // Styles, button text, etc.
        },
      };

      // Select all elements with the targetClassName and create components for each
      var targetElements = document.getElementsByClassName(targetClassName);
      Array.from(targetElements).forEach(function (element) {
        ui.createComponent("product", {
          id: productId,
          node: element,
          moneyFormat: "Rs.%20%7B%7Bamount%7D%7D",
          options: {
            product: buttonConfiguration,
          },
        });
      });
    });
  }

  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    loadScript();
  }
}


