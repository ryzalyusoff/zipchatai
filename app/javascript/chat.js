document.addEventListener('DOMContentLoaded', () => {
  const chatbubble = document.getElementById('chatbubble');
  const minimizedView = document.getElementById('minimized-view');
  const maximizedView = document.getElementById('maximized-view');
  const openButton = document.getElementById('open-chat');
  const closeButton = document.getElementById('close-chat');

  // Debug App Bridge loading
  console.log('Checking for App Bridge on load...');
  console.log('App Bridge script present:', !!document.querySelector('script[src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/app-bridge-checkout.js"]'));
  console.log('App Bridge object available:', !!window.ShopifyAppBridge);

  // Debug chatbubble and iframe
  console.log('Chatbubble element present:', !!chatbubble);
  if (chatbubble) {
    const styles = window.getComputedStyle(chatbubble);
    console.log('Chatbubble styles:', {
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
      position: styles.position,
      bottom: styles.bottom,
      right: styles.right,
      zIndex: styles.zIndex,
      width: styles.width,
      height: styles.height
    });

    // Check iframe loading
    const iframe = chatbubble.querySelector('iframe');
    console.log('Iframe present:', !!iframe);
    if (iframe) {
      console.log('Iframe src:', iframe.src);
      // Force iframe size
      iframe.style.width = '224px';
      iframe.style.height = '72px';
      iframe.addEventListener('load', () => {
        console.log('Iframe loaded successfully');
      });
      iframe.addEventListener('error', () => {
        console.error('Iframe failed to load');
      });
    }
  }

  // Function to update view based on iframe size
  function updateView(forceMinimized = false) {
    if (!chatbubble || !minimizedView || !maximizedView) {
      console.error('Chatbubble or views not found:', { chatbubble, minimizedView, maximizedView });
      return;
    }

    console.log('Updating view, forceMinimized:', forceMinimized, 'window.innerWidth:', window.innerWidth, 'window.innerHeight:', window.innerHeight);

    if (forceMinimized || (window.innerWidth <= 224 && window.innerHeight <= 72)) {
      console.log('Setting minimized view');
      minimizedView.style.display = 'flex';
      maximizedView.style.display = 'none';
      chatbubble.style.width = '224px';
      chatbubble.style.height = '72px';
      if (window.ShopifyAppBridge && window.ShopifyAppBridge.resizeTo) {
        window.ShopifyAppBridge.resizeTo({ width: 224, height: 72 });
      }
    } else {
      console.log('Setting maximized view');
      minimizedView.style.display = 'none';
      maximizedView.style.display = 'flex';
      chatbubble.style.width = '415px';
      chatbubble.style.height = '700px';
    }
    chatbubble.style.visibility = 'visible';
    chatbubble.style.opacity = '1';

    // Force a resize event to ensure visibility
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('Forced resize event triggered');
    }, 200);
  }

  // Ensure initial state is minimized
  if (chatbubble && minimizedView && maximizedView) {
    console.log('Setting initial minimized state');
    minimizedView.style.display = 'flex';
    maximizedView.style.display = 'none';
    chatbubble.style.width = '224px';
    chatbubble.style.height = '72px';
  }

  // Wait for App Bridge with a timeout
  const startTime = Date.now();
  function tryInitialize() {
    if (window.ShopifyAppBridge && window.ShopifyAppBridge.resizeTo) {
      console.log('App Bridge script loaded successfully:', true);
      setTimeout(() => updateView(true), 100);
    } else if (Date.now() - startTime < 10000) {
      console.log('Waiting for App Bridge...');
      setTimeout(tryInitialize, 100);
    } else {
      console.error('App Bridge failed to load after 10 seconds, proceeding with fallback');
      setTimeout(() => updateView(true), 100);
    }
  }
  tryInitialize();

  window.addEventListener('resize', () => {
    updateView();
    if (chatbubble) {
      const styles = window.getComputedStyle(chatbubble);
      console.log('Resize event triggered, chatbubble visible:', styles.visibility, 'display:', styles.display, 'z-index:', styles.zIndex);
    }
  });

  openButton.addEventListener('click', () => {
    if (window.ShopifyAppBridge && window.ShopifyAppBridge.resizeTo) {
      window.ShopifyAppBridge.resizeTo({ width: 415, height: 700 });
    } else {
      console.error('App Bridge not available for maximize, using fallback');
      minimizedView.style.display = 'none';
      maximizedView.style.display = 'flex';
      chatbubble.style.width = '415px';
      chatbubble.style.height = '700px';
    }
  });

  closeButton.addEventListener('click', () => {
    if (window.ShopifyAppBridge && window.ShopifyAppBridge.resizeTo) {
      window.ShopifyAppBridge.resizeTo({ width: 224, height: 72 });
    } else {
      console.error('App Bridge not available for minimize, using fallback');
      minimizedView.style.display = 'flex';
      maximizedView.style.display = 'none';
      chatbubble.style.width = '224px';
      chatbubble.style.height = '72px';
    }
  });

  // Log CSP violations for debugging
  document.addEventListener('securitypolicyviolation', (event) => {
    console.error('CSP Violation:', event);
  });
});