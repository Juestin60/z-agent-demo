(function () {
  fetch(
    `https://app.zagent.stage.yavar.ai/v2/chatbot/${window.botId}/customer`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.botKey}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const primaryColor =
        data?.data?.settings?.chat_window_colors?.header_background ||
        '#584CCE';
      const accentColor =
        data?.data?.settings?.chat_window_colors?.header_text || '#53565F';

      const link = window.document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://web-script.zagent.stage.yavar.ai/index.css';
      // link.href = 'index.css';

      document.head.appendChild(link);

      // Prevent the pinch zoom in mobile device
      const meta = window.document.createElement('meta');
      meta.name = 'viewport';
      meta.content =
        'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);

      const fontAwesomeCDN = document.createElement('link');
      fontAwesomeCDN.rel = 'stylesheet';
      fontAwesomeCDN.href =
        'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
      document.head.appendChild(fontAwesomeCDN);

      const chatButton = document.createElement('button');
      if (window.botId === '0b02b10c-1dac-4f6e-b98c-7f652acef4e7') {
        chatButton.className = 'chat-button-mk';
        chatButton.style.backgroundColor = '#aa9a76';
      } else {
        chatButton.style.backgroundColor = primaryColor;
        chatButton.className = 'chat-button';
      }
      chatButton.onclick = toggleChat;

      let chatButtonImage;

      // if (window.botId === "0b02b10c-1dac-4f6e-b98c-7f652acef4e7") {
      //   chatButtonImage = document.createElement('img');
      //   chatButtonImage.src = 'https://firebasestorage.googleapis.com/v0/b/image-storage-71106.appspot.com/o/logo-modified.png?alt=media&token=81e9ae6c-b433-4b2c-a1d6-50d3a9ce37f5';
      //   chatButtonImage.alt = "MK";
      //   chatButtonImage.style.width = '80px';
      //   chatButtonImage.style.height = '80px';
      //   chatButtonImage.style.borderRadius = '50%';
      //   chatButton.appendChild(chatButtonImage);
      // } else {
      //   chatButtonImage = document.createElement('i');
      //   chatButtonImage.className = 'bi bi-chat-dots';
      //   chatButtonImage.style.fontSize = '28px';
      //   chatButton.appendChild(chatButtonImage);
      // }

      if (window.botId === '0b02b10c-1dac-4f6e-b98c-7f652acef4e7') {
        // Chat button container
        chatButton.className = 'chat-button-custom';
        chatButton.style.backgroundColor = '#aa9a76'; // adjust color if needed

        // Profile image
        const profileImg = document.createElement('img');
        profileImg.src =
          'https://firebasestorage.googleapis.com/v0/b/image-storage-71106.appspot.com/o/mary_new.png?alt=media&token=aebbe256-9328-4a6f-bb03-799ffa51ee0c';
        profileImg.alt = 'MK';
        profileImg.className = 'chat-profile-img';

        // Text
        const chatText = document.createElement('span');
        chatText.className = 'chat-text';
        chatText.innerText = 'Need Help?\nChat with Mary™';

        // Append both
        chatButton.appendChild(profileImg);
        chatButton.appendChild(chatText);
      } else {
        chatButton.className = 'chat-button';
        chatButton.style.backgroundColor = primaryColor;

        chatButtonImage = document.createElement('i');
        chatButtonImage.className = 'bi bi-chat-dots';
        chatButtonImage.style.fontSize = '28px';
        chatButton.appendChild(chatButtonImage);
      }

      const chatWindow = document.createElement('div');
      chatWindow.className = 'chat-window';

      const chatCloseButton = document.createElement('button');
      chatCloseButton.className = 'chat-close-button';
      chatCloseButton.onclick = toggleChat;

      const chatCloseButtonImage = document.createElement('i');
      chatCloseButtonImage.className = 'bi bi-x';
      chatCloseButtonImage.style.fontSize = '30px';
      chatCloseButtonImage.style.color = accentColor;
      chatCloseButton.appendChild(chatCloseButtonImage);
      chatWindow.appendChild(chatCloseButton);

      if (isDarkBackground(primaryColor)) {
        chatButtonImage.style.color = 'white';
      }

      const chatIframe = document.createElement('iframe');
      chatIframe.className = 'chat-iframe';
      chatIframe.frameBorder = 0;
      chatIframe.src = `https://bot.zagent.stage.yavar.ai/?access_token=${window.botKey}&bot_id=${window.botId}`;
      chatIframe.allow = 'camera; microphone; geolocation';
      chatWindow.appendChild(chatIframe);

      const whatsappButton = document.createElement('a');
      whatsappButton.className = 'whatsapp-button';
      whatsappButton.href = `https://api.whatsapp.com/send?phone=${data.whatsapp_number?.replace(
        /\D/g,
        ''
      )}&text=${encodeURIComponent('Hi')}`;
      whatsappButton.target = '_blank';

      const whatsappButtonImage = document.createElement('i');
      whatsappButtonImage.className = 'bi bi-whatsapp whatsapp-button';
      whatsappButtonImage.style.fontSize = '28px';
      whatsappButtonImage.style.color = 'white';
      whatsappButton.appendChild(whatsappButtonImage);

      document.body.appendChild(chatButton);
      document.body.appendChild(chatWindow);
      if (data?.whatsapp_number) {
        document.body.appendChild(whatsappButton);
      }

      function toggleChat() {
        if (
          chatWindow.style.display === 'none' ||
          chatWindow.style.display === ''
        ) {
          chatWindow.style.display = 'block';
        } else {
          chatWindow.style.display = 'none';
        }
      }
    })
    .catch((error) => {
      console.error('Bot details not found', error);
    });
})();

function isDarkBackground(color) {
  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
