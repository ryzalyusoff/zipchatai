document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Page DOM loaded (iframe)');

  const openChatButton = document.getElementById('open-chat');
  const chatBox = document.getElementById('chatbox');

  let chatOpen = false;

  openChatButton.addEventListener('click', () => {
    chatOpen = !chatOpen;

    if (chatOpen) {
      console.log('🟢 Opening chat');
      chatBox.style.display = 'block';
      openChatButton.textContent = 'Close Chat'; // Change button text
    } else {
      console.log('🔴 Closing chat');
      chatBox.style.display = 'none';
      openChatButton.textContent = 'Chat with us'; // Restore button text
    }
  });
});
